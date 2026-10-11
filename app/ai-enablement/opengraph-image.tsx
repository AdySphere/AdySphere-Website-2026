import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AI that removes work. Not AI that adds it.";

export default function Image() {
  return renderOg("AI that removes work. Not AI that adds it.", "AI Enablement");
}
