'use client'

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface FeedbackDialogProps {
  feedbacks: { content: string; createdAt: string }[]
}

export function FeedbackDialog({ feedbacks }: FeedbackDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Feedback</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          {feedbacks.length === 0 ? (
            <p>No feedback available.</p>
          ) : (
            feedbacks.map((fb, i) => (
              <div key={i} className="border-b pb-2">
                <p className="whitespace-pre-line">{fb.content}</p>
                <p className="text-xs mt-1 text-right italic">
                  {new Date(fb.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
