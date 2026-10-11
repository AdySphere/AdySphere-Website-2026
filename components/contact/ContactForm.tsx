"use client";

import { useEffect, useRef, useState } from "react";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const interests = ["Business X-Ray", "Implementation", "AI Enablement", "Other"] as const;
type Interest = (typeof interests)[number];

/** ?interest=ai-enablement (etc.) preselects an option, so pages can link straight to the right one. */
const interestBySlug: Record<string, Interest> = {
  "x-ray": "Business X-Ray",
  implementation: "Implementation",
  "ai-enablement": "AI Enablement",
  other: "Other",
};
const sizes = ["1-50", "51-200", "201-1,000", "1,000+"] as const;

const fieldClass =
  "w-full border border-slate/40 bg-white px-3.5 py-3 text-navy-900 placeholder:text-slate/70 focus:border-teal-ink focus:outline-none focus:ring-2 focus:ring-teal-ink/30";
const labelClass = "text-sm font-medium text-navy-900";

/** Booking form. Posts to /api/contact, which emails the team. Honeypot + timing check + server-side rate limit. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [interest, setInterest] = useState<Interest>("Business X-Ray");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    const fromUrl = interestBySlug[new URLSearchParams(window.location.search).get("interest") ?? ""];
    if (fromUrl) setInterest(fromUrl);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Something went wrong. Please try again.");
      setStatus({ state: "sent" });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="bg-white p-8 text-navy-900">
        <p className="font-display text-2xl">Thank you. We have your request.</p>
        <p className="mt-3 leading-relaxed text-slate">
          We will reply within one working day to arrange a call. If it is urgent, call us on +971 58 532 3522.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 bg-ivory p-6 text-navy-900 sm:grid-cols-2 sm:p-8" noValidate={false}>
      <Field label="Name" name="name" autoComplete="name" required />
      <Field label="Company" name="company" autoComplete="organization" required />
      <Field label="Role" name="role" autoComplete="organization-title" />
      <Field label="Work email" name="email" type="email" autoComplete="email" required />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />

      <div className="flex flex-col gap-2">
        <label htmlFor="size" className={labelClass}>
          Company size
        </label>
        <select id="size" name="size" className={fieldClass} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s} people
            </option>
          ))}
        </select>
      </div>

      <fieldset className="flex flex-col gap-3 sm:col-span-2">
        <legend className={`${labelClass} mb-3`}>I&rsquo;m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <label
              key={item}
              className="cursor-pointer border border-slate/40 bg-white px-4 py-2.5 text-sm has-[:checked]:border-navy-900 has-[:checked]:bg-navy-900 has-[:checked]:text-ivory has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-ink"
            >
              <input
                type="radio"
                name="interest"
                value={item}
                checked={item === interest}
                onChange={() => setInterest(item)}
                className="sr-only"
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="message" className={labelClass}>
          What would you like to fix?
        </label>
        <textarea id="message" name="message" rows={4} className={fieldClass} />
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate">We use your details only to reply to this request.</p>
        <button type="submit" className="btn-dark" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending..." : "Request a call"}
        </button>
      </div>

      {status.state === "error" && (
        <p role="alert" className="text-sm text-[#a3271d] sm:col-span-2">
          {status.message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="text-teal-ink"> *</span>}
      </label>
      <input id={name} name={name} type={type} required={required} autoComplete={autoComplete} className={fieldClass} />
    </div>
  );
}
