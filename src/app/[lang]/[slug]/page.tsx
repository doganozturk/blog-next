import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostHeader } from "~/components/header/post-header/post-header";
import { Footer } from "~/components/footer/footer";
import { getAllSlugs, getPostBySlug } from "~/util/posts";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

type Lang = "en" | "tr";

export function generateStaticParams() {
  const enSlugs = getAllSlugs("en").map((slug) => ({ lang: "en", slug }));
  const trSlugs = getAllSlugs("tr").map((slug) => ({ lang: "tr", slug }));
  return [...enSlugs, ...trSlugs];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (lang !== "en" && lang !== "tr") {
    return {};
  }

  const post = getPostBySlug(slug, lang as Lang);

  if (!post) {
    return {};
  }

  const { title, description, permalink, date } = post.frontmatter;

  return {
    title,
    description,
    alternates: {
      canonical: `https://doganozturk.dev/${lang}/${slug}/`,
      languages: {
        en: `https://doganozturk.dev/en/${slug}/`,
        tr: `https://doganozturk.dev/tr/${slug}/`,
      },
    },
    twitter: {
      card: "summary",
      site: "Doğan Öztürk | Blog",
      creator: "Doğan Öztürk",
      title,
      description,
      images: ["https://doganozturk.dev/images/avatar.jpg"],
    },
    openGraph: {
      title,
      type: "article",
      url: `https://doganozturk.dev${permalink}`,
      images: ["https://doganozturk.dev/images/avatar.jpg"],
      description,
      siteName: "doganozturk.dev",
      publishedTime: date,
      authors: ["Doğan Öztürk"],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { lang, slug } = await params;

  if (lang !== "en" && lang !== "tr") {
    notFound();
  }

  // Dynamically import the MDX file
  let Content;
  try {
    const mdxModule = await import(`@content/posts/${lang}/${slug}/index.mdx`);
    Content = mdxModule.default;
  } catch {
    notFound();
  }

  return (
    <>
      <PostHeader />
      <article className="post">
        <Content />
      </article>
      <Footer />
    </>
  );
}
