import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/content/calculators";
import { categories } from "@/content/categories";

export const metadata: Metadata = {
  title: "계산허브 — 연봉·퇴직금·세금·대출 계산기 모음",
  description:
    "연봉 실수령액, 퇴직금, 주휴수당, 취득세, 주담대, 전세대출, 종합소득세 등 한국인의 생활 계산기를 한곳에서. 2026년 최신 기준 무료 제공.",
};

const CATEGORY_LABELS: Record<string, string> = {
  labor: "근로",
  tax: "세금",
  finance: "금융",
  realestate: "부동산",
};

export default function HomePage() {
  const grouped = categories
    .map((cat) => ({
      ...cat,
      items: calculators.filter((c) => c.category === cat.slug),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <section className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">한국인을 위한 생활 계산기</h1>
        <p className="text-gray-500">
          연봉·퇴직금·세금·대출을 2026년 최신 기준으로 정확하게 계산하세요.
        </p>
      </section>

      {grouped.map((cat) => (
        <section key={cat.slug} className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">
            {CATEGORY_LABELS[cat.slug] ?? cat.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cat.items.map((calc) => (
              <Link
                key={calc.id}
                href={calc.path}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <p className="font-medium text-gray-900">{calc.name}</p>
                <p className="text-sm text-gray-500 mt-1">{calc.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-blue-50 rounded-2xl p-6 text-sm text-blue-800 space-y-1">
        <p className="font-semibold">계산 결과 안내</p>
        <p>
          모든 계산기는 2026년 기준 정부 공식 자료를 바탕으로 만들어졌습니다.
          실제 금액은 개인 상황·법령 개정에 따라 다를 수 있으므로 참고용으로 활용하세요.
        </p>
      </section>
    </main>
  );
}
