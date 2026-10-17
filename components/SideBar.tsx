"use client";

import React, { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

import {
    Badge,
  ChartBar,
  Folder,
  Home,
  ListTodo,
  LogOut,
  PowerOffIcon,
  Settings2,
  User,
  User2,
  User2Icon,
  X,
} from "lucide-react";

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

const taskContext = useContext(TaskContext);

if (!taskContext) {
  throw new Error("SideBar must be inside TaskProvider");
}

const {
  isOpenMenu,
  setIsOpenMenu,
  logout,
} = taskContext;

  const context = useContext(UserContext);

  if (!context) {
  throw new Error("SideBar must be inside TaskProvider");
}
  
  
    const { users } = context;

    

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const links = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/board",
    },
    {
      title: "My Tasks",
      icon: ListTodo,
      href: "/board/myTask",
    },
    {
      title: "Profile",
      icon: User2,
      href: "/board/profile",
    },
    {
      title: "Records",
      icon: ChartBar,
      href: "/board/Records",
    },
  ];

  const bottomLinks = [
    {
      title: "Settings",
      icon: Settings2,
      href: "/board/settings",
    },

    
  ];

  const usersLinks = [
    {
      title: "Users",
      icon: User2Icon,
      href: "/board/users",
    },

    
  ];

  const isActive = (href: string) => {
    if (href === "/board") {
      return pathname === "/board";
    }

    return pathname.startsWith(href);
  };

  

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={() => setIsOpenMenu(true)}
        className={`
          fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]
          transition-opacity duration-300 md:hidden font-mono
          ${
            !isOpenMenu
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[280px]
          flex-col border-r border-gray-200 bg-white
          shadow-xl
          transition-transform duration-300 ease-in-out

          md:sticky md:z-30 md:w-64
          md:translate-x-0 md:shadow-none

          ${!isOpenMenu ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* ================= HEADER ================= */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-5">

          <Link
            href="/board"
            onClick={() => setIsOpenMenu(true)}
            className="flex items-center gap-3"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
              <ListTodo
                className="size-5 text-white"
              />
            </div>

            <div>
              <h1 className="text-base font-bold tracking-tight text-gray-900">
                Task Manager
              </h1>

              <p className="text-[11px] text-gray-400">
                Stay organized
              </p>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setIsOpenMenu(true)}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 md:hidden"
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
            Workspace
          </p>

          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpenMenu(true)}
                  className={`
                    group relative flex items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      active
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                        : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {active && (
                    <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
                  )}

                  <Icon
                    className={`
                      size-[19px] shrink-0 transition-colors

                      ${
                        active
                          ? "text-white"
                          : "text-gray-400 group-hover:text-blue-600"
                      }
                    `}
                  />

                  <span>{link.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Settings */}
          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
            Preferences
          </p>

          <div className="space-y-1">
            {bottomLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpenMenu(true)}
                  className={`
                    group flex items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  <Icon
                    className={`
                      size-[19px]

                      ${
                        active
                          ? "text-white"
                          : "text-gray-400 group-hover:text-blue-600"
                      }
                    `}
                  />

                  <span>{link.title}</span>
                </Link>
              );
            })}

            {usersLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpenMenu(true)}
                  className={`
                    group flex items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                    }
                    ${
                        users?.role === "ADMIN" ? "flex" : "hidden"
                    }
                  `}
                >
                  <Icon
                    className={`
                      size-[19px]

                      ${
                        active
                          ? "text-white"
                          : "text-gray-400 group-hover:text-blue-600"
                      }
                    `}
                  />

                  <span>{link.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-gray-100 p-3">

          {/* User profile */}
          <Link
            href="/board/profile"
            onClick={() => setIsOpenMenu(true)}
            className="mb-2 flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <User className="size-5 text-blue-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800">
                My Profile
              </p>

              <p className="truncate text-xs text-gray-400">
                Account settings
              </p>
            </div>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              group flex w-full items-center gap-3
              rounded-xl px-3 py-3
              text-sm font-medium text-gray-500
              transition-all duration-200
              hover:bg-red-50 hover:text-red-600
            "
          >
            <LogOut
              className="
                size-[19px] text-gray-400
                transition-colors
                group-hover:text-red-500
              "
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

