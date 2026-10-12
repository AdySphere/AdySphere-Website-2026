"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

/** Sticky section navigation that highlights the section in view. */
export function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const list = useRef<HTMLUListElement>(null);

  // On narrow screens the pills scroll sideways: keep the active one in view.
  useEffect(() => {
    const ul = list.current;
    const el = ul?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!ul || !el) return;
    const left = el.offsetLeft - (ul.clientWidth - el.offsetWidth) / 2;
    ul.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-y border-ivory/10 bg-black/70 backdrop-blur-md lg:top-[72px]"
    >
      <ul ref={list} className="relative mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8 [scrollbar-width:none]">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={on ? "true" : undefined}
                className={`inline-flex rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  on ? "bg-ivory text-ink" : "text-ivory-dim hover:text-ivory"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
