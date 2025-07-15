// components/FeedbackDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { Copy, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export interface FeedbackDialogProps {
  feedbacks: { content: string; createdAt: string }[];
}

export const FeedbackDialog = ({ feedbacks }: FeedbackDialogProps) => {
  const [open, setOpen] = useState(false);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied feedback to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Feedback</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Detailed feedback for this resume
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          {feedbacks.map((f, index) => (
            <div
              key={index}
              className="bg-muted rounded-xl p-4 mb-4 relative group"
            >
              <div className="text-muted-foreground text-sm flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(f.createdAt), "dd MMM yyyy, hh:mm a")}
              </div>

              <div className="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{f.content}</ReactMarkdown>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                onClick={() => copyToClipboard(f.content)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
