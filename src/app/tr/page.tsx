import type { Metadata } from "next";
import { MainHeader } from "~/components/header/main-header/main-header";
import { Footer } from "~/components/footer/footer";
import { PostSummaryList } from "~/components/post-summary-list/post-summary-list";
import { getAllPosts } from "~/util/posts";
import { LangSetter } from "~/components/lang-setter";

const title = "Doğan Öztürk | Blog";
const description =
  "Ben Doğan, front-end geliştirme, JavaScript ve Node.js tutkusu olan bir yazılım mühendisiyim. Blogumda teknoloji alanındaki uzmanlığımı ve deneyimlerimi, ayrıca rol yapma oyunları, bilgisayar oyunları, bilim kurgu ve daha fazlasına olan ilgimi paylaşıyorum.";

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
    url: "https://doganozturk.dev/tr/",
    images: ["https://doganozturk.dev/images/avatar.jpg"],
    description,
    siteName: "doganozturk.dev",
  },
};

export default function TurkishHomePage() {
  const posts = getAllPosts("tr");

  return (
    <>
      <LangSetter lang="tr" />
      <MainHeader />
      <main className="main">
        <PostSummaryList data={posts} />
      </main>
      <Footer />
    </>
  );
}
