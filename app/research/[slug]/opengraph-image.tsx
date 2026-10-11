import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getResearchProject, getResearch } from "@/lib/content";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AdySphere Co.";

export function generateStaticParams() {
  return getResearch().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getResearchProject((await params).slug);
  return renderOg(entry?.meta.title ?? "AdySphere Co.", "Research");
}
