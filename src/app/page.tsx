// src/app/page.tsx
'use client';

import { TaskList } from "@/components/taskList";


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <TaskList />
    </main>
  );
}