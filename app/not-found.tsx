import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { bookCta } from "@/lib/site";

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="This page is not here." intro="It may have moved when we rebuilt the site.">
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Go to the homepage
        </Link>
        <Link href={bookCta.href} className="btn-secondary">
          {bookCta.label}
        </Link>
      </div>
    </PageHeader>
  );
}
