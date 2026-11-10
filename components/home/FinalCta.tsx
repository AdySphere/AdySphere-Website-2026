import { ContactForm } from "@/components/contact/ContactForm";
import { BookingEmbed } from "@/components/contact/BookingEmbed";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section data-swarm="vortex" className="relative" id="book">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div>
          <h2 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            Ready to make your AI pay for itself?
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ivory-dim">
            Start with a 30-minute AI check-in. No slides, no hard sell. You&rsquo;ll leave knowing where AI would actually
            pay off for your business.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
            Want the full picture first? Choose a Business <span className="whitespace-nowrap">X-Ray</span> in the form: a
            department-by-department diagnostic with a written report and a prioritised roadmap.
          </p>
          <dl className="mt-10 grid gap-4 text-sm">
            <div>
              <dt className="text-mist">Email</dt>
              <dd className="mt-1 text-ivory">{site.email}</dd>
            </div>
            <div>
              <dt className="text-mist">Phone</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="text-ivory hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <ContactForm />
          <BookingEmbed />
        </div>
      </div>
    </section>
  );
}
