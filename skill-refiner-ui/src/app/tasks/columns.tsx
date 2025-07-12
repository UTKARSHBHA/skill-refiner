// app/tasks/columns.tsx
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

export type Task = {
  id: number
  title: string
  createdAt: string
  feedbacks: {
    content: string
  }[]
}



export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'createdAt',
    header: 'Uploaded At',
    cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'dd MMM yyyy'),
  },
  {
    id: 'feedback',
    header: 'Feedback',
    cell: ({ row }) => {
      const feedbacks = row.original.feedbacks;
  
      if (!feedbacks || feedbacks.length === 0) {
        return <span className="text-muted-foreground text-sm">No Feedback</span>
      }
  
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View ({feedbacks.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Feedback</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm whitespace-pre-wrap">
              {feedbacks.map((f, i) => (
                <div key={i}>
                  <p className="font-medium">Feedback #{i + 1}:</p>
                  <p>{f.content}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  }
  
]
