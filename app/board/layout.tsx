"use client";

import TaskProvider from "@/context/TaskContext";
import AuthGuard from "@/components/AuthGuard";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TaskProvider>
      <AuthGuard>
        <div className="flex">
          {/* Your Sidebar */}
          <SideBar />
          
          <main className="flex-1">
            <Header />
            {children}
          </main>
        </div>
      </AuthGuard>
    </TaskProvider>
  );
}