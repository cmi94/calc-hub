import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "시급 월급 환산 방법 가이드 2026 — 주휴수당·최저시급 포함",
  description:
    "시급을 월급으로 환산하는 방법, 주휴수당 계산, 2026년 최저시급 기준을 설명합니다.",
};

const FAQS = [
  {
    q: "월급 환산 시 209시간은 어디서 나오나요?",
    a: "(주 40시간 + 주휴 8시간) × 365일 / 7일 / 12개월 ≈ 209시간입니다. 고용노동부에서 월급 환산 기준으로 사용하는 공식 시간입니다.",
  },
  {
    q: "주휴수당은 누구에게 적용되나요?",
    a: "1주 소정근로시간이 15시간 이상인 근로자에게 적용됩니다 (근로기준법 제55조). 아르바이트, 단시간 근로자 모두 포함됩니다.",
  },
  {
    q: "2026년 최저시급은 얼마인가요?",
    a: "2026년 최저시급은 10,320원입니다 (고용노동부 고시 제2025-65호). 이를 기준으로 월환산액은 약 2,156,880원입니다.",
  },
  {
    q: "연장근로 수당은 어떻게 계산하나요?",
    a: "법정 근로시간(주 40시간)을 초과하는 연장근로에는 통상임금의 50% 가산 수당이 붙습니다. 이 계산기는 기본 시급 환산만 제공하며 연장·야간·휴일수당은 포함하지 않습니다.",
  },
];

export default function HourlyWageGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/hourly-wage" className="text-blue-600 text-sm hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            시급 월급 환산 방법 가이드 (2026년)
          </h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월 · 최저시급 10,320원 기준</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">환산 공식</h2>
          <div className="space-y-2 text-sm font-mono bg-gray-50 rounded-xl p-4 text-gray-800">
            <p>일급 = 시급 × 8시간</p>
            <p>주급 = 시급 × 주간근로시간 + 주휴수당</p>
            <p>월급 = 주급 × 4.345주</p>
            <p>연봉 = 월급 × 12</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">2026 최저시급 기준 환산</h2>
          <p className="text-xs text-gray-400">시급 10,320원, 주 40시간, 주휴수당 포함</p>
          <div className="divide-y divide-gray-100 text-sm">
            {[
              { label: "일급 (8시간)", value: "82,560원" },
              { label: "주급 (주휴 포함)", value: "496,320원" },
              { label: "월급 (209시간 기준)", value: "2,156,880원" },
              { label: "연봉", value: "25,882,560원" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5">
                <span className="text-gray-600">{row.label}</span>
                <span className="font-semibold">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">자주 묻는 질문</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <p className="font-medium text-gray-800">Q. {faq.q}</p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/hourly-wage"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            시급 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
