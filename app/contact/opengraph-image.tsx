import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Book a 30-minute AI check-in.";

export default function Image() {
  return renderOg("Book a 30-minute AI check-in.", "Contact");
}
