"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import google from "@/public/images/google-icon-logo-svgrepo-com.svg";
import Link from "next/link";
import { Eye, EyeOff, UserCheckIcon, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";


export default function page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const userContext = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const router = useRouter();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const user = {
      username,
      password,
    };

    try {
      setIsLogin(true);

      const response = await fetch(
        "https://nest-task-manager-api.onrender.com/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        console.log(data.message);

        if (Array.isArray(data.message)) {
          const newErrors: typeof errors = {};

          data.message.forEach((msg: string) => {
            if (msg.includes("email") || msg.includes("username"))
              newErrors.username = msg;
            if (msg.includes("password")) newErrors.password = msg;
          });

          setErrors(newErrors);
        } else {
          setErrors({ general: data.message || "Login failed." });
        }

        return;
      }

console.log("Login successful");

await userContext?.getUsers();

router.replace("/board");
router.refresh();
    } catch (err) {
      setErrors({ general: "Cannot connect to the server." });
    } finally {
      setIsLogin(false);
    }
  };

  return (
    <main className="min-h-screen font-mono bg-white text-gray-900 lg:grid lg:grid-cols-2">
      {/* Left panel */}
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-blue-700 p-12 text-white lg:flex xl:p-16">
        <div className="absolute -left-32 -top-28 size-96 rounded-full border-[50px] border-blue-500/30" />
        <div className="absolute -bottom-32 -right-20 size-96 rounded-full bg-blue-600/70" />
        <div className="absolute right-16 top-1/3 size-40 rounded-full border border-blue-400/40" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-white text-blue-700 shadow-lg">
            <UserCheckIcon className="size-6" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tight">
            TaskFlow
          </span>
        </div>

        <div className="relative z-10 max-w-lg">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-600/50 px-4 py-2 text-sm text-blue-100">
            <span className="size-2 rounded-full bg-green-400" />
            Your productivity, organized.
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Turn your plans into
            <span className="mt-2 block text-blue-200">
              meaningful progress.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-blue-100/80">
            Keep your tasks organized, stay on top of deadlines, and make every
            day count with your personal task management workspace.
          </p>

          <div className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
            <div className="flex -space-x-2">
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-blue-700 bg-blue-200 text-sm font-bold text-blue-800">T</div>
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-blue-700 bg-sky-200 text-sm font-bold text-sky-800">F</div>
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-blue-700 bg-indigo-200 text-sm font-bold text-indigo-800">+</div>
            </div>
            <p className="text-sm text-blue-100/80">
              One workspace. Better focus. More progress.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-sm text-blue-100/70">
          <ShieldCheck className="size-4" />
          Your workspace, ready when you are.
        </div>
      </section>

      {/* Login section */}
      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-10 sm:px-8 lg:bg-white lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 shadow-sm lg:mx-0">
              <UserCheckIcon className="size-7" />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Welcome back
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Sign in to your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Enter your credentials to continue to your workspace.
            </p>
          </div>

          <form onSubmit={loginUser} className="space-y-5">
            {errors.general && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                  errors.username ? "border-red-400" : "border-gray-200"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`h-12 w-full rounded-xl border bg-white px-4 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-blue-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeOff className="size-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={islogin}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:bg-blue-700 hover:shadow-blue-700/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {islogin ? "Signing in..." : "Sign in"}
              {!islogin && (
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>

            <div className="flex items-center gap-4 py-1">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
            >
              <Image src={google} alt="Google logo" className="size-5" />
              Continue with Google
            </button>

            <p className="pt-2 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </form>

          <p className="mt-10 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} TaskFlow. Stay focused, keep moving.
          </p>
        </div>
      </section>
    </main>
  );
}