
"use client";

import React, { useState } from "react";
import Image from "next/image";
import google from "@/public/images/google-icon-logo-svgrepo-com.svg";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsregister] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    name?: string;
    phone?: string;
    email?: string;
    general?: string;
  }>({});

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const user = {
      name,
      username,
      email,
      phone,
      password,
    };

    try {
      setIsregister(true);

      const response = await fetch(
        "/api/backend/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.message)) {
          const newErrors: typeof errors = {};

          data.message.forEach((msg: string) => {
            if (msg.includes("email")) newErrors.email = msg;
            if (msg.includes("password")) newErrors.password = msg;
            if (msg.includes("name")) newErrors.name = msg;
            if (msg.includes("phone")) newErrors.phone = msg;
            if (msg.includes("username")) newErrors.username = msg;
          });

          setErrors(newErrors);
        } else {
          setErrors({
            general: data.message || "Registration failed.",
          });
        }

        return;
      }

      // Clear the form fields
setName("");
setUsername("");
setEmail("");
setPhone("");
setPassword("");

// Redirect to login
router.replace("/login");
    } catch {
      setErrors({ general: "Cannot connect to the server." });
    } finally {
      setIsregister(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-white font-mono lg:grid lg:grid-cols-2">
      {/* Left panel */}
      <section className="relative hidden min-h-screen overflow-hidden bg-blue-600 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        {/* Decorative circles */}
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full border-[45px] border-blue-500/40" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-blue-500/40" />
        <div className="absolute right-16 top-1/3 h-20 w-20 rounded-full border-[12px] border-blue-400/40" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-lg">
            <UserPlus size={23} />
          </div>
          <span className="text-xl font-bold tracking-tight">TaskFlow</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
            Start organizing
          </p>

          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Make room for what matters.
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-blue-100">
            Create your account and bring your tasks, priorities, and plans
            together in one simple workspace.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3 text-sm text-blue-50">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                ✓
              </span>
              Keep your tasks organized
            </div>

            <div className="flex items-center gap-3 text-sm text-blue-50">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                ✓
              </span>
              Track your progress
            </div>

            <div className="flex items-center gap-3 text-sm text-blue-50">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                ✓
              </span>
              Focus on your next goal
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-blue-200">
          A clearer way to manage your day.
        </p>
      </section>

      {/* Registration form */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <UserPlus size={21} />
            </div>
            <span className="text-xl font-bold text-blue-600">TaskFlow</span>
          </div>

          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserPlus size={25} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Create account
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Set up your account to start managing your tasks.
            </p>
          </div>

          {errors.general && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {errors.general}
            </div>
          )}

          <form onSubmit={registerUser} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                autoComplete="username"
                required
                className={inputClass}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                autoComplete="tel"
                required
                className={inputClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  required
                  className={`${inputClass} pr-12`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-blue-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isRegister}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-700/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRegister ? "Creating account..." : "Create account"}
              {!isRegister && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google UI */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
          >
            <Image src={google} alt="Google logo" className="h-5 w-5" />
            Continue with Google
          </button>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={15} />
            Your information is handled securely.
          </div>
        </div>
      </section>
    </main>
  );
}
