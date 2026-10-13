/** Optional Calendly or Microsoft Bookings embed. Set NEXT_PUBLIC_BOOKING_URL to show it. */
export function BookingEmbed() {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (!url) return null;
  return (
    <div className="mt-10">
      <p className="mb-4 text-sm text-ivory-dim">Prefer to pick a time yourself?</p>
      <iframe
        src={url}
        title="Book a call with AdySphere Co."
        loading="lazy"
        className="h-[680px] w-full border-0 bg-ivory"
      />
    </div>
  );
}
