import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getCaseStudy, getCaseStudies } from "@/lib/content";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AdySphere Co.";

export function generateStaticParams() {
  return getCaseStudies().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getCaseStudy((await params).slug);
  return renderOg(entry?.meta.title ?? "AdySphere Co.", "Case study");
}
