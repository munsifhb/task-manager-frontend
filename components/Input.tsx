
"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  CalendarDays,
  CircleAlert,
  FileText,
  Flag,
  Plus,
  Save,
  Type,
} from "lucide-react";

import { TaskContext } from "@/context/TaskContext";
import type { Task } from "@/types/task";

export default function Input({
  editingTask,
  setEditingTask,
}: {
  editingTask: Task | null;
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
}) {
const taskContext = useContext(TaskContext);

if (!taskContext) {
  throw new Error("Input must be inside TaskProvider");
}

const { createTask, updateTask, isCreating } = taskContext;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);

      setDueDate(
        new Date(editingTask.dueDate)
          .toISOString()
          .split("T")[0]
      );

      setError("");
    }
  }, [editingTask]);

  const clearError = () => {
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (
      !title.trim() ||
      !dueDate
      
    ) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    const task = {
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate).toISOString(),
      priority: priority.trim() || "LOW",
    };

    if (editingTask) {
      await updateTask(editingTask.id, task);
      setEditingTask(null);
    } else {
      await createTask(task);
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
  };

  const isEditing = Boolean(editingTask);

  return (
    <div className="mt-5 w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        {/* Header */}
        <div className="border-b border-gray-100 px-4 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              {isEditing ? (
                <Save className="size-5" />
              ) : (
                <Plus className="size-5" />
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                {isEditing ? "Edit Task" : "Create New Task"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {isEditing
                  ? "Update the details of your task."
                  : "Add a task and keep your work organized."}
              </p>
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="space-y-5 p-4 sm:p-6">

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <CircleAlert className="mt-0.5 size-5 shrink-0" />

              <div>
                <p className="font-medium">Incomplete form</p>
                <p className="mt-0.5 text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Type className="size-4 text-gray-400" />
              Task title
            </label>

            <input
              id="task-title"
              type="text"
              placeholder="e.g. Complete NestJS authentication"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                clearError();
              }}
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Due date */}
            <div>
              <label
                htmlFor="task-date"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <CalendarDays className="size-4 text-gray-400" />
                Due date
              </label>

              <input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  clearError();
                }}
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="task-priority"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Flag className="size-4 text-gray-400" />
                Priority
              </label>

              <select
                id="task-priority"
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                  clearError();
                }}
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="" disabled>
                  Select priority
                </option>

                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FileText className="size-4 text-gray-400" />
              Description
            </label>

            <textarea
              id="task-description"
              rows={5}
              placeholder="Describe what needs to be done..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                
              }}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            <p className="mt-1.5 text-xs text-gray-400">
              Add enough detail to make the task clear.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setEditingTask(null);
                setTitle("");
                setDescription("");
                setDueDate("");
                setPriority("");
                setError("");
              }}
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
          >
            {isEditing ? (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            ) : (
              <>
                <Plus className="size-4" />
                {isCreating ? "Adding task..." : "Add Task"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

