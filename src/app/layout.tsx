import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const SITE_URL = "https://dagyesan.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "다계산 — 세상의 모든 계산기를 모아",
    template: "%s - 다계산",
  },
  description:
    "연봉 실수령액, 퇴직금, 주휴수당, 취득세, 주담대, 전세대출, 종합소득세 등 한국인의 생활 계산기를 한곳에서. 2026년 최신 기준 무료 제공.",
  keywords: ["연봉 실수령액", "퇴직금 계산기", "주휴수당", "취득세", "주담대 계산기", "종합소득세", "계산기", "다계산"],
  authors: [{ name: "다계산" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "다계산",
    title: "다계산 — 세상의 모든 계산기를 모아",
    description: "한국인의 생활 계산기를 한곳에서. 2026년 최신 기준 무료 제공.",
  },
  twitter: {
    card: "summary",
    title: "다계산 — 세상의 모든 계산기를 모아",
    description: "한국인의 생활 계산기를 한곳에서. 2026년 최신 기준 무료 제공.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-lg font-bold text-blue-600">다계산</a>
            <nav className="hidden sm:flex gap-4 text-sm text-gray-600">
              <a href="/about" className="hover:text-blue-600">소개</a>
              <a href="/contact" className="hover:text-blue-600">문의</a>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="bg-white border-t border-gray-200 mt-10">
          <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-wrap gap-4 justify-between">
            <span>© 2026 다계산. 계산 결과는 참고용입니다.</span>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-blue-600">개인정보처리방침</a>
              <a href="/terms" className="hover:text-blue-600">이용약관</a>
              <a href="/contact" className="hover:text-blue-600">문의</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
