import Image from "next/image";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { founder, site } from "@/lib/site";

/** The founder's vision as one quote. The portrait appears once founder.photo is set. */
export function Founder() {
  return (
    <section data-swarm="hold" className="tone-light">
      <div
        className={`mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:py-28 lg:px-8 ${
          founder.photo ? "md:grid-cols-[minmax(0,320px)_1fr] md:gap-16" : ""
        }`}
      >
        {founder.photo && (
          <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden">
            <Image src={founder.photo} alt={founder.name} fill sizes="320px" className="object-cover" />
          </div>
        )}
        <figure className="max-w-4xl">
          <p className="eyebrow text-teal-ink">Founder-led</p>
          <blockquote className="mt-6 font-display text-3xl leading-[1.2] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            &ldquo;{founder.vision}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <span>
              <span className="block text-lg font-medium text-navy-900">{founder.name}</span>
              <span className="block text-slate">
                {founder.title}, {site.name}
              </span>
            </span>
            <a href={founder.linkedin || site.linkedin} target="_blank" rel="noopener" className="btn-outline-dark">
              <LinkedinLogo size={18} aria-hidden /> LinkedIn
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
