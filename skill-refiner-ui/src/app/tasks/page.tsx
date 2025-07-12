// app/tasks/page.tsx
import { DataTable } from './data-table'
import { Task, columns } from "./columns"


async function getTasks(): Promise<Task[]> {
  const res = await fetch('http://localhost:3001/tasks') // Adjust your endpoint
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export default async function TasksPage() {
  const tasks = await getTasks()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Uploaded Tasks</h1>
      <DataTable columns={columns} data={tasks} />
    </div>
  )
}
