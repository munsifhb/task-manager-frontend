"use client"
import React, { useContext } from 'react'
import {Search, Menu, Bell, X, SidebarOpen, User, CircleCheckBig, Circle} from 'lucide-react'
import { useState, useEffect } from 'react';
import { TaskContext } from '@/context/TaskContext';
import { UserContext } from '@/context/UserContext';

export default function Header() {

    const { isOpenMenu, setIsOpenMenu, tasks, search, setSearch, searchtasks} = useContext(TaskContext);
      const context = useContext(UserContext);
 

      const {users} = context;


//       const handleSearch = (e: React.FormEvent) => {
//   e.preventDefault();
//   getSearchedTasks();
// };

console.log("search")

const today = new Date();

const dueTask = tasks.filter((task) => {
  if (task.completed) return false;

  const dueDate = new Date(task.dueDate);

  return (
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getDate() === today.getDate()
  );
}).length;

console.log(searchtasks)
    



  return (
    <div className='w-full'>
        
        <header className="flex justify-between items-center px-2 bg-white py-2  lg:py-4">

    
.
                <SidebarOpen className='stroke-gray-500 mr-2 cursor-pointer md:hidden' onClick={() => setIsOpenMenu(!isOpenMenu)}/>
            

            

            

            <div className="w-3/4 md:w-full relative ">
                <input
                value={search}
  onChange={(e) => setSearch(e.target.value)}
                
                 type="text" placeholder='serach tasks...' 
                className='border-2 border rounded-4xl font-mono md:text-lg sm:text-sm shadow-sm px-2 py-1 md:py-5 h-8 text-gray-900 w-full'
                />
               <button type="submit" className='absolute right-2 md:bottom-1 md:top-1.5 top-0.5'>
                <Search className=' sm:size-4 md:size-8   stroke-gray-500 fill-gray-100 size-7 group-hover:stroke-gray-50 duration-200 delay-150  cursor-pointer'/>
                </button>


{search.trim() && (                
<div
  className="
    absolute left-0 right-0 top-full z-50 mt-0 w-full
    overflow-hidden rounded-xl
    border border-gray-200
    bg-white
    shadow-xl shadow-gray-200/50
  "
>
  {/* Search result header */}
  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
    <div>
      <p className="text-sm font-semibold text-gray-800">
        Search Results
      </p>

      <p className="text-xs text-gray-400">
        {searchtasks.length}{" "}
        {searchtasks.length === 1 ? "task" : "tasks"} found
      </p>
    </div>

    <Search className="size-4 text-gray-400" />
  </div>

  {/* Results */}
  <div className="max-h-[360px] overflow-y-auto">
    {searchtasks.length > 0 ? (
      <div className="divide-y divide-gray-100">
        {searchtasks.map((task) => (
          <div
            key={task.id}
            className="
              group flex w-full items-center gap-3
              px-4 py-3
              transition-colors
              hover:bg-gray-50
            "
          >
            {/* Task status icon */}
            <div
              className={`
                flex size-9 shrink-0 items-center justify-center
                rounded-full
                ${
                  task.completed
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }
              `}
            >
              {task.completed ? (
                <CircleCheckBig className="size-4" />
              ) : (
                <Circle className="size-4" />
              )}
            </div>

            {/* Task information */}
            <div className="min-w-0 flex-1">
              <h3
                className={`
                  truncate text-sm font-semibold
                  ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800 group-hover:text-blue-600"
                  }
                `}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="mt-0.5 truncate text-xs text-gray-400">
                  {task.description}
                </p>
              )}

              <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                <span>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>

                <span>•</span>

                <span
                  className={`
                    font-medium
                    ${
                      task.priority === "HIGH"
                        ? "text-red-500"
                        : task.priority === "MEDIUM"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  `}
                >
                  {task.priority}
                </span>
              </div>
            </div>

            {/* Status */}
            <span
              className={`
                hidden shrink-0 rounded-full px-2.5 py-1
                text-[11px] font-medium sm:inline-flex
                ${
                  task.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }
              `}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    ) : (
      /* No results */
      <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100">
          <Search className="size-5 text-gray-400" />
        </div>

        <h3 className="text-sm font-semibold text-gray-700">
          No tasks found
        </h3>

        <p className="mt-1 max-w-xs text-xs text-gray-400">
          We couldn't find any task matching your search.
        </p>
      </div>
    )}
  </div>
</div>)}


                
            </div>

            

            <div className="flex items-center gap-1">
                <User className=' stroke-gray-500 fill-gray-100 sm:size-4 md:size-8   cursor-pointer'/>
                <Bell className='stroke-gray-500 fill-gray-3100 sm:size-4 md:size-8  cursor-pointer'/>
            </div>
        </header>

        <div className="bg-white p-2 border-t-2 shadow   border-gray-200">
            <h2 className="text-lg md:text-xl text-gray-900 font-normal tracking-tighter font-mono">
  Good day, {users?.username ?? "there"} 👋
</h2>
            <p className="text-xs text-gray-500 font-mono">You have <span className='text-blue-600'>{dueTask}</span> due today</p>
        </div>
    </div>
  )
}
