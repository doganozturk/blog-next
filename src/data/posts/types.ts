/**
 * Supported languages for blog content.
 */
export const LANGS = ["en", "tr"] as const;
export type Lang = (typeof LANGS)[number];

/**
 * Type guard to check if a string is a valid Lang.
 */
export function isLang(value: string): value is Lang {
  return LANGS.includes(value as Lang);
}

/**
 * Frontmatter extracted from MDX post files.
 */
export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  permalink: string;
  lang: Lang;
}

/**
 * Full post data including content.
 */
export interface PostData {
  frontmatter: PostFrontmatter;
  slug: string;
  content: string;
}

/**
 * Parameters for static generation of post pages.
 */
export interface PostParams {
  lang: Lang;
  slug: string;
}
