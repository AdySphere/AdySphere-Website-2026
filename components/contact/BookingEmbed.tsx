import { bookingUrl } from "@/lib/site";

/** The Calendly scheduler for the 30-minute AI check-in, embedded so visitors book without leaving the site. */
export function BookingEmbed({ lead = "Prefer to pick a time yourself?" }: { lead?: string | null }) {
  const src = `${bookingUrl}?hide_gdpr_banner=1&primary_color=0e7c8c`;
  return (
    <div className={lead ? "mt-10" : undefined}>
      {lead && <p className="mb-4 text-sm text-ivory-dim">{lead}</p>}
      <iframe
        src={src}
        title="Book a 30-minute AI check-in with AdySphere Co."
        loading="lazy"
        className="h-[700px] w-full border-0 bg-ivory"
      />
      <p className="mt-3 text-sm text-mist">
        Calendar not loading?{" "}
        <a href={bookingUrl} target="_blank" rel="noopener" className="text-ivory underline-offset-4 hover:underline">
          Open it on Calendly
        </a>
      </p>
    </div>
  );
}
