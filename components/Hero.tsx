
import Link from "next/link";

const features = [
  {
    title: "Stay Organized",
    description: "Keep your tasks organized in one place.",
  },
  {
    title: "Track Progress",
    description: "Monitor your progress and completed work.",
  },
  {
    title: "Be Productive",
    description: "Focus on what matters and get more done.",
  },
];

export default function Hero() {
  return (
    <main className="min-h-screen bg-white font-mono text-slate-900">
      <nav className="flex items-center justify-between border-b border-slate-100 px-6 py-5 md:px-16">
        <Link href="/" className="text-xl font-bold text-blue-600">
          TaskManager<span className="text-slate-900">.</span>
        </Link>

        <Link
          href="/login"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm text-white transition hover:bg-blue-700"
        >
          Sign In
        </Link>
      </nav>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center md:py-36">
        <p className="mb-6 rounded-full bg-blue-50 px-4 py-2 text-xs text-blue-600">
          ORGANIZE · PRIORITIZE · ACHIEVE
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Manage your tasks.
          <span className="mt-2 block text-blue-600">
            Simplify your life.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          TaskManager helps you organize your workload, manage priorities,
          and track your progress. Stay focused, work smarter, and accomplish
          more every day.
        </p>

        <Link
          href="/login"
          className="mt-9 inline-flex items-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Get Started <span aria-hidden="true">→</span>
        </Link>

        <p className="mt-4 text-xs text-slate-400">
          SIMPLE WORKFLOW. BETTER PRODUCTIVITY.
        </p>
      </section>

      <section
        id="features"
        className="mx-auto grid max-w-5xl gap-8 border-t border-slate-100 px-6 py-12 sm:grid-cols-3 md:px-10"
      >
        {features.map((feature, index) => (
          <article key={feature.title} className="py-4">
            <p className="mb-4 text-sm font-bold text-blue-600">
              0{index + 1}
            </p>

            <h2 className="text-base font-bold">
              {feature.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      <footer className="border-t border-slate-100 px-6 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TaskManager. Built for productivity.
      </footer>
    </main>
  );
}