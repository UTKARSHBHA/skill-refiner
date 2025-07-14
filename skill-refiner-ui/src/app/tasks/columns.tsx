// app/tasks/columns.tsx
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { FeedbackDialog } from '@/components/FeedbackDialog'

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
    accessorKey: "feedbacks",
    header: "Feedback",
    cell: ({ row }) => {
      const rawFeedbacks = row.original.feedbacks || [];
    
      const feedbacks = rawFeedbacks.map((fb: any) => ({
        content: fb.content,
        createdAt: fb.createdAt ?? "",
      }));
    
      return (
        <FeedbackDialog feedbacks={feedbacks} />
      );
    }
  }
  
  
]
