"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Calculator } from "@/content/calculators";

// ─── 카테고리 설정 ───────────────────────────────────────────────
const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: string; borderColor: string; badgeBg: string; badgeText: string; headingBorder: string }
> = {
  labor:     { label: "근로",   icon: "💼", borderColor: "border-blue-500",   badgeBg: "bg-blue-100",   badgeText: "text-blue-700",   headingBorder: "border-l-blue-500"   },
  tax:       { label: "세금",   icon: "🧾", borderColor: "border-violet-500", badgeBg: "bg-violet-100", badgeText: "text-violet-700", headingBorder: "border-l-violet-500" },
  finance:   { label: "금융",   icon: "🏦", borderColor: "border-emerald-500",badgeBg: "bg-emerald-100",badgeText: "text-emerald-700",headingBorder: "border-l-emerald-500"},
  realestate:{ label: "부동산", icon: "🏠", borderColor: "border-amber-500",  badgeBg: "bg-amber-100",  badgeText: "text-amber-700",  headingBorder: "border-l-amber-500"  },
  life:      { label: "생활",   icon: "🌿", borderColor: "border-teal-500",   badgeBg: "bg-teal-100",   badgeText: "text-teal-700",   headingBorder: "border-l-teal-500"   },
  fun:       { label: "재미",   icon: "🎲", borderColor: "border-rose-500",   badgeBg: "bg-rose-100",   badgeText: "text-rose-700",   headingBorder: "border-l-rose-500"   },
};

const CATEGORY_ORDER = ["labor", "tax", "finance", "realestate", "life", "fun"];

// ─── 인기 계산기 ID 목록 (순서 = 노출 순서) ─────────────────────
const POPULAR_IDS = [
  "salary",
  "severance",
  "age",
  "hourly-wage",
  "bmi",
  "dday",
  "lotto",
  "random-menu",
];

// ─── 계산기 카드 ─────────────────────────────────────────────────
function CalcCard({ calc, compact = false }: { calc: Calculator; compact?: boolean }) {
  const cat = CATEGORY_CONFIG[calc.category];
  return (
    <Link
      href={calc.path}
      className={`group bg-white border border-slate-200 rounded-2xl hover:border-orange-400 hover:shadow-md transition-all duration-200 flex flex-col gap-1 ${compact ? "p-4" : "p-5"}`}
    >
      {/* 카테고리 배지 */}
      {cat && (
        <span className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${cat.badgeBg} ${cat.badgeText} mb-1`}>
          {cat.icon} {cat.label}
        </span>
      )}
      <p className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
        {calc.name}
      </p>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{calc.description}</p>
    </Link>
  );
}

// ─── 검색 결과 빈 상태 ───────────────────────────────────────────
function EmptySearch({ query }: { query: string }) {
  return (
    <div className="text-center py-20 text-slate-400">
      <p className="text-4xl mb-4">🔍</p>
      <p className="text-lg font-medium text-slate-600">
        &ldquo;{query}&rdquo; 에 해당하는 계산기가 없어요
      </p>
      <p className="text-sm mt-2">다른 키워드로 검색해보세요</p>
    </div>
  );
}

// ─── 메인 컴포넌트 ───────────────────────────────────────────────
export default function HomeClient({ calculators }: { calculators: Calculator[] }) {
  const [query, setQuery] = useState("");

  // 검색 필터링
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return calculators.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (CATEGORY_CONFIG[c.category]?.label ?? "").includes(q)
    );
  }, [query, calculators]);

  const isSearching = query.trim().length > 0;

  // 인기 계산기
  const popularCalcs = POPULAR_IDS
    .map((id) => calculators.find((c) => c.id === id))
    .filter((c): c is Calculator => Boolean(c));

  // 카테고리별 그룹
  const grouped = CATEGORY_ORDER.map((slug) => ({
    slug,
    items: calculators.filter((c) => c.category === slug),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* ── 히어로 섹션 ─────────────────────────────────────────── */}
      <section className="bg-slate-900 relative overflow-hidden">
        {/* 배경 그라디언트 장식 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 opacity-5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
          {/* 로고 */}
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-sm text-orange-400 font-medium mb-6">
            <span>⚡</span>
            <span>2026년 최신 기준</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            다계스탄
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3">
            계산기 씬의 절대 체급
          </p>
          <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-md mx-auto">
            연봉·퇴직금·세금·대출·부동산까지<br className="hidden sm:block" />
            한국인의 모든 계산을 한곳에서
          </p>

          {/* 검색바 */}
          <div className="max-w-xl mx-auto relative">
            <div className="flex items-center bg-white rounded-full shadow-lg shadow-black/20 overflow-hidden border-2 border-transparent focus-within:border-orange-400 transition-colors">
              <span className="pl-5 text-slate-400 text-lg flex-shrink-0">🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="계산기 이름 검색... (예: 연봉, BMI, 취득세)"
                className="flex-1 px-4 py-4 text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent text-sm sm:text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="pr-2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="검색 초기화"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => {}}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-4 transition-colors text-sm flex-shrink-0"
              >
                검색
              </button>
            </div>
          </div>

          {/* 빠른 링크 */}
          {!isSearching && (
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
              {["연봉 실수령액", "퇴직금", "BMI", "D-day", "로또"].map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-full px-3 py-1.5 transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 검색 결과 or 메인 콘텐츠 ───────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-14">

        {isSearching ? (
          /* ── 검색 결과 ──────────────────────────────────────── */
          <section>
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              &ldquo;{query}&rdquo; 검색 결과
              <span className="ml-2 text-orange-500">{searchResults.length}건</span>
            </h2>
            {searchResults.length === 0 ? (
              <EmptySearch query={query} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {searchResults.map((calc) => (
                  <CalcCard key={calc.id} calc={calc} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* ── 인기 계산기 ───────────────────────────────────── */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🔥</span>
                <h2 className="text-xl font-bold text-slate-900">인기 계산기</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {popularCalcs.map((calc) => (
                  <CalcCard key={calc.id} calc={calc} compact />
                ))}
              </div>
            </section>

            {/* ── 카테고리별 섹션 ──────────────────────────────── */}
            {grouped.map(({ slug, items }) => {
              const cat = CATEGORY_CONFIG[slug];
              if (!cat) return null;
              return (
                <section key={slug}>
                  <div className={`flex items-center gap-3 mb-5 pl-4 border-l-4 ${cat.headingBorder}`}>
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="text-xl font-bold text-slate-900">{cat.label}</h2>
                    <span className="text-sm text-slate-400 font-normal">{items.length}종</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((calc) => (
                      <CalcCard key={calc.id} calc={calc} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* ── 안내 배너 ─────────────────────────────────────── */}
            <section className="bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-3xl">📋</div>
              <div>
                <p className="font-semibold text-white mb-1">계산 결과 안내</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  모든 계산기는 2026년 기준 정부 공식 자료를 바탕으로 제작되었습니다.
                  실제 금액은 개인 상황·법령 개정에 따라 다를 수 있으므로 참고용으로 활용하세요.
                </p>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
