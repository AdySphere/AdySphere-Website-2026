import Image from "next/image";

/** "Lovable Solution Partner" badge: the Lovable logo with the partner level, on a dark chip. */
export function LovableBadge({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <span
      className={`inline-flex items-center border border-ivory/20 bg-black ${lg ? "gap-4 px-4 py-3" : "gap-3 px-3 py-2"}`}
    >
      <Image
        src="/brand/lovable-logo.png"
        alt="Lovable"
        width={475}
        height={81}
        sizes={lg ? "160px" : "120px"}
        className={lg ? "h-7 w-auto" : "h-5 w-auto"}
      />
      <span aria-hidden className={`w-px bg-ivory/25 ${lg ? "h-8" : "h-6"}`} />
      <span className={`font-medium leading-tight text-ivory ${lg ? "text-sm" : "text-[11px]"}`}>
        Solution
        <br />
        Partner
      </span>
    </span>
  );
}
