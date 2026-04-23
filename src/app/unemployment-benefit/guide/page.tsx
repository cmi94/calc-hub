import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "실업급여 계산 방법 가이드 2026 — 수급 요건·일액·수급일수",
  description: "실업급여 수급 요건, 구직급여일액 계산법, 소정급여일수 매트릭스를 안내합니다.",
};

const BENEFIT_DAYS = [
  { period: "1년 미만", under50: 120, above50: 120 },
  { period: "1~3년", under50: 150, above50: 180 },
  { period: "3~5년", under50: 180, above50: 210 },
  { period: "5~10년", under50: 210, above50: 240 },
  { period: "10년 이상", under50: 240, above50: 270 },
];

export default function UnemploymentBenefitGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/unemployment-benefit" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">실업급여 계산 방법 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">고용보험법 제50조 기준</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">수급 요건</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside leading-relaxed">
            <li>이직일 전 18개월 중 고용보험 피보험 단위기간 180일 이상</li>
            <li>비자발적 이직 (권고사직, 계약만료, 폐업 등)</li>
            <li>재취업 의사와 능력이 있음에도 취업하지 못한 상태</li>
            <li>적극적인 재취업 활동 (구직활동 요건 충족)</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">구직급여일액 계산</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800">
            구직급여일액 = 이직 전 평균임금 × 60%<br />
            (하한 66,048원 / 상한 70,000원)
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">소정급여일수 (나이 × 피보험기간)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-600 font-medium">피보험기간</th>
                <th className="text-right py-2 text-gray-600 font-medium">50세 미만</th>
                <th className="text-right py-2 text-gray-600 font-medium">50세 이상·장애인</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {BENEFIT_DAYS.map((row) => (
                  <tr key={row.period}>
                    <td className="py-2">{row.period}</td>
                    <td className="text-right">{row.under50}일</td>
                    <td className="text-right">{row.above50}일</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-center">
          <Link href="/unemployment-benefit" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            실업급여 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
