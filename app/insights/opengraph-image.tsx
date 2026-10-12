import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Plain writing on Microsoft Dynamics 365 and AI in operations.";

export default function Image() {
  return renderOg("Plain writing on Microsoft Dynamics 365 and AI in operations.", "Insights");
}
