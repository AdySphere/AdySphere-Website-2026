import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "You're already paying for AI. Let's make it pay you back.";

export default function Image() {
  return renderOg("You're already paying for AI. Let's make it pay you back.", "AI enablement for UAE businesses");
}
