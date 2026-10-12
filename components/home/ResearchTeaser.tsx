import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function ResearchTeaser() {
  return (
    <section data-swarm="galaxy" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36 lg:px-8">
        <p className="font-mono text-xs text-mist">research.adysphere</p>
        <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
          Beyond business: our research in space, astrophysics and quantum computing.
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-ivory-dim">
          Computational astrophysics, space technology, quantum computing and data-intensive science. The same methods that
          sift telescope data shape how we build AI for enterprises.
        </p>
        <Link
          href="/research"
          className="mt-10 inline-flex items-center gap-2 border-b border-teal/50 pb-1 font-mono text-sm text-teal transition-colors hover:border-teal"
        >
          Visit the research lab <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
