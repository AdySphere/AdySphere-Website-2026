import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { BookingEmbed } from "@/components/contact/BookingEmbed";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: book a Business X-Ray",
  description: "Book a Business X-Ray or talk to AdySphere Co. about Dynamics 365, Power Platform and AI Enablement in Dubai, UAE.",
  alternates: { canonical: "/contact" },
};

const interestBySlug = {
  "x-ray": "Business X-Ray",
  implementation: "Implementation",
  "ai-enablement": "AI Enablement",
  other: "Other",
} as const;

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ interest?: string }> }) {
  const { interest } = await searchParams;
  const defaultInterest = interestBySlug[interest as keyof typeof interestBySlug] ?? "Business X-Ray";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you want to fix."
        intro="We reply within one working day to arrange a call. The first step is usually a Business X-Ray."
      />
      <section className="tone-dark">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8">
          <dl className="grid content-start gap-8 text-sm">
            <div>
              <dt className="text-mist">Email</dt>
              <dd className="mt-1 text-lg text-ivory">{site.email}</dd>
            </div>
            <div>
              <dt className="text-mist">Phone</dt>
              <dd className="mt-1 text-lg">
                <a href={site.phoneHref} className="text-ivory hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-mist">Location</dt>
              <dd className="mt-1 text-lg text-ivory">{site.location}</dd>
            </div>
            <div>
              <dt className="text-mist">Registered</dt>
              <dd className="mt-1 leading-relaxed text-ivory-dim">Ajman NuVentures Centre Freezone</dd>
            </div>
          </dl>
          <div>
            <ContactForm defaultInterest={defaultInterest} />
            <BookingEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
