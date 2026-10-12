import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Business X-Ray, Microsoft Dynamics 365 implementation and AI Enablement";

export default function Image() {
  return renderOg("Business X-Ray, Microsoft Dynamics 365 implementation and AI Enablement", "Solutions");
}
