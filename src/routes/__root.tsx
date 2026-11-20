import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { LangProvider } from "@/lib/i18n";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "惜聚田耕 SikGather | 中環農墟" },
      {
        name: "description",
        content: "惜聚田耕 SikGather — 香港浸會大學 Year 2 學生成立，想推廣中環農墟，帶大家認識香港本地種嘅優質有機菜。",
      },
      { name: "theme-color", content: "#4d6a3a" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=LXGW+WenKai+TC:wght@400;700&family=Lora:ital,wght@0,400..600;1,400..600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="zh-Hant-HK" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LangProvider>
            <SiteHeader />
            <Outlet />
            <SiteFooter />
          </LangProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
