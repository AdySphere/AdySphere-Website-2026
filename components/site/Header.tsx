"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { bookCta, nav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // The research lab carries no sales calls to action.
  const showCta = !pathname.startsWith("/research");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ivory/10 bg-navy-900/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link href="/" aria-label="AdySphere Co. home" className="shrink-0">
          <Image src="/brand/wordmark-dark.png" alt="AdySphere Co." width={1704} height={271} sizes="160px" priority className="h-6 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="text-sm text-ivory-dim transition-colors hover:text-ivory aria-[current=page]:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {showCta && (
            <Link href={bookCta.href} className="btn-primary hidden !py-2.5 sm:inline-flex">
              {bookCta.label}
            </Link>
          )}
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-navy-950 px-4 pb-10 pt-6 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-ivory/10">
                <Link href={item.href} className="block py-4 font-serif text-2xl text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={bookCta.href} className="btn-primary mt-8 w-full">
            {bookCta.label}
          </Link>
        </div>
      )}
    </header>
  );
}
