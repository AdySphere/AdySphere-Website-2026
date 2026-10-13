import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Your ERP records the business. It doesn't run it. We enable both.";

export default function Image() {
  return renderOg("Your ERP records the business. It doesn't run it. We enable both.", "Microsoft Dynamics 365 & AI Partner in Dubai");
}
