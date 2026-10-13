import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const dataUrl = (file: string, type: string) =>
  `data:${type};base64,${fs.readFileSync(path.join(process.cwd(), "public", file)).toString("base64")}`;

/** Open Graph card: brand mark and wordmark on the deck's navy-to-teal gradient, with the page title. */
export function renderOg(title: string, eyebrow?: string) {
  const wordmark = dataUrl("brand/wordmark-dark.png", "image/png");
  const mark = dataUrl("brand/mark.svg", "image/svg+xml");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(120deg, #0b0c0e 0%, #01253b 50%, #0e7c8c 100%)",
          color: "#f8f7f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmark} width={302} height={48} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={120} height={120} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#34c4c9", marginBottom: 20 }}>
              {eyebrow}
            </div>
          )}
          <div style={{ fontSize: title.length > 60 ? 52 : 64, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
