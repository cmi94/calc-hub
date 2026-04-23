import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-gray-900">
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-extrabold text-white tracking-tight hover:text-orange-400 transition-colors">
              다계스탄
            </a>
            <nav className="hidden sm:flex gap-6 text-sm text-slate-300">
              <a href="/about" className="hover:text-orange-400 transition-colors">소개</a>
              <a href="/contact" className="hover:text-orange-400 transition-colors">문의</a>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="bg-slate-900 border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col sm:flex-row gap-4 justify-between">
            <span>© 2026 다계스탄 (dagyesan.com). 계산 결과는 참고용입니다.</span>
            <div className="flex gap-5">
              <a href="/privacy" className="hover:text-orange-400 transition-colors">개인정보처리방침</a>
              <a href="/terms" className="hover:text-orange-400 transition-colors">이용약관</a>
              <a href="/contact" className="hover:text-orange-400 transition-colors">문의</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
