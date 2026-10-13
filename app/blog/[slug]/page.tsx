import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { Mdx } from "@/components/ui/Mdx";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema } from "@/lib/schema";
import { formatDate, getPost, getPosts, slugify } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.meta.date },
    robots: post.meta.draft ? { index: false } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { meta } = post;

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: meta.title,
          description: meta.description,
          date: meta.date,
          url: `${site.url}/blog/${post.slug}`,
        })}
      />
      <PageHeader eyebrow={meta.category} title={meta.title} intro={meta.description}>
        <p className="mt-8 font-mono text-xs text-mist">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {meta.draft && <span className="ml-3 border border-dashed border-mist/50 px-1.5">Draft</span>}
        </p>
      </PageHeader>
      <article className="tone-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <Mdx source={post.body} />
          <ul className="mt-14 flex flex-wrap gap-2" aria-label="Tags">
            {meta.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tag/${slugify(tag)}`}
                  className="border border-ivory/10 px-3 py-1.5 text-sm text-ivory-dim hover:border-ivory/60"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <NextStep />
    </>
  );
}
