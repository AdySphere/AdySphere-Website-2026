import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AI enablement questions, answered";

export default function Image() {
  return renderOg("AI enablement questions, answered.", "Answers");
}
