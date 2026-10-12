import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { CategoryNav, PostList } from "@/components/insights/PostList";
import { getInsights } from "@/lib/content";
import { getCategories } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights on Microsoft Dynamics 365, Power Platform and AI in operations",
  description: "Practical writing on Microsoft Dynamics 365, Power Platform and enabling AI in operations, for UAE business leaders.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Plain writing on Microsoft Dynamics 365 and AI in operations."
        intro="What we see in real implementations, written for the people who run the business."
      />
      <section className="tone-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <CategoryNav categories={getCategories()} />
          <div className="mt-10">
            <PostList posts={getInsights()} />
          </div>
        </div>
      </section>
      <NextStep />
    </>
  );
}
