"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
};

export default function TaskProgressChart({
  tasks,
}: {
  tasks: Task[];
}) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100 ) 
      : 0;

      const chartData = [
  {
    name: "Total",
    tasks: totalTasks,
  },
  {
    name: "Completed",
    tasks: completedTasks,
  },
  {
    name: "Pending",
    tasks: pendingTasks,
  },
{
    name: "Completion Rate",
    tasks: completionRate
}
  
];

return (
  <div className="w-full mt-5 h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis allowDecimals={false} />

        <Tooltip />

<Bar dataKey="tasks" fill="#2563eb"  barSize={30} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

}