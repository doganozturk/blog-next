import type { Metadata } from "next";
import { MainHeader } from "~/components/header/main-header/main-header";
import { Footer } from "~/components/footer/footer";
import { PostSummaryList } from "~/components/post-summary-list/post-summary-list";
import { getAllPosts } from "~/util/posts";

const title = "Doğan Öztürk | Blog";
const description =
  "I'm Doğan, a software engineer passionate about front-end development, JavaScript and Node.js. On my blog, I share my expertise and experiences in tech, as well as my interests in role-playing games, computer games, sci-fi and more.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary",
    site: title,
    creator: "Doğan Öztürk",
    title,
    description,
    images: ["https://doganozturk.dev/images/avatar.jpg"],
  },
  openGraph: {
    title,
    type: "article",
    url: "https://doganozturk.dev/",
    images: ["https://doganozturk.dev/images/avatar.jpg"],
    description,
    siteName: "doganozturk.dev",
  },
};

export default function HomePage() {
  const posts = getAllPosts("en");

  return (
    <>
      <MainHeader />
      <main className="main">
        <PostSummaryList data={posts} />
      </main>
      <Footer />
    </>
  );
}
