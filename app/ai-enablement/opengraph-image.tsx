import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AI that works for you. Not more workload, not more overheads.";

export default function Image() {
  return renderOg("AI that works for you. Not more workload, not more overheads.", "AI Enablement");
}
