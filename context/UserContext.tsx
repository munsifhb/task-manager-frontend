
"use client";

import {
  createContext,
  useState,
  useEffect,
} from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}

interface UserContextType {
  users: User | null;
  loadingUser: boolean;
  getUsers: () => Promise<void>;

  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  getAllUsers: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Get the currently logged-in user
  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://nest-task-manager-api.onrender.com/auth/me",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUser(false);
    }
  };

  // Get all users
  const getAllUsers = async () => {
    try {
      const response = await fetch(
        "https://nest-task-manager-api.onrender.com/users",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: User[] = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        getUsers,
        users,
        loadingUser,
        getAllUsers,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
