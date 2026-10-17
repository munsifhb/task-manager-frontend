import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '@/context/TaskContext';

export default function UpComing() {


  const { tasks,  loading } = useContext(TaskContext);

  
  
    

  const upcomingTasks = tasks
  .filter((task) => task.dueDate && !task.completed)
  .filter((task) => new Date(task.dueDate) >= new Date())
  .sort(
    (a, b ) =>
      new Date(a.dueDate).getTime() -
      new Date(b.dueDate).getTime() 
      
  ).slice(0, 3);


  return (
<div className="mt-4 space-y-3 bg-white rounded overflow-x-hidden shadow h-80 p-2">

  <h1 className="text-lg text-gray-900 font-semibold font-mono text-center py-4 bg-gray-100">
                Upcoming Events
            </h1>

            {upcomingTasks.length == 0 ?  (<p className='text-gray-600 font-mono text-center'>No comming Events.</p>) 
            :
            (
              <div className="">

    {upcomingTasks.map((task) => (
      <div
        key={task.id}
        className="rounded-lg border bg-white p-3 m-1"
      >
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-900 text-lg font-mono">
            {task.title}
          </p>

          <span
            className={
              task.completed
                ? "text-green-500 font-mono"
                : "text-orange-600 font-mono"
            }
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          {new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    ))}
    </div>
    )}
  
  
    </div>


    
  )
}
