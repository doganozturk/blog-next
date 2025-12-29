import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostHeader } from "~/components/header/post-header/post-header";
import { Footer } from "~/components/footer/footer";
import { getAllSlugs, getPostBySlug } from "~/util/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");

  if (!post) {
    return {};
  }

  const { title, description, permalink, date } = post.frontmatter;

  return {
    title,
    description,
    alternates: {
      canonical: `https://doganozturk.dev${permalink}`,
      languages: {
        en: `https://doganozturk.dev/${slug}/`,
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

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  // Dynamically import the MDX file
  let Content;
  try {
    const mdxModule = await import(`@content/posts/en/${slug}/index.mdx`);
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
