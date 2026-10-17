"use client"
import React from 'react'
import {useState, useEffect} from 'react'
import UpComing from './UpComing'  
import {CircleCheck, ChartLineIcon, TrendingUp, ChartNoAxesColumn, CircleCheckBig, MoreVertical, DeleteIcon, Edit2Icon, Trash2Icon, ChevronDown, ChevronUp, ListTodo, Circle, LucideFileExclamationPoint, FileExclamationPointIcon, InfoIcon} from 'lucide-react'
import TasksList from './TasksList'
import { Calendar } from './ui/calendar'
import Input from './Input'
import { useContext } from 'react'
import { TaskContext } from '@/context/TaskContext'
import TaskProgressChart from "@/components/charts/TaskProgressChart";

export default function Body() {

  const context = useContext(TaskContext);

if (!context) {
  throw new Error("Body must be inside TaskProvider");
}

const { tasks, setTasks } = context;


  const [selectedDate, setSelectedDate] = useState<Date | undefined>();


   

  const upcomingTasks = tasks
    .filter((task) => task.dueDate && !task.completed)
    .filter((task) => new Date(task.dueDate) >= new Date())
    .sort(
      (a, b ) =>
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime() 
        
    ).slice(0, 3);

  const taskDates = tasks
  .filter((task) => task.dueDate)
  .map((task) => new Date(task.dueDate));

  console.log(taskDates)

  const selectedTasks = selectedDate
  ? tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);

      return (
        taskDate.getFullYear() === selectedDate.getFullYear() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getDate() === selectedDate.getDate()
      );
    })
  : [];


          const totalTasks = tasks.length;






  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

        const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;


  

  
      
  
  return (
    <div className=' w-full p-2'>


        <div className="flex items-center justify-between bg-white border-2 border-gray-200 p-2 rounded-sm shadow mt-5">
            <div className='flex items-center gap-2'>
            <CircleCheckBig className='fill-gray-200 stroke-blue-600 size-10 md:size-12' />


            <div className="bg-white">
            <h2 className="text-lg md:text-xl text-gray-900 font-normal tracking-tighter font-sans">Today't progress</h2>
            <p className="text-xs text-gray-500 font-sans">You've completed <span className='text-blue-600'>{completedTasks} of {totalTasks} tasks</span></p>
        </div>
        </div>

        <TrendingUp className='stroke-blue-600 size-6 md:size-10'/>
        </div>

        {/* Tasks review */}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 py-2">
          <div className="bg-white shadow flex flex-row-reverse items-center justify-between px-3 py-1">
            <ListTodo className='fill-blue-600 stroke-blue-600 size-6 md:size-10' />

            <div className="flex flex-col items-center justify-center">
            <h3 className="text-gray-700 md:text-sm font-mono text-xs">Total task</h3>
            <h1 className="text-gray-900 font-semibold font-mono text-xl md:text-2xl">{totalTasks}</h1>
            <h3 className="text-gray-400 text-xs font-mono md:text-sm">All task</h3>

            </div>
          </div>


          <div className="bg-white shadow flex flex-row-reverse  items-center justify-between px-3 py-1">
            <Circle className='fill-white stroke-amber-500 size-6  md:size-10' />

            <div className="flex flex-col items-center justify-center">
            <h3 className="text-gray-700 md:text-sm font-mono text-xs">Pending task</h3>
            <h1 className="text-gray-900 font-semibold  font-mono text-xl md:text-2xl">{pendingTasks}</h1>
            <h3 className="text-gray-400 text-xs md:text-sm font-mono">{Math.round((pendingTasks / totalTasks) * 100)}% of task</h3>
            </div>
          </div>


          <div className="bg-white  shadow flex flex-row-reverse items-center justify-between px-3 py-1">
            <CircleCheckBig className='fill-white stroke-green-600 size-6 md:size-10' />

            <div className="flex flex-col items-center justify-center">
            <h3 className="text-gray-700 md:text-sm text-xs font-mono">Completed task</h3>
            <h1 className="text-gray-900 font-semibold text-xl font-mono md:text-2xl">{completedTasks}</h1>
            <h3 className="text-gray-400 text-xs md:text-sm font-mono">{completionRate}% of task</h3>
            </div>
          </div>


          <div className="bg-white  shadow flex flex-row-reverse items-center justify-between px-3 py-1">
            <InfoIcon className='fill-white stroke-red-600 size-6 md:size-10 rotate-180' />

            <div className="flex flex-col items-center justify-center">
            <h3 className="text-gray-700 md:text-sm text-xs font-mono">Overdue</h3>
            <h1 className="text-gray-900 font-semibold text-xl font-mono md:text-2xl">{upcomingTasks.length}</h1>
            <h3 className="text-gray-400 text-xs md:text-sm font-mono">{Math.round((upcomingTasks.length / totalTasks) * 100)}% of task</h3>
            </div>
          </div>
        </div>

        <div className="  w-full mt-3 gap-2">
          
  
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-2 w-full">

         
  <Calendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
    modifiers={{
      hasTask: taskDates,
    }}
  className='w-full bg-white border-gray-200 shadow-sm rounded' />


          {/* <UpComing /> */}

          <div className='bg-white p-2  rounded rounded-t-2xl'>

        <div className="py-4 bg-gray-50 shadow">
            <h1 className="text-lg text-gray-900 font-semibold font-mono text-center ">
                Event Charts
            </h1>

            <TaskProgressChart tasks={tasks} />
            
        </div>

        {/* <div className="grid grid-cols-[3fr_2fr_2fr] gap-2">
              <h1 className="text-sm text-gray-900 text-start p-1 font-mono font-semibold bg-blue-100 border-b-2 border-blue-900">
                Event Name
              </h1>
              <h1 className="text-sm text-gray-900 text-start p-1 font-mono font-semibold bg-red-100 border-b-2 border-blue-900">
                Event dueDate
              </h1>
              <h1 className="text-sm text-gray-900 text-start p-1 font-mono font-semibold bg-yellow-100 border-b-2 border-blue-900">
                Event Status
              </h1>
            </div>

         
         {selectedTasks.map((task) => (
    <div key={task.id} className='grid grid-cols-[3fr_2fr_2fr] gap-2 py-2 bg-blue-50 mt-2 px-1 border-b-4 border-blue-900'>
    <p className='text-lg text-blue-500 font-mono font-semibold'>
    
      {task.title}
    </p>
  <p className="text-red-500 font-mono font-semibold">
  {new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}
  
  </p>
      <p className={task.completed ? "text-green-500" : "text-orange-600"}>
      {task.completed ? "Completed" : "Pending"}
    </p>
    
    </div>
  ))} */}

  


    </div>
        </div>
        </div>

        <UpComing />

        
  
</div>

        

        
    
    
  )
}




