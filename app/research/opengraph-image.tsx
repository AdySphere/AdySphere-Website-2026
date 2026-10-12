import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Research in space, astrophysics, quantum computing and data-intensive science.";

export default function Image() {
  return renderOg("Research in space, astrophysics, quantum computing and data-intensive science.", "Research lab");
}
