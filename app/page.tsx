import { Hero } from "@/components/hero/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Remaining homepage sections are built after the hero is approved. */}
      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="accent-rule mb-10 max-w-xs" />
        <p className="max-w-xl text-ivory-dim">TODO: trust strip and the rest of the homepage.</p>
      </section>
    </>
  );
}
