"use client";

import { useContext } from "react";
import {
  Mail,
  Phone,
  User,
  ShieldCheck,
  AtSign,
  Pencil,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { UserContext } from "@/context/UserContext";

export default function Page() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("ProfilePage must be used inside UserProvider");
  }

  const { users, loadingUser } = context;

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="size-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          Loading profile...
        </div>
      </div>
    );
  }

  if (!users) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Unable to load profile.</p>
      </div>
    );
  }

  const initials = users.name
    ? users.name
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : users.username.slice(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 font-mono lg:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* Page heading */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">
            Account
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your account information and profile details.
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="relative h-32 sm:h-40 bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 opacity-90" />

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-20 size-56 rounded-full border border-white/10" />
            <div className="absolute -right-5 -top-10 size-32 rounded-full border border-white/10" />
          </div>

          {/* Profile identity */}
          <div className="relative px-5 pb-6 sm:px-8">

            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">

                {/* Avatar */}
                <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-blue-600 text-2xl font-bold font-mono text-gray-50 shadow-md sm:size-28">
                  {initials}
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-semibold font-mono text-gray-900 sm:text-2xl">
                    {users.name}
                  </h2>

                  <p className="mt-1 flex items-center gap-1.5 text-sm font-mono text-gray-500">
                    <AtSign className="size-4" />
                    {users.username}
                  </p>
                </div>
              </div>

              {/* Edit button */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 sm:w-auto"
              >
                <Pencil className="size-4 stroke-blue-600" />
                Edit Profile
              </button>
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-gray-100" />

            {/* Account status */}
            <div className="mb-6 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                <CheckCircle2 className="size-4 stroke-blue-600" />
                Active Account
              </div>

              <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                <ShieldCheck className="size-4 stroke-blue-600" />
                {users.role}
              </div>

            </div>

            {/* Information */}
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your account information associated with this workspace.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Name */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
                      <User className="size-5 text-gray-500 stroke-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Full Name
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-gray-900">
                        {users.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
                      <AtSign className="size-5 text-gray-500 stroke-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Username
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-gray-900">
                        @{users.username}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
                      <Mail className="size-5 text-gray-500 stroke-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Email Address
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-gray-900">
                        {users.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
                      <Phone className="size-5 text-gray-500 stroke-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Phone Number
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-gray-900">
                        {users.phone}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Account information */}
            <div className="mt-8">
              <h3 className="text-base font-semibold text-gray-900">
                Account
              </h3>

              <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white border border-gray-200">
                    <ShieldCheck className="size-5 text-gray-500 stroke-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Account Role
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {users.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

