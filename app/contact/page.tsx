import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { BookingEmbed } from "@/components/contact/BookingEmbed";
import { site } from "@/lib/site";
import { og } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact: book a 30-minute AI check-in",
  alternates: { canonical: "/contact" },
  openGraph: og("/contact"),
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you want to fix."
        intro="Book a 30-minute AI check-in straight into the calendar below, or send us a note and we'll reply within one working day."
      />
      <section id="book" className="tone-ink scroll-mt-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8">
          <div>
            <p className="eyebrow text-teal">30-minute AI check-in</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">Pick a time that suits you.</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-ivory-dim">
              We look at the AI tools you already pay for, where your team loses the most time, and where an AI agent
              would actually pay off. No slides, no hard sell.
            </p>
          </div>
          <BookingEmbed lead={null} />
        </div>
      </section>
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
              <dd className="mt-1 text-lg">
                <a href={site.phoneUkHref} className="text-ivory hover:underline">
                  {site.phoneUk}
                </a>
              </dd>
              <dd className="mt-1 text-lg">
                <a href={site.phoneInHref} className="text-ivory hover:underline">
                  {site.phoneIn}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-mist">Where we work</dt>
              <dd className="mt-1 text-lg text-ivory">{site.location}</dd>
            </div>
          </dl>
          <div>
            <h2 className="mb-8 font-display text-3xl leading-tight sm:text-4xl">Or tell us what you want to fix.</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
