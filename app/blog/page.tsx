import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { CategoryNav, PostList } from "@/components/blog/PostList";
import { getPosts } from "@/lib/content";
import { getCategories } from "@/lib/blog";
import { og } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog: Microsoft Dynamics 365, Power Platform and AI in operations",
  alternates: { canonical: "/blog" },
  openGraph: og("/blog"),
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the field on Microsoft Dynamics 365, automation and AI."
        intro="What we see in real implementations, written for the people who run the business."
      />
      <section className="tone-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <CategoryNav categories={getCategories()} />
          <div className="mt-10">
            <PostList posts={getPosts()} />
          </div>
        </div>
      </section>
      <NextStep />
    </>
  );
}
