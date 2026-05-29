import { MessagesClient } from "@/components/MessagesClient";
import { Shell } from "@/components/Shell";

export default function MessagesPage() {
  return (
    <Shell active="/messages">
      <MessagesClient />
    </Shell>
  );
}
