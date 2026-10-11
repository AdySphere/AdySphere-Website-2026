import Link from "next/link";
import { formatDate, slugify, type Entry, type InsightMeta } from "@/lib/content";

export function PostList({ posts }: { posts: Entry<InsightMeta>[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-16 text-slate">
        No articles here yet. New posts go in <code className="font-mono">content/insights</code>.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-cloud border-y border-cloud">
      {posts.map((post) => (
        <li key={post.slug} className="grid gap-3 py-8 md:grid-cols-[180px_1fr] md:gap-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate md:flex-col md:items-start">
            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
            <Link href={`/insights/category/${slugify(post.meta.category)}`} className="text-teal-ink hover:underline">
              {post.meta.category}
            </Link>
            {post.meta.draft && <span className="border border-dashed border-slate/50 px-1.5">Draft</span>}
          </div>
          <div>
            <h2 className="font-serif text-2xl leading-snug sm:text-3xl">
              <Link href={`/insights/${post.slug}`} className="hover:text-teal-ink">
                {post.meta.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-[62ch] leading-relaxed text-slate">{post.meta.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CategoryNav({ categories, active }: { categories: string[]; active?: string }) {
  return (
    <nav aria-label="Categories" className="flex flex-wrap gap-2">
      <Link
        href="/insights"
        aria-current={!active ? "page" : undefined}
        className="border border-navy-900/20 px-3.5 py-2 text-sm aria-[current=page]:bg-navy-900 aria-[current=page]:text-ivory"
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c}
          href={`/insights/category/${slugify(c)}`}
          aria-current={active === c ? "page" : undefined}
          className="border border-navy-900/20 px-3.5 py-2 text-sm aria-[current=page]:bg-navy-900 aria-[current=page]:text-ivory"
        >
          {c}
        </Link>
      ))}
    </nav>
  );
}
