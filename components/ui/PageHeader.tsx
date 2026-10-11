import type { ReactNode } from "react";

/** Top of every inner page: the deck's cover gradient, an eyebrow, a serif title and one short intro. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  tone = "gradient",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "gradient" | "space";
  children?: ReactNode;
}) {
  return (
    <section className={`tone-${tone} relative overflow-hidden`}>
      {tone === "space" && <div aria-hidden className="hero-stars absolute inset-0" />}
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 md:pb-24 md:pt-40 lg:px-8">
        {eyebrow && <p className="eyebrow mb-5 text-teal">{eyebrow}</p>}
        <h1 className="max-w-4xl font-display text-4xl leading-[1.1] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory-dim">{intro}</div>}
        {children}
      </div>
    </section>
  );
}
