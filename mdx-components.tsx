import type { MDXComponents } from "mdx/types";
import { PostVideo } from "~/components/post-video/post-video";
import { formatDistance, Locale } from "~/util";

// Re-export utilities for MDX usage
export { formatDistance, Locale };

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PostVideo,
    ...components,
  };
}
