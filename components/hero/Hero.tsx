import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { bookCta, heroArt } from "@/lib/site";

/**
 * Centred hero inside the particle swarm (see components/swarm). Before the swarm starts, and for reduced motion,
 * the artwork shows as a still image behind the text.
 */
export function Hero() {
  return (
    <section
      data-swarm="face"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroArt}
        alt="AdySphere Co. circuit-line face artwork"
        width={800}
        height={800}
        fetchPriority="high"
        className="hero-still pointer-events-none absolute left-1/2 top-1/2 w-[min(92vw,88vh)] -translate-x-1/2 -translate-y-1/2 opacity-20 transition-opacity sm:opacity-35 duration-1000"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_48%_34%_at_50%_50%,rgb(0_0_0/0.82),rgb(0_0_0/0.45)_55%,transparent_85%)]"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <h1
          id="hero-title"
          className="hero-rise hero-headline font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.035em] text-ivory [animation-delay:80ms] sm:text-6xl lg:text-[4.4rem]"
        >
          <span className="sm:whitespace-nowrap">You&rsquo;re already paying for AI.</span>
          <br />
          <span className="text-gradient">Let&rsquo;s make it pay you back.</span>
        </h1>
        <p className="hero-rise hero-headline mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ivory [animation-delay:160ms] sm:text-lg">
          We set up AI agents on the tools your team already uses, from Microsoft 365 and Microsoft Dynamics 365 to SAP
          and beyond, so your people spend less time on admin and more time on decisions. Most teams are up and running
          in two to three weeks.
        </p>
        <div className="hero-rise mt-10 flex flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row sm:gap-6">
          <Link href={bookCta.href} className="btn-primary group !pr-2">
            {bookCta.label}
            <span className="ml-1 inline-flex size-7 items-center justify-center rounded-full bg-ink text-ivory transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={14} aria-hidden />
            </span>
          </Link>
          <a href="#how-it-works" className="text-sm font-medium text-ivory underline-offset-8 hover:underline">
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
