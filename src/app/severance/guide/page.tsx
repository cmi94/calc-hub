import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "퇴직금 계산 방법 완벽 가이드 2026 — 평균임금·지급 요건·예시",
  description:
    "퇴직금 계산 공식, 지급 요건, 평균임금 산정 방법을 상세히 설명합니다. 재직기간별 예시와 FAQ를 확인하세요.",
};

const FAQS = [
  {
    q: "퇴직금을 받으려면 얼마나 일해야 하나요?",
    a: "같은 사업장에서 1년 이상, 주 평균 15시간 이상 근무해야 합니다. 1년 미만 근무자는 퇴직금 지급 대상이 아닙니다.",
  },
  {
    q: "상여금도 평균임금에 포함되나요?",
    a: "네. 퇴직 전 1년간 지급된 상여금 합계의 3/12을 최근 3개월 급여에 합산해 평균임금을 산정합니다. 이 계산기는 입력된 금액만 반영하므로 상여금이 있다면 직접 포함해서 입력하세요.",
  },
  {
    q: "퇴직금과 퇴직연금(DC·DB형)의 차이는 무엇인가요?",
    a: "퇴직금은 회사가 퇴직 시 일시 지급하는 방식이고, 퇴직연금은 금융기관에 적립해 지급하는 방식입니다. DC형은 근로자가 운용하고, DB형은 회사가 운용합니다. 계산 기준은 동일합니다.",
  },
  {
    q: "연차수당도 평균임금에 포함되나요?",
    a: "퇴직 전 3개월 이내에 지급된 연차수당은 포함됩니다. 퇴직 시 미사용 연차수당도 별도로 청구할 수 있습니다.",
  },
  {
    q: "퇴직금은 언제 지급받나요?",
    a: "퇴직일로부터 14일 이내에 지급해야 합니다. 당사자 간 합의가 있으면 연장 가능하며, 미지급 시 고용노동부에 진정을 제기할 수 있습니다.",
  },
];

export default function SeveranceGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/severance" className="text-blue-600 text-sm hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            퇴직금 계산 방법 완벽 가이드 (2026년)
          </h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">퇴직금 계산 공식</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800">
            퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)
          </div>
          <p className="text-gray-700 leading-relaxed">
            1일 평균임금은 퇴직 전 3개월간 받은 총 급여를 해당 기간의 역일수(달력 일수)로 나눈 값입니다.
            재직 1년마다 30일분의 평균임금이 퇴직금으로 적립된다고 이해하면 됩니다.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">지급 요건</h2>
          <ul className="space-y-2 text-gray-700 text-sm leading-relaxed list-disc list-inside">
            <li>계속 근로기간 1년 이상</li>
            <li>4주 평균 주 15시간 이상 근무 (근로기준법 제18조)</li>
            <li>근로자퇴직급여보장법 적용 사업장 (5인 미만도 적용)</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">재직기간별 예시</h2>
          <p className="text-sm text-gray-500">월 급여 300만원 (3개월 합계 900만원, 역일수 90일) 기준</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">재직기간</th>
                  <th className="text-right py-2 text-gray-600 font-medium">1일 평균임금</th>
                  <th className="text-right py-2 text-gray-600 font-medium">퇴직금</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { period: "1년", days: 365, daily: 100_000, pay: 3_000_000 },
                  { period: "3년", days: 1095, daily: 100_000, pay: 9_000_000 },
                  { period: "5년", days: 1825, daily: 100_000, pay: 15_000_000 },
                  { period: "10년", days: 3650, daily: 100_000, pay: 30_000_000 },
                ].map((row) => (
                  <tr key={row.period}>
                    <td className="py-2 font-medium">{row.period}</td>
                    <td className="text-right">{row.daily.toLocaleString()}원</td>
                    <td className="text-right text-blue-600 font-semibold">약 {row.pay.toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            href="/severance"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            퇴직금 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
