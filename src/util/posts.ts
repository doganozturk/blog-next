import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  permalink: string;
  lang: "en" | "tr";
}

export interface PostData {
  frontmatter: PostFrontmatter;
  slug: string;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/posts");

function getPostsDirectory(lang: "en" | "tr"): string {
  return path.join(CONTENT_DIR, lang);
}

function getSlugFromPermalink(permalink: string): string {
  // Remove leading/trailing slashes and language prefix
  return permalink.replace(/^\/?(tr\/)?/, "").replace(/\/$/, "");
}

export function getAllPosts(lang?: "en" | "tr"): PostFrontmatter[] {
  const languages = lang ? [lang] : (["en", "tr"] as const);
  const posts: PostFrontmatter[] = [];

  for (const language of languages) {
    const postsDir = getPostsDirectory(language);

    if (!fs.existsSync(postsDir)) {
      continue;
    }

    const slugs = fs.readdirSync(postsDir);

    for (const slug of slugs) {
      const postPath = path.join(postsDir, slug, "index.mdx");

      if (!fs.existsSync(postPath)) {
        continue;
      }

      const fileContents = fs.readFileSync(postPath, "utf8");
      const { data } = matter(fileContents);

      // Transform permalink to include language prefix
      const rawPermalink = data.permalink as string;
      const postSlug = rawPermalink.replace(/^\/?(tr\/)?/, "").replace(/\/$/, "");
      const permalink = `/${language}/${postSlug}/`;

      posts.push({
        title: data.title,
        description: data.description,
        date: data.date,
        permalink,
        lang: data.lang || language,
      });
    }
  }

  // Sort by date descending
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getAllSlugs(lang: "en" | "tr"): string[] {
  const postsDir = getPostsDirectory(lang);

  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs.readdirSync(postsDir).filter((slug) => {
    const postPath = path.join(postsDir, slug, "index.mdx");
    return fs.existsSync(postPath);
  });
}

export function getPostBySlug(slug: string, lang: "en" | "tr"): PostData | null {
  const postsDir = getPostsDirectory(lang);
  const postPath = path.join(postsDir, slug, "index.mdx");

  if (!fs.existsSync(postPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: {
      title: data.title,
      description: data.description,
      date: data.date,
      permalink: data.permalink,
      lang: data.lang || lang,
    },
    slug,
    content,
  };
}

export function getPostByPermalink(permalink: string): PostData | null {
  // Determine language from permalink
  const lang = permalink.startsWith("/tr/") ? "tr" : "en";
  const slug = getSlugFromPermalink(permalink);

  return getPostBySlug(slug, lang);
}
