import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ivory/10 bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Image src="/brand/wordmark-dark.png" alt="AdySphere Co." width={1704} height={271} sizes="160px" className="h-6 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-ivory-dim">
            Microsoft AI Cloud Partner and indirect reseller. Registered in Ajman NuVentures Centre Freezone,
            operating from Dubai, UAE, with a presence in the United Kingdom.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ivory-dim transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-ivory-dim transition-colors hover:text-ivory">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <address className="flex flex-col gap-3 text-sm not-italic text-ivory-dim">
          <span>{site.email}</span>
          <a href={site.phoneHref} className="transition-colors hover:text-ivory">
            {site.phone}
          </a>
          <a href={site.phoneUkHref} className="transition-colors hover:text-ivory">
            {site.phoneUk}
          </a>
          <span>{site.location}</span>
          <span className="mt-2 flex gap-5">
            <a href={site.linkedin} className="transition-colors hover:text-ivory" rel="noopener" target="_blank">
              LinkedIn
            </a>
            <a href={site.instagram} className="transition-colors hover:text-ivory" rel="noopener" target="_blank">
              Instagram
            </a>
          </span>
        </address>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-10 text-xs text-mist sm:px-6 lg:px-8">
        © {new Date().getFullYear()} AdySphere Co. All rights reserved.
      </div>
    </footer>
  );
}
