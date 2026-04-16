"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Comment {
  id: string;
  pageTitle: string;
  author: string;
  email: string;
  text: string;
  status: "open" | "resolved";
  createdAt: string;
}

const DEMO_COMMENTS: Comment[] = [
  { id: "c1", pageTitle: "Homepage", author: "Client — Acme Corp", email: "john@acme.com", text: "Can we change the hero headline to be more benefit-focused? Something like 'Save 10 hours per week' instead.", status: "open", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "c2", pageTitle: "Pricing Page", author: "Client — DesignCo", email: "sarah@designco.com", text: "The pricing table looks great! Can we add a comparison to competitor prices?", status: "open", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "c3", pageTitle: "Landing Page v2", author: "Client — StartupX", email: "mike@startupx.com", text: "Approved! Ship it. The CTA color change really helped.", status: "resolved", createdAt: new Date(Date.now() - 172800000).toISOString() },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function CommentsPage() {
  const [comments, setComments] = useState(DEMO_COMMENTS);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("all");

  const filtered = filter === "all" ? comments : comments.filter((c) => c.status === filter);

  const resolve = (id: string) => {
    setComments((prev) => prev.map((c) => c.id === id ? { ...c, status: "resolved" } : c));
    toast.success("Comment resolved");
  };

  const reopen = (id: string) => {
    setComments((prev) => prev.map((c) => c.id === id ? { ...c, status: "open" } : c));
    toast.success("Comment reopened");
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    toast.success("Comment deleted");
  };

  const openCount = comments.filter((c) => c.status === "open").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Comments</h1>
          <p className="text-sm text-muted-foreground">Client feedback inbox — {openCount} open</p>
        </div>
        <div className="flex gap-2">
          {(["all", "open", "resolved"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              className="capitalize"
              onClick={() => setFilter(f)}
            >
              {f}
              {f === "open" && openCount > 0 && (
                <Badge className="ml-1.5 h-4 px-1 text-[10px] bg-red-500 text-white border-0">{openCount}</Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-20 text-center">
          <p className="text-lg font-medium text-muted-foreground">No {filter === "all" ? "" : filter} comments</p>
          <p className="text-sm text-muted-foreground mt-1">Client feedback will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((comment) => (
            <Card key={comment.id} className={comment.status === "resolved" ? "opacity-60" : ""}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.email}</span>
                      <Badge variant="outline" className="text-[10px]">📄 {comment.pageTitle}</Badge>
                      <Badge
                        className={`text-[10px] ${comment.status === "open" ? "bg-blue-500/10 text-blue-600 border-blue-200" : "bg-green-500/10 text-green-600 border-green-200"}`}
                      >
                        {comment.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {comment.status === "open" ? (
                      <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => resolve(comment.id)}>✓ Resolve</Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => reopen(comment.id)}>Reopen</Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs h-7 text-destructive hover:text-destructive" onClick={() => deleteComment(comment.id)}>Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
