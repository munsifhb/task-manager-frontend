
"use client";

import { createContext, useState, useEffect } from "react";
import type { Task } from "@/types/task";

interface TaskContextType {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;

  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;

  loading: boolean;
  getTasks: () => Promise<void>;

  createTask: (task: {
    title: string;
    description?: string;
    dueDate: string;
    priority?: string;
  }) => Promise<void>;

  username: string;
  logout: () => Promise<void>;

  updateTask: (
    id: number,
    updatedTask: {
      title?: string;
      description?: string;
      dueDate?: string;
      priority?: string;
      completed?: boolean;
    }
  ) => Promise<void>;

  authLoading: boolean;

  filterTask: string;
  setFilterTask: React.Dispatch<React.SetStateAction<string>>;

  getSearchedTasks: () => Promise<void>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  isCreating: boolean;

  setSearchTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  searchtasks: Task[];
}

export const TaskContext = createContext<TaskContextType | null>(null);

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
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [searchtasks, setSearchTasks] = useState<Task[]>([]);

  // Get tasks
  const getTasks = async () => {
    try {
      setLoading(true);

      let url = "/api/backend/tasks";

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

      const data: Task[] = await response.json();
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

  // Search tasks
  const getSearchedTasks = async () => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setSearchTasks([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/backend/tasks/search?title=${encodeURIComponent(
          trimmedSearch
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search tasks");
      }

      const data: Task[] = await response.json();
      setSearchTasks(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search requests
  useEffect(() => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setSearchTasks([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      getSearchedTasks();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Logout
  const logout = async () => {
    try {
      const response = await fetch(
        "/api/backend/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUsername("");
      setTasks([]);
      setSearchTasks([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Update task
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
      const response = await fetch(
        `/api/backend/tasks/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? data : task))
      );

      setSearchTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? data : task))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Create task
  const createTask = async (task: {
    title: string;
    description?: string;
    dueDate: string;
    priority?: string;
  }) => {
    try {
      setIsCreating(true);

      const response = await fetch(
        "/api/backend/tasks",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setTasks((currentTasks) => [...currentTasks, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
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
        searchtasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
