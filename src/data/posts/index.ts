// Types - safe for client components
export type { Lang, PostFrontmatter, PostData, PostParams } from "./types";
export { LANGS, isLang } from "./types";

// Server-only functions - will error if imported in client components
export {
  getAllPosts,
  getAllSlugs,
  getPostParams,
  getPostBySlug,
  getPostByPermalink,
} from "./server";
