import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { DepartmentsDiagram } from "./DepartmentsDiagram";

export function AiEnablement() {
  return (
    <section data-swarm="sphere" className="relative" id="ai-enablement">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            One AI layer across every department. Not one bot per task.
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-ivory-dim">
            Built into your own tenant and cloud, alongside the systems you already run. It works on your live data, inside
            your security, and helps every team make sharper decisions.
          </p>
        </div>
        <div className="mt-14">
          <DepartmentsDiagram />
        </div>
        <Link href="/ai-enablement" className="btn-primary mt-12">
          How AI Enablement works <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
