import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileTabBar from "@/components/layout/MobileTabBar";
import Analytics from "@/components/Analytics";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--ff-inter-tight",
  display: "swap",
});

const SITE_URL = "https://dagyesan.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "다계스탄 — 계산기 씬의 절대 체급",
    template: "%s - 다계스탄",
  },
  description:
    "연봉 실수령액, 퇴직금, 주휴수당, 취득세, 주담대, 전세대출, 종합소득세 등 한국인의 생활 계산기를 한곳에서. 2026년 최신 기준 무료 제공.",
  keywords: ["연봉 실수령액", "퇴직금 계산기", "주휴수당", "취득세", "주담대 계산기", "종합소득세", "계산기", "다계스탄"],
  authors: [{ name: "다계스탄" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "다계스탄",
    title: "다계스탄 — 계산기 씬의 절대 체급",
    description: "한국인의 생활 계산기를 한곳에서. 2026년 최신 기준 무료 제공.",
  },
  twitter: {
    card: "summary",
    title: "다계스탄 — 계산기 씬의 절대 체급",
    description: "한국인의 생활 계산기를 한곳에서. 2026년 최신 기준 무료 제공.",
  },
  robots: { index: true, follow: true },
  verification: { google: "MY-r_u54ww-gO8yYmCfag6ApHywZpF256qhBljyCVJE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="light" className={`h-full antialiased ${interTight.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V3ZRJ96QGC"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V3ZRJ96QGC');
        `}} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Analytics />
        <Header />
        <div className="flex-1 pb-14 lg:pb-0">{children}</div>
        <MobileTabBar />
        <footer style={{
          borderTop: "1px solid var(--ds-line)",
          background: "var(--ds-bg-sub)",
        }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto", padding: "28px 24px",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "space-between",
              alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 13, color: "var(--ds-muted)", letterSpacing: "-0.01em" }}>
                © 2026 다계스탄 (dagyesan.com) · 계산 결과는 참고용입니다.
              </span>
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  { href: "/privacy", label: "개인정보처리방침" },
                  { href: "/terms",   label: "이용약관" },
                  { href: "/contact", label: "문의" },
                ].map((l) => (
                  <a key={l.href} href={l.href} style={{
                    fontSize: 13, color: "var(--ds-muted)",
                    textDecoration: "none", letterSpacing: "-0.01em",
                  }}>{l.label}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
