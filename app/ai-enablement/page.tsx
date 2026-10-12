import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  LockKey,
  ListChecks,
  ShieldCheck,
  UserCheck,
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { Reveal } from "@/components/ui/Reveal";
import { DepartmentsDiagram } from "@/components/home/DepartmentsDiagram";
import { Starfield } from "@/components/ai/Starfield";

export const metadata: Metadata = {
  title: "AI Enablement for Microsoft Dynamics 365 and the enterprise",
  description:
    "AI that works for you, without more workload or overheads. Microsoft Dynamics 365 AI solutions where you already run it, custom AI architecture built on Claude where you do not, inside your own tenant and cloud, with a full audit trail.",
  alternates: { canonical: "/ai-enablement" },
};

const contrast = [
  ["A chatbot for every task", "One shared layer across every department"],
  ["Data copied out to an AI tool", "Works on live data, inside your tenant"],
  [
    "Answers someone has to check and re-key",
    "Drafts the next action in the system, ready to approve",
  ],
  [
    "Reports that look backwards",
    "Flags what needs a decision before it is late",
  ],
  [
    "Spend measured in prompts and seats",
    "Value measured against a baseline set in the Blueprint",
  ],
];

const governance = [
  {
    icon: LockKey,
    title: "Inside your tenant",
    body: "It runs in your Microsoft environment. Your data does not move to a separate AI tool.",
  },
  {
    icon: ShieldCheck,
    title: "Your security roles",
    body: "It sees only what the person asking is allowed to see, using the access you already manage.",
  },
  {
    icon: UserCheck,
    title: "People approve",
    body: "Actions that matter wait for a person. You decide where approval is needed.",
  },
  {
    icon: ListChecks,
    title: "Full audit trail",
    body: "Every answer cites its sources, and every action is logged. Its memory is a record you can see and edit.",
  },
];

const steps = [
  {
    name: "Blueprint",
    body: "Map your systems, data and key decisions. Pick the first department where AI pays back most, and set the baseline.",
  },
  {
    name: "Deploy",
    body: "Put the shared AI layer and the first department live, inside your tenant, connected to your systems.",
  },
  {
    name: "Extend",
    body: "Add departments one by one. Each one plugs into the same layer, so each makes the others more useful.",
  },
  {
    name: "Run",
    body: "We monitor, tune and grow it as your business changes, and report on the work it removes.",
  },
];

export default function AiEnablementPage() {
  return (
    <>
      <Starfield />
      <div className="relative z-10">
        <PageHeader
          tone="clear"
          eyebrow="AI Enablement"
          title={
            <>
              AI that works for you.{" "}
              <em className="text-gradient not-italic">
                Not more workload, not more overheads.
              </em>
            </>
          }
          intro="Most AI arrives as another tool to check. We enable AI inside the systems your teams already run, so it reads live data, acts within your security, and closes the gaps where data and money leak."
        />

        {/* Two ways in */}
        <section className="border-t border-ivory/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Two ways in. One standard.
            </h2>
            <div className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <Reveal className="tone-gradient flex flex-col p-8 sm:p-10">
                <p className="eyebrow text-teal">
                  Built into Microsoft Dynamics 365
                </p>
                <h3 className="mt-4 font-display text-3xl leading-snug">
                  Already on a Microsoft Dynamics 365 tenant.
                </h3>
                <ul className="mt-8 grid gap-3 text-ivory-dim">
                  {[
                    "Built on Dataverse, Copilot Studio and Power Automate, with Claude for deeper reasoning",
                    "Works across Microsoft Dynamics 365 apps, Teams, Outlook and Power BI, where people already work",
                    "Uses the security roles and approvals you already run",
                    "The shortest path to production, because the data and processes are already there",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed">
                      <Check
                        size={18}
                        className="mt-1 shrink-0 text-teal"
                        aria-hidden
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal
                delay={0.08}
                className="spotlight glass flex flex-col p-8 sm:p-10"
              >
                <p className="eyebrow text-teal">Custom, built on Claude</p>
                <h3 className="mt-4 font-display text-3xl leading-snug text-ivory">
                  For businesses on any other stack.
                </h3>
                <ul className="mt-8 grid gap-3 text-ivory-dim">
                  {[
                    "Custom AI architecture built on Claude, designed around the demands of your industry",
                    "Connects to SAP, Oracle, Zoho, other ERPs and in-house systems through APIs",
                    "Same governance: your cloud, your access rules, a full audit trail",
                    "No ERP replacement required to start",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed">
                      <Check
                        size={18}
                        className="mt-1 shrink-0 text-teal"
                        aria-hidden
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Enablement vs usage */}
        <section className="border-t border-ivory/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              AI enablement is not AI usage.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-ivory-dim">
              Using AI means more tools, more prompts and more output to check.
              Enabling AI means the work itself gets shorter.
            </p>
            <div className="mt-14 overflow-hidden border border-ivory/10">
              <div className="grid grid-cols-2 bg-navy-800 font-mono text-[11px] uppercase tracking-[0.14em] sm:text-xs">
                <p className="p-4 text-mist sm:p-5">Typical AI usage</p>
                <p className="bg-teal-deep p-4 text-ivory sm:p-5">
                  AI Enablement
                </p>
              </div>
              <ul className="divide-y divide-ivory/10">
                {contrast.map(([usage, enablement]) => (
                  <li key={usage} className="grid grid-cols-2">
                    <p className="p-4 text-sm leading-relaxed text-ivory-dim sm:p-5 sm:text-base">
                      {usage}
                    </p>
                    <p className="border-l border-ivory/10 p-4 text-sm font-medium leading-relaxed text-ivory sm:p-5 sm:text-base">
                      {enablement}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* One layer, every department */}
        <section className="border-t border-ivory/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              One layer. Every department sees across the business.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-ivory-dim">
              A finance question often needs project data. A service answer
              often needs the contract. Because every department plugs into the
              same layer, the answer comes from the whole business, not one
              silo.
            </p>
            <div className="mt-14">
              <DepartmentsDiagram />
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="border-t border-ivory/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Your data stays in your tenant.
            </h2>
            <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {governance.map(({ icon: Icon, title, body }) => (
                <li key={title} className="grid grid-cols-[auto_1fr] gap-5">
                  <Icon size={28} className="text-teal" aria-hidden />
                  <div>
                    <h3 className="font-display text-2xl">{title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-ivory-dim">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it starts */}
        <section className="border-t border-ivory/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Start small. Prove value. Scale.
            </h2>
            <ol className="mt-14 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li
                  key={step.name}
                  className={`spotlight flex flex-col p-7 ${i === 0 ? "tone-dark" : "bg-navy-950"}`}
                >
                  <h3 className="flex items-center gap-2 font-display text-2xl">
                    {i === 0 ? "AI Enablement Blueprint" : step.name}
                    {i < steps.length - 1 && (
                      <ArrowRight
                        size={18}
                        aria-hidden
                        className="text-teal-deep lg:hidden"
                      />
                    )}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-ivory-dim" : "text-ivory-dim"}`}
                  >
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <NextStep
          title="Start with an AI Enablement Blueprint."
          body="A clear map of where AI pays back first in your business, and what it takes to get there."
          href="/contact?interest=ai-enablement"
          label="Plan a Blueprint"
        />
      </div>
    </>
  );
}
