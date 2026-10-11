import type { ComponentPropsWithoutRef } from "react";

export type Tone = "light" | "dark" | "gradient" | "space";

const toneClass: Record<Tone, string> = {
  light: "tone-light",
  dark: "tone-dark",
  gradient: "tone-gradient",
  space: "tone-space",
};

type Props = ComponentPropsWithoutRef<"section"> & { tone?: Tone; contained?: boolean };

/** Full-bleed section with a brand tone. Content is centred in the site container unless `contained` is false. */
export function Section({ tone = "light", contained = true, className = "", children, ...rest }: Props) {
  return (
    <section className={`${toneClass[tone]} relative ${className}`} {...rest}>
      {contained ? <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">{children}</div> : children}
    </section>
  );
}
