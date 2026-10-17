"use client";
import { ChevronDown, ChevronUp, Circle, CircleCheckBig, Edit2Icon, LoaderCircle, Trash2Icon } from 'lucide-react'
import React, { useState, useContext } from 'react'
import { TaskContext } from '@/context/TaskContext';
import type { Task } from "@/types/task";



export default function TasksList({
  setEditingTask,
}: {
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
}) {

    const context = useContext(TaskContext);

if (!context) {
  throw new Error("TasksList must be inside TaskProvider");
}

const {
  tasks,
  loading,
  setTasks,
  updateTask,
  filterTask,
  setFilterTask,
} = context;

const [openMore, setOpenMore] = useState<number | null>(null);
    

const toggleComplete = async (
  id: number,
  completed: boolean
) => {
  await updateTask(id, {
    completed: !completed,
  });
};


if (loading) {
  return <LoaderCircle className='size-12 mt-5 mx-auto animate-spin stroke-3 stroke-blue-500 fill-blue-50'/>;
}




const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`https://nest-task-manager-api.onrender.com/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    console.log("Task deleted");
  } catch (error) {
    console.error(error);
  }
};

const filteredTasks = tasks.filter((task) => {
  if (filterTask === "completed") {
    return task.completed;
  }

  if (filterTask === "pending") {
    return !task.completed;
  }

  return true;
});


  return (
    <div className=' w-full bg-white font-mono text-gray-950 h-fit'>

        <div className="">
          <div className="grid grid-cols-3 gap-2 p-5">
  <button
    onClick={() => setFilterTask("all")}
    className={`border shadow py-1 cursor-pointer rounded transition-all
      ${
        filterTask === "all"
          ? "bg-blue-600 text-white"
          : "bg-gray-50 text-gray-950 hover:bg-blue-600 hover:text-white"
      }`}
  >
    All
  </button>

  <button
    onClick={() => setFilterTask("completed")}
    className={`border shadow py-1 cursor-pointer rounded transition-all
      ${
        filterTask === "completed"
          ? "bg-blue-600 text-white"
          : "bg-gray-50 text-gray-950 hover:bg-blue-600 hover:text-white"
      }`}
  >
    Completed
  </button>

  <button
    onClick={() => setFilterTask("pending")}
    className={`border shadow py-1 cursor-pointer rounded transition-all
      ${
        filterTask === "pending"
          ? "bg-blue-600 text-white"
          : "bg-gray-50 text-gray-950 hover:bg-blue-600 hover:text-white"
      }`}
  >
    Pending
  </button>
</div>
          <h1 className="text-xl md:text-2xl text-gray-900 tracking-tighter font-sans font-semibold">Task List</h1>

          {/* Header */}
<div className="hidden lg:grid w-full  grid-cols-[2fr_3fr_1fr_1fr_1fr] items-center gap-4 px-4 py-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
  <h2>Title</h2>
  <h2>Created At</h2>
  <h2 className="text-center">Priority</h2>
  <h2 className="text-center">Status</h2>
  <h2 className="text-center">Actions</h2>
</div>

{/* Tasks */}
{filteredTasks.length === 0? (
  <p className="text-gray-500 font-mono text-center">
    No Task Added yet!
  </p>
)
:(
<div className="space-y-3 lg:space-y-0 ">
  {filteredTasks.map((task) => (
    <div
      key={task.id}
      className="
        relative w-full h-fit
        bg-white
        border border-gray-200
        lg:border-x-0 lg:border-t-0
        rounded-xl lg:rounded-none
        shadow-sm lg:shadow-none
        hover:bg-gray-50
        transition-colors
        p-4 lg:px-4 lg:py-3
        grid
        grid-cols-3
        lg:grid-cols-[2fr_3fr_1fr_1fr_1fr]
        gap-y-4 lg:gap-4
        items-center
      "
    >

      {/* Title */}
      <div className="col-span-2 lg:col-span-1 flex items-center gap-3 min-w-0">
        {task.completed ? (
          <CircleCheckBig
            onClick={() => toggleComplete(task.id, task.completed)}
            className="shrink-0 size-5 stroke-green-500 cursor-pointer"
          />
        ) : (
          <Circle
            onClick={() => toggleComplete(task.id, task.completed)}
            className="shrink-0 size-5 stroke-gray-400 hover:stroke-green-500 cursor-pointer transition-colors"
          />
        )}

        <p
          className={`font-mono text-sm truncate ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-900"
          }`}
        >
          {task.title}
        </p>
      </div>

      {/* Created At */}
      <div className="hidden lg:block text-sm text-gray-500">
        {new Date(task.createdAt).toLocaleString()}
      </div>

      {/* Priority */}
      <div className="flex lg:justify-center">
        <span
          className={`
            px-2.5 py-1
            rounded-full
            text-xs
            font-medium
            capitalize
            ${
              task.priority === "HIGH"
                ? "bg-red-100 text-red-600"
                : task.priority === "MEDIUM"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-600"
            }
          `}
        >
          {task.priority}
        </span>
      </div>

      {/* Status */}
      <div className="flex lg:justify-center">
        <span
          className={`
            px-2.5 py-1
            rounded-full
            text-xs
            font-medium
            ${
              task.completed
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-orange-600"
            }
          `}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end lg:justify-center relative">
        {openMore === task.id ? (
          <ChevronUp
            onClick={() =>
              setOpenMore(openMore === task.id ? null : task.id)
            }
            className="size-5 cursor-pointer text-gray-600"
          />
        ) : (
          <ChevronDown
            onClick={() =>
              setOpenMore(openMore === task.id ? null : task.id)
            }
            className="size-5 cursor-pointer text-gray-600"
          />
        )}

        {/* Action menu */}
        <div
          className={`
            absolute right-0 lg:right-1/2 lg:translate-x-1/2
            top-7
            flex items-center gap-3
            px-3 py-2
            rounded-lg
            shadow-lg
            border border-gray-200
            bg-white
            z-50
            transition-all duration-200
            ${
              openMore === task.id
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-2 opacity-0 pointer-events-none"
            }
          `}
        >
          <Trash2Icon
            onClick={() => deleteTask(task.id)}
            className="size-4 text-red-500 hover:text-red-700 cursor-pointer transition-colors"
          />

          <Edit2Icon
            onClick={() => setEditingTask(task)}
            className="size-4 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
          />
        </div>
      </div>

      {/* Mobile metadata */}
      <div className="col-span-2 lg:hidden flex justify-between items-center pt-2 border-t border-gray-100 text-xs text-gray-400">
        <span>
          Created {new Date(task.createdAt).toLocaleDateString()}
        </span>

        <span>
          Task #{task.id}
        </span>
      </div>
    </div>
  ))}
</div>)
}
   

        

              
              </div>

              

              

            
            
          
          
          
        



    </div>
  )
}
