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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_QL9oHiAomjBZDyECGA6zZn7FFWkerslXslGCGkja8Nb',{api_host:'https://us.i.posthog.com', person_profiles: 'always'})`,
          }}
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
