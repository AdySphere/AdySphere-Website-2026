import Image from "next/image";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { founder, site } from "@/lib/site";

export function Founder() {
  return (
    <section className="tone-light">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16 md:py-28 lg:px-8">
        <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden bg-mint">
          {founder.photo ? (
            <Image src={founder.photo} alt={founder.name} fill sizes="320px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-end p-5">
              <span className="font-mono text-xs text-slate">TODO: founder photo, 4:5, at least 800 x 1000</span>
            </div>
          )}
        </div>
        <div>
          <p className="eyebrow text-teal-ink">Founder-led</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{founder.name}</h2>
          <p className="mt-2 text-slate">{founder.title}, {site.name}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-900">{founder.shortBio}</p>
          <a
            href={founder.linkedin || site.linkedin}
            target="_blank"
            rel="noopener"
            className="btn-outline-dark mt-8"
          >
            <LinkedinLogo size={18} aria-hidden /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
