"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(UserContext);
  const router = useRouter();

  if (!context) {
    throw new Error("AuthGuard must be used inside UserProvider");
  }

  const { users, loadingUser } = context;

  useEffect(() => {
    if (!loadingUser && !users) {
      router.replace("/login");
    }
  }, [loadingUser, users, router]);

  if (loadingUser) {
    return (
      <div className="flex min-h-screen w-full items-center gap-5">
        <div className="w-80 bg-gray-100 h-full">
          <p className="opacity-0">Side bar</p>
        </div>

        <div className="w-full bg-gray-100  h-full text-gray-500 font-mono text-center">
        Checking authentication...
        
        </div>
      </div>
    );
  }

  if (!users) {
    return null;
  }

  return <>{children}</>;
}