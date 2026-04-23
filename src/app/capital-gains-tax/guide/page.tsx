import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "양도소득세 계산 방법 가이드 2026 — 비과세·장기보유공제",
  description:
    "1세대 1주택 비과세 요건, 장기보유특별공제율, 다주택자 중과세율을 설명합니다. 소득세법 기준.",
};

const LONG_TERM_DEDUCTION = [
  { years: "3년", one: "24%", multi: "6%" },
  { years: "4년", one: "32%", multi: "8%" },
  { years: "5년", one: "40%", multi: "10%" },
  { years: "6년", one: "48%", multi: "12%" },
  { years: "7년", one: "56%", multi: "14%" },
  { years: "8년", one: "64%", multi: "16%" },
  { years: "9년", one: "72%", multi: "18%" },
  { years: "10년+", one: "최대 80%", multi: "최대 30%" },
];

const TAX_BRACKETS = [
  { range: "1,400만 이하", rate: "6%" },
  { range: "1,400만 ~ 5,000만", rate: "15%" },
  { range: "5,000만 ~ 8,800만", rate: "24%" },
  { range: "8,800만 ~ 1.5억", rate: "35%" },
  { range: "1.5억 ~ 3억", rate: "38%" },
  { range: "3억 ~ 5억", rate: "40%" },
  { range: "5억 ~ 10억", rate: "42%" },
  { range: "10억 초과", rate: "45%" },
];

export default function CapitalGainsTaxGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/capital-gains-tax" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">양도소득세 계산 방법 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">소득세법 제94조·제95조·제104조 기준</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">양도소득세 기본 공식</h2>
          <div className="bg-blue-50 rounded-xl p-4 text-sm space-y-1 font-mono">
            <p>양도차익 = 양도가액 - 취득가액 - 필요경비</p>
            <p>과세표준 = 양도차익 - 장기보유특별공제 - 기본공제(250만)</p>
            <p>양도소득세 = 과세표준 × 세율</p>
            <p>납부세액 = 양도소득세 + 지방소득세(10%)</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">1세대 1주택 비과세 요건</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside leading-relaxed">
            <li>보유기간 2년 이상</li>
            <li>조정대상지역: 취득 당시 거주기간 2년 이상 추가 필요</li>
            <li>양도가액 12억 이하 (2021.12.8 이후 취득분)</li>
            <li>12억 초과 고가주택은 초과분에 대해서만 과세</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">장기보유특별공제율</h2>
          <p className="text-sm text-gray-500">1주택: 보유 연 4% + 거주 연 4% (최대 80%) | 다주택: 보유 연 2% (최대 30%)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">보유기간</th>
                  <th className="text-right py-2 text-gray-600 font-medium">1주택 (보유+거주 각 최대)</th>
                  <th className="text-right py-2 text-gray-600 font-medium">다주택</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {LONG_TERM_DEDUCTION.map((row) => (
                  <tr key={row.years}>
                    <td className="py-2 text-gray-800">{row.years}</td>
                    <td className="text-right font-medium text-green-600">{row.one}</td>
                    <td className="text-right text-gray-500">{row.multi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">양도소득세 세율표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">과세표준</th>
                  <th className="text-right py-2 text-gray-600 font-medium">세율</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TAX_BRACKETS.map((row) => (
                  <tr key={row.range}>
                    <td className="py-2 text-gray-800">{row.range}</td>
                    <td className="text-right font-medium text-red-500">{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">
            단기 보유(1년 미만 70%, 1~2년 60%), 다주택자 조정지역 중과 +20~30%p 별도
          </p>
        </section>

        <div className="text-center">
          <Link href="/capital-gains-tax" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            양도소득세 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
