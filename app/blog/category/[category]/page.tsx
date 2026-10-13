import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { CategoryNav, PostList } from "@/components/blog/PostList";
import { getPosts, slugify } from "@/lib/content";
import { categoryFromSlug, getCategories } from "@/lib/blog";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: slugify(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const category = categoryFromSlug((await params).category);
  if (!category) return {};
  return {
    title: `${category} insights`,
    description: `Articles on ${category} from AdySphere Co.`,
    alternates: { canonical: `/blog/category/${slugify(category)}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const category = categoryFromSlug((await params).category);
  if (!category) notFound();
  return (
    <>
      <PageHeader eyebrow="Blog" title={category} />
      <section className="tone-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <CategoryNav categories={getCategories()} active={category} />
          <div className="mt-10">
            <PostList posts={getPosts().filter((p) => p.meta.category === category)} />
          </div>
        </div>
      </section>
      <NextStep />
    </>
  );
}
