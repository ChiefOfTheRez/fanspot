import { getServerSession } from "next-auth";
import { z } from "zod";
import { fail, handleApiError, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const messageSchema = z.object({
  receiverId: z.string().min(1).optional(),
  receiverUsername: z.string().min(1).optional(),
  body: z.string().min(1).max(2000)
});

type ApiMessage = { id: string; from: "me" | "them"; body: string; time: string; createdAt: string };
type ApiConversation = { id: string; receiverId: string; receiverUsername: string; name: string; handle: string; lastMessage: string; time: string; unread: boolean };

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}

async function buildInbox(userId: string) {
  const messages = await prisma.message.findMany({
    where: { OR: [{ senderId: userId }, { receiverId: userId }] },
    orderBy: { createdAt: "asc" },
    include: {
      sender: { select: { id: true, username: true, displayName: true } },
      receiver: { select: { id: true, username: true, displayName: true } }
    },
    take: 500
  });

  const conversations = new Map<string, ApiConversation>();
  const threads: Record<string, ApiMessage[]> = {};

  for (const message of messages) {
    const other = message.senderId === userId ? message.receiver : message.sender;
    const threadId = other.id;
    const apiMessage: ApiMessage = {
      id: message.id,
      from: message.senderId === userId ? "me" : "them",
      body: message.body,
      time: formatTime(message.createdAt),
      createdAt: message.createdAt.toISOString()
    };

    threads[threadId] = [...(threads[threadId] ?? []), apiMessage];
    conversations.set(threadId, {
      id: threadId,
      receiverId: other.id,
      receiverUsername: other.username,
      name: other.displayName,
      handle: `@${other.username}`,
      lastMessage: message.body,
      time: formatTime(message.createdAt),
      unread: message.receiverId === userId && !message.readAt
    });
  }

  return { conversations: Array.from(conversations.values()).reverse(), threads };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);
    return ok(await buildInbox(session.user.id));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);

    const parsed = messageSchema.parse(await request.json());
    if (!parsed.receiverId && !parsed.receiverUsername) return fail("Receiver is required", 400);

    const receiver = parsed.receiverId
      ? await prisma.user.findUnique({ where: { id: parsed.receiverId }, select: { id: true } })
      : await prisma.user.findUnique({ where: { username: parsed.receiverUsername }, select: { id: true } });

    if (!receiver) return fail("Receiver not found", 404);
    if (receiver.id === session.user.id) return fail("You cannot send a message to yourself", 400);

    const message = await prisma.message.create({
      data: { senderId: session.user.id, receiverId: receiver.id, body: parsed.body }
    });

    await prisma.notification.create({
      data: {
        userId: receiver.id,
        type: "MESSAGE",
        title: "New message",
        body: parsed.body.slice(0, 140),
        href: "/messages"
      }
    }).catch(() => null);

    return ok({ message, ...(await buildInbox(session.user.id)) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
