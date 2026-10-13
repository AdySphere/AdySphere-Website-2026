import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { CategoryNav, PostList } from "@/components/blog/PostList";
import { getPosts, slugify } from "@/lib/content";
import { getCategories, getTags, tagFromSlug } from "@/lib/blog";

export function generateStaticParams() {
  return getTags().map((t) => ({ tag: slugify(t) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const tag = tagFromSlug((await params).tag);
  if (!tag) return {};
  return {
    title: `Articles tagged ${tag}`,
    description: `AdySphere Co. articles tagged ${tag}.`,
    alternates: { canonical: `/blog/tag/${slugify(tag)}` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const tag = tagFromSlug((await params).tag);
  if (!tag) notFound();
  return (
    <>
      <PageHeader eyebrow="Blog" title={`Tagged: ${tag}`} />
      <section className="tone-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <CategoryNav categories={getCategories()} />
          <div className="mt-10">
            <PostList posts={getPosts().filter((p) => p.meta.tags.includes(tag))} />
          </div>
        </div>
      </section>
      <NextStep />
    </>
  );
}
