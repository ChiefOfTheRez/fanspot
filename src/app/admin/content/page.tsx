"use client";

import { useState } from "react";
import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { FeedPostCard } from "@/components/FeedPostCard";
import { Shell } from "@/components/Shell";
import { feedPosts } from "@/lib/mock-data";

export default function AdminContentPage() {
  // Manage posts locally for admin review. Each post can be approved or removed.
  const [posts, setPosts] = useState(() => feedPosts.map((p) => ({ ...p, status: "PENDING" as "PENDING" | "APPROVED" }))); 

  const handleApprove = (id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "APPROVED" } : p)));
  };
  const handleRemove = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <SectionHeader
          eyebrow="Admin"
          title="Content review"
          description="Review pending posts and media before approval. This is critical before enabling uploads."
        />
        <Card className="flex flex-wrap gap-2">
          <Badge tone="blue">
            <Eye className="mr-1 h-3 w-3" /> Pending review
          </Badge>
          <Badge tone="green">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Approve
          </Badge>
          <Badge tone="red">
            <XCircle className="mr-1 h-3 w-3" /> Remove
          </Badge>
        </Card>
        <div className="space-y-5">
          {posts.length ? (
            posts.map((post) => (
              <Card key={post.id} className="relative">
                {/* Show a small badge if the post has been approved */}
                {post.status === "APPROVED" ? (
                  <span className="absolute right-4 top-4 rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">Approved</span>
                ) : null}
                <FeedPostCard post={post} />
                {post.status === "PENDING" ? (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="flex-1 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRemove(post.id)}
                      className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : null}
              </Card>
            ))
          ) : (
            <Card>
              <p className="p-4 text-sm text-slate-400">No posts pending review.</p>
            </Card>
          )}
        </div>
      </div>
    </Shell>
  );
}
