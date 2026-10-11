import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="This page is not here." intro="It may have moved when we rebuilt the site.">
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Go to the homepage
        </Link>
        <Link href="/solutions" className="btn-secondary">
          See our solutions
        </Link>
      </div>
    </PageHeader>
  );
}
