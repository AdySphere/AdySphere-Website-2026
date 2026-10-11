import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Different industries. The same gaps between teams.";

export default function Image() {
  return renderOg("Different industries. The same gaps between teams.", "Industries");
}
