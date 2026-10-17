"use client";

import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext(true);
import type {Task} from '@/types/task'



export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {

    

  const [isOpenMenu, setIsOpenMenu] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [filterTask, setFilterTask] = useState("all");
  const [search, setSearch]  = useState("");
  const [isCreating, setIsCreating] = useState(false)
  const [searchtasks, setSearchTasks] = useState<Task[]>([])

//   get tasks

const getTasks = async () => {
  try {
    setLoading(true);

    let url = "https://nest-task-manager-api.onrender.com/tasks";

    if (filterTask === "completed") {
      url += "?completed=true";
    }

    if (filterTask === "pending") {
      url += "?completed=false";
    }

    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();

    setTasks(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getTasks();
  }, [filterTask]);


  // get searched tasks

const getSearchedTasks = async () => {
  // Prevent searching if the user only typed spaces
  if (!search.trim()) return; 

  try {
    setLoading(true);

    const response = await fetch(
      `https://nest-task-manager-api.onrender.com/tasks/search?title=${encodeURIComponent(
        search.trim()
      )}`,
      {
        method: "GET", // Good practice to explicitly state the method
        credentials: "include", // Correct for sharing session cookies/auth tokens
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search tasks");
    }

    const data = await response.json();

    setSearchTasks(data); 
    
  } catch (error) {
    console.error("Search error:", error);
    // Optional: setAnErrorState(error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const trimmedSearch = search.trim();

  // If the user clears the input, clear the results immediately without calling the backend
  if (!trimmedSearch) {
    setSearchTasks([]); 
    return;
}

  // Wait 300ms after the user stops typing before making the API request
  const delayDebounceFn = setTimeout(() => {
    getSearchedTasks(trimmedSearch);
  }, 300);

  // CLEANUP: If the user types another letter before 300ms is up, cancel the previous timer
  return () => clearTimeout(delayDebounceFn);
}, [search]);useEffect(() => {
  const trimmedSearch = search.trim();

  // If the user clears the input, clear the results immediately without calling the backend
  if (!trimmedSearch) {
    setSearchTasks([]); 
    return;
  }

  // Wait 300ms after the user stops typing before making the API request
  const delayDebounceFn = setTimeout(() => {
    getSearchedTasks(trimmedSearch);
  }, 300);

  // CLEANUP: If the user types another letter before 300ms is up, cancel the previous timer
  return () => clearTimeout(delayDebounceFn);
}, [search]);



  // logout

  const logout = async () => {
  try {
    const response = await fetch(
      "https://nest-task-manager-api.onrender.com/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    // Clear frontend state
    setUsername("");
    setTasks([]);

  } catch (error) {
    console.error(error);
  }
};


// Edit tasks 
const updateTask = async (
  id: number,
  updatedTask: {
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: string;
    completed?: boolean;
  }
) => {
  try {
    const response = await fetch(`https://nest-task-manager-api.onrender.com/tasks/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message);
      return;
    }

    // Update the task inside Context
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? data : task
      )
    );

  } catch (error) {
    console.error(error);
  }
};

// Create tasks

const createTask = async (task: {
  title: string;
  description?: string;
  dueDate: string;
  priority?: string;
}) => {
  try {
    setIsCreating(true)
    const response = await fetch("https://nest-task-manager-api.onrender.com/tasks", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message);
      return;
    }
 

    // Add the newly created task to our existing state
    setTasks((currentTasks) => [...currentTasks, data]);

  } catch (error) {
    console.error(error);
  }finally{
    setIsCreating(false)
  }
};





  return (
    <TaskContext.Provider value={{ 
        isOpenMenu,
        setIsOpenMenu,
        tasks,
        setTasks,
        loading,
        getTasks,
        createTask,
        username,
        logout,
        updateTask,
        authLoading,
        filterTask,
        setFilterTask,
        getSearchedTasks,
        search,
        setSearch,
        setIsCreating,
        isCreating,
        setSearchTasks,
        searchtasks
        }}>
      {children}
    </TaskContext.Provider>
  );
}