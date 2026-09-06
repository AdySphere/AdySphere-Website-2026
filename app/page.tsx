import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          AdySphere <span className="text-accent">Research Agent</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Private space-tech ideation partner — pitches, sanity-checks, and grounds ideas in live
          research, launch schedules, and near-Earth object data.
        </p>
      </header>
      <Chat />
    </main>
  );
}
