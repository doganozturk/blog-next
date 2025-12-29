import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "~/components/theme-provider";
import {
  THEME_COLOR_META_ID,
  APPLE_STATUS_BAR_META_ID,
  DEFAULT_THEME_META_KEY,
  getThemeMeta,
  themeHack,
} from "~/util";
import "./globals.css";

const defaultMeta = getThemeMeta(DEFAULT_THEME_META_KEY);

export const metadata: Metadata = {
  metadataBase: new URL("https://doganozturk.dev"),
  title: "Doğan Öztürk | Blog",
  description:
    "I'm Doğan, a software engineer passionate about front-end development, JavaScript and Node.js. On my blog, I share my expertise and experiences in tech, as well as my interests in role-playing games, computer games, sci-fi and more.",
  alternates: {
    canonical: "https://doganozturk.dev",
    languages: {
      en: "https://doganozturk.dev",
      tr: "https://doganozturk.dev/tr/",
    },
  },
  icons: {
    apple: "/favicon/apple-touch-icon.png",
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          id={THEME_COLOR_META_ID}
          name="theme-color"
          content={defaultMeta.themeColor}
        />
        <meta
          id={APPLE_STATUS_BAR_META_ID}
          name="apple-mobile-web-app-status-bar-style"
          content={defaultMeta.appleStatusBarStyle}
        />
      </head>
      <body suppressHydrationWarning>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeHack }}
        />
        <ThemeProvider>
          <ThemeContainer>{children}</ThemeContainer>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

function ThemeContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-container" suppressHydrationWarning>
      <div className="container">{children}</div>
    </div>
  );
}
