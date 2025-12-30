import type { MDXComponents } from "mdx/types";
import { PostVideo } from "~/components/post-video/post-video";
import { formatDate, Locale } from "@lib/format-date";

// Re-export utilities for MDX usage
export { formatDate, Locale };

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PostVideo,
    ...components,
  };
}
