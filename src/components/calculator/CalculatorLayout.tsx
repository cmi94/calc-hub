// src/components/calculator/CalculatorLayout.tsx
// 계산기 페이지 공통 레이아웃 — 서버 컴포넌트
import type { ReactNode } from "react";
import Link from "next/link";

type FAQItem = { q: string; a: string };

type Props = {
  title: string;
  description?: string;
  categoryName: string;
  categoryPath: string;
  badge?: 'new' | 'popular' | 'daily';
  standard?: string;    // "2026년 4월 기준" — H1 아래 표시
  isFun?: boolean;      // 재미 면책문구 추가
  updatedAt?: string;   // "2026년 4월"
  faq?: FAQItem[];      // FAQ 목록
  children: ReactNode;
};

// 배지 스타일 매핑
const BADGE_CONFIG = {
  new:     { label: 'NEW',    className: 'bg-green-100 text-green-700' },
  popular: { label: '🔥 인기', className: 'bg-orange-100 text-orange-700' },
  daily:   { label: '📅 매일', className: 'bg-purple-100 text-purple-700' },
} as const;

export default function CalculatorLayout({
  title,
  description,
  categoryName,
  categoryPath,
  badge,
  standard,
  isFun = false,
  updatedAt,
  faq,
  children,
}: Props) {
  const badgeConfig = badge ? BADGE_CONFIG[badge] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">

        {/* 1. 브레드크럼 */}
        <nav aria-label="breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            홈
          </Link>
          <span aria-hidden="true">&gt;</span>
          <Link href={categoryPath} className="hover:text-orange-500 transition-colors">
            {categoryName}
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="text-slate-800 font-medium">{title}</span>
        </nav>

        {/* 2. H1 + 배지 */}
        <div className="mb-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {badgeConfig && (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeConfig.className}`}
            >
              {badgeConfig.label}
            </span>
          )}
        </div>

        {/* 설명 */}
        {description && (
          <p className="text-sm text-slate-500 mb-1">{description}</p>
        )}

        {/* 3. 기준일 */}
        {standard && (
          <p className="text-xs text-slate-400 mb-6">{standard}</p>
        )}
        {!standard && <div className="mb-6" />}

        {/* 4. 계산기 UI (children) */}
        <div>{children}</div>

        {/* 5. FAQ 섹션 */}
        {faq && faq.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">자주 묻는 질문</h2>
            <div className="space-y-2">
              {faq.map((item, idx) => (
                <details
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl group"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none text-slate-800 font-medium hover:text-orange-600 transition-colors">
                    <span>{item.q}</span>
                    {/* 아코디언 화살표 */}
                    <svg
                      className="w-4 h-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 6. 면책 문구 */}
        <div className="mt-8 space-y-2">
          <p className="text-xs text-slate-400 leading-relaxed">
            계산 결과는 참고용이며 실제 금액과 다를 수 있습니다.
          </p>
          {isFun && (
            <p className="text-xs text-slate-400 leading-relaxed">
              재미 목적으로 제작된 콘텐츠로, 실제 운세·궁합과는 무관합니다.
            </p>
          )}
        </div>

        {/* 7. 업데이트 일자 */}
        {updatedAt && (
          <p className="mt-3 text-xs text-slate-300">
            최종 업데이트: {updatedAt}
          </p>
        )}
      </div>
    </div>
  );
}
