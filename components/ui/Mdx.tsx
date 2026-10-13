import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

/** Renders MDX bodies from /content with the site's prose styles. */
export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-site">
      <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
