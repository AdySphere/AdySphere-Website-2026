import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpaceSphere",
  description: "Private space-tech ideation agent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-slate-200 antialiased min-h-screen">{children}</body>
    </html>
  );
}
