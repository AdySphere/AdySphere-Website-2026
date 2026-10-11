import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;

/**
 * Best-effort rate limit. It is per server instance, so on Vercel it slows down bursts rather than guaranteeing
 * a hard cap. Swap for Vercel KV / Upstash if spam becomes a problem.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Honeypot filled in, or form submitted faster than a person could: pretend success, send nothing.
  if (str(body.website) || (typeof body.elapsed === "number" && body.elapsed < MIN_FILL_MS)) {
    return NextResponse.json({ ok: true });
  }

  const fields = {
    name: str(body.name),
    company: str(body.company),
    role: str(body.role),
    email: str(body.email),
    phone: str(body.phone, 40),
    size: str(body.size, 40),
    interest: str(body.interest, 40),
    message: str(body.message, 4000),
  };

  if (!fields.name || !fields.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return NextResponse.json({ error: "Please add your name, company and a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; request not sent", { company: fields.company });
    return NextResponse.json(
      { error: `The form is not connected yet. Please call ${site.phone}.` },
      { status: 503 },
    );
  }

  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#4a5a68">${k}</td><td>${escapeHtml(v || "-")}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "AdySphere Co. website <website@adysphere.com>",
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: fields.email,
      subject: `${fields.interest || "Enquiry"}: ${fields.company} (${fields.name})`,
      html: `<h2>New booking request</h2><table>${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: `We could not send that. Please call ${site.phone}.` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
