"use client";

import React, { useEffect, useMemo, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function UsersPage() {
const context = useContext(UserContext);

if (!context) {
  throw new Error("UsersPage must be inside UserProvider");
}

const { getAllUsers, allUsers, setAllUsers } = context;

const [search, setSearch] = useState("");
const [roleFilter, setRoleFilter] = useState("ALL");
const [selectedUser, setSelectedUser] = useState<any>(null);
const [newRole, setNewRole] = useState("USER");
const [deleteUser, setDeleteUser] = useState<any>(null);

const users = allUsers ?? [];



const filteredUsers = useMemo(() => {
return users.filter((user: any) => {
const matchesSearch = [
user.name,
user.username,
user.email,
]
.filter(Boolean)
.some((value: string) =>
value.toLowerCase().includes(search.toLowerCase())
);


  const matchesRole =
    roleFilter === "ALL" || user.role === roleFilter;

  return matchesSearch && matchesRole;
});


}, [users, search, roleFilter]);

const openEditModal = (user: any) => {
setSelectedUser(user);
setNewRole(user.role);
};

// Frontend preview only: this does not update the database.
const handleSaveRole = async () => {
  if (!selectedUser) return;

  try {
    const response = await fetch(
      `/api/backend/users/${selectedUser.id}/role`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: newRole,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update role");
    }

    const updatedUser = await response.json();

    setAllUsers((prev: any[]) =>
      prev.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );

    setSelectedUser(null);
  } catch (error) {
    console.error(error);
    alert(error instanceof Error ? error.message : "Something went wrong");
  }
};

// Frontend preview only: this does not delete the database record.
const handleDeleteUser = async () => {
  if (!deleteUser) return;

  try {
    const response = await fetch(
      `/api/backend/users/${deleteUser.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete user");
    }

    setAllUsers((prev: any[]) =>
      prev.filter((user) => user.id !== deleteUser.id)
    );

    setDeleteUser(null);
  } catch (error) {
    console.error(error);
    alert(error instanceof Error ? error.message : "Something went wrong");
  }
};

const adminCount = users.filter(
(user: any) => user.role === "ADMIN"
).length;

const userCount = users.filter(
(user: any) => user.role === "USER"
).length;

return ( <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8 font-mono"> <div className="mx-auto max-w-7xl space-y-7">


    {/* Page heading */}
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Administration
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Users
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage user accounts and access roles.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
        <p className="text-xs text-slate-500">Total users</p>
        <p className="mt-1 text-xl font-bold">{users.length}</p>
      </div>
    </header>

    {/* Statistics */}
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">All accounts</p>
        <p className="mt-3 text-3xl font-bold">{users.length}</p>
        <p className="mt-2 text-xs text-slate-400">
          Registered users
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Administrators</p>
        <p className="mt-3 text-3xl font-bold text-indigo-600">
          {adminCount}
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Accounts with admin access
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Regular users</p>
        <p className="mt-3 text-3xl font-bold text-emerald-600">
          {userCount}
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Standard accounts
        </p>
      </div>
    </section>

    {/* Search and filter */}
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">All users</h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredUsers.length} account(s) displayed
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
          >
            <option value="ALL">All roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Username</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user: any) => (
              <tr key={user.id} className="transition hover:bg-slate-50/80">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-700">
                      {(user.name || user.username || "?")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <div className="font-medium">
                      {user.name || "Unnamed user"}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  @{user.username}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {user.email || "—"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-indigo-50 text-indigo-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {user.role || "UNASSIGNED"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      Edit role
                    </button>

                    <button
                      onClick={() => setDeleteUser(user)}
                      className="rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 p-4 md:hidden">
        {filteredUsers.map((user: any) => (
          <article
            key={user.id}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-700">
                {(user.name || user.username || "?")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold">
                  {user.name || "Unnamed user"}
                </h3>
                <p className="mt-1 truncate text-sm text-slate-500">
                  @{user.username}
                </p>
                <p className="mt-1 break-all text-sm text-slate-500">
                  {user.email || "No email"}
                </p>
                <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                  {user.role || "UNASSIGNED"}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <button
                onClick={() => openEditModal(user)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-indigo-50"
              >
                Edit role
              </button>

              <button
                onClick={() => setDeleteUser(user)}
                className="rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filteredUsers.length === 0 && (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
            👥
          </div>
          <h3 className="mt-4 font-semibold">No users found</h3>
          <p className="mt-2 text-sm text-slate-500">
            Try another search or change the role filter.
          </p>
        </div>
      )}
    </section>
  </div>

  {/* Edit role modal */}
  {selectedUser && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">Edit user role</h2>
        <p className="mt-2 text-sm text-slate-500">
          Change the role for {selectedUser.name || selectedUser.username}.
        </p>

        <label className="mt-6 block text-sm font-medium">
          Account role
        </label>
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <p className="mt-3 text-xs text-amber-700">
          Changes will be saved to the database.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setSelectedUser(null)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveRole}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Delete confirmation modal */}
  {deleteUser && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl text-red-600">
          !
        </div>

        <h2 className="mt-4 text-xl font-bold">Delete this user?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          You are about to delete{" "}
          <span className="font-semibold text-slate-800">
            {deleteUser.name || deleteUser.username}.
          </span><br />{" "}
          <span className="text-yellow-700 mt-5">This action will delete the user permanently</span>
          
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setDeleteUser(null)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteUser}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete user
          </button>
        </div>
      </div>
    </div>
  )}
</main>


);
}
