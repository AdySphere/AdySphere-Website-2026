import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Work delivered, described plainly.";

export default function Image() {
  return renderOg("Work delivered, described plainly.", "Case studies");
}
