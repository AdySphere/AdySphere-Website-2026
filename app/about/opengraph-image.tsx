import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A founder-led Microsoft partner, built in Dubai.";

export default function Image() {
  return renderOg("A founder-led Microsoft partner, built in Dubai.", "About AdySphere Co.");
}
