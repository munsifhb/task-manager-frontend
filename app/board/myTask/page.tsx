"use client";

import Header from "@/components/Header";
import Input from "@/components/Input";
import TasksList from "@/components/TasksList";
import { useState } from "react";
import type { Task } from "@/types/task";

export default function Page() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="px-1 bg-gray-50 pb-2 w-full  relative">
      <main className="w-full">
        

        <Input
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />

        <TasksList
          setEditingTask={setEditingTask}
        />
      </main>
    </div>
  );
}