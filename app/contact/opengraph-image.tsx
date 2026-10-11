import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Book a Business X-Ray.";

export default function Image() {
  return renderOg("Book a Business X-Ray.", "Contact");
}
