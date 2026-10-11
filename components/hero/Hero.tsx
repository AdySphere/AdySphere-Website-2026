import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { bookCta, heroArt, site } from "@/lib/site";

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
        alt=""
        aria-hidden
        width={800}
        height={800}
        fetchPriority="high"
        className="hero-still pointer-events-none absolute left-1/2 top-1/2 w-[min(92vw,88vh)] -translate-x-1/2 -translate-y-1/2 opacity-20 transition-opacity sm:opacity-35 duration-1000"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_38%_30%_at_50%_50%,rgb(0_0_0/0.55),transparent_80%)]"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="hero-rise inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/5 px-3.5 py-1.5 text-xs text-ivory-dim backdrop-blur">
          <span className="size-1.5 rounded-full bg-teal" aria-hidden />
          Microsoft AI Cloud Partner, Dubai &amp; UK
        </p>
        <h1
          id="hero-title"
          className="hero-rise mt-7 font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.035em] text-ivory [animation-delay:80ms] sm:text-6xl lg:text-[4.4rem]"
        >
          <span className="sm:whitespace-nowrap">Your ERP records the business.</span>
          <br />
          It doesn&rsquo;t run it. <span className="text-gradient sm:whitespace-nowrap">We enable both.</span>
        </h1>
        <p className="hero-rise mx-auto mt-7 max-w-xl text-base leading-relaxed text-ivory-dim [animation-delay:160ms] sm:text-lg">
          {site.positioning}
        </p>
        <div className="hero-rise mt-10 flex flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row sm:gap-6">
          <Link href={bookCta.href} className="btn-primary group !pr-2">
            {bookCta.label}
            <span className="ml-1 inline-flex size-7 items-center justify-center rounded-full bg-ink text-ivory transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={14} aria-hidden />
            </span>
          </Link>
          <Link href="/ai-enablement" className="text-sm font-medium text-ivory underline-offset-8 hover:underline">
            See AI Enablement
          </Link>
        </div>
      </div>
    </section>
  );
}
