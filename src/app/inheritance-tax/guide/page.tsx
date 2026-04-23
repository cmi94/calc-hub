import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "상속세 계산 방법 가이드 2026 — 공제 항목·세율표",
  description:
    "상속세 기초공제·배우자공제·일괄공제 항목과 누진세율표를 안내합니다. 상속세및증여세법 기준.",
};

const TAX_BRACKETS = [
  { range: "1억 이하", rate: "10%", deduction: "0" },
  { range: "1억 ~ 5억", rate: "20%", deduction: "1,000만원" },
  { range: "5억 ~ 10억", rate: "30%", deduction: "6,000만원" },
  { range: "10억 ~ 30억", rate: "40%", deduction: "1억 6,000만원" },
  { range: "30억 초과", rate: "50%", deduction: "4억 6,000만원" },
];

export default function InheritanceTaxGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/inheritance-tax" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">상속세 계산 방법 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">상속세및증여세법 제18조·제19조·제26조 기준</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">상속세 계산 기본 구조</h2>
          <div className="bg-blue-50 rounded-xl p-4 text-sm space-y-1 font-mono">
            <p>순재산 = 상속재산 - 채무·장례비·공과금</p>
            <p>적용 공제 = max(일괄공제 5억, 기초공제+인적공제) + 배우자공제</p>
            <p>과세표준 = 순재산 - 적용 공제</p>
            <p>납부세액 = 산출세액 × (1 - 신고세액공제 3%)</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">주요 공제 항목</h2>
          <div className="divide-y divide-gray-100 text-sm">
            {[
              { label: "기초공제", amount: "2억원" },
              { label: "일괄공제 (기초+인적 vs 일괄 중 큰 것)", amount: "5억원" },
              { label: "배우자공제 (최소)", amount: "5억원" },
              { label: "배우자공제 (최대)", amount: "30억원" },
              { label: "자녀 인적공제 (1인당)", amount: "5,000만원" },
              { label: "미성년자 (1인당 연 1,000만×잔여연수)", amount: "최대 수천만" },
              { label: "장애인 (1인당 연 1,000만×기대여명)", amount: "별도 계산" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5">
                <span className="text-gray-700">{row.label}</span>
                <span className="font-semibold text-green-600">{row.amount}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">상속세 누진세율표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">과세표준</th>
                  <th className="text-right py-2 text-gray-600 font-medium">세율</th>
                  <th className="text-right py-2 text-gray-600 font-medium">누진공제</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TAX_BRACKETS.map((row) => (
                  <tr key={row.range}>
                    <td className="py-2 text-gray-800">{row.range}</td>
                    <td className="text-right font-medium text-red-500">{row.rate}</td>
                    <td className="text-right text-gray-500">{row.deduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">신고 기한</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside leading-relaxed">
            <li>상속 개시일(사망일)로부터 6개월 이내 신고·납부</li>
            <li>해외 거주 상속인의 경우 9개월 이내</li>
            <li>법정 신고 기한 내 신고 시 산출세액의 3% 신고세액공제</li>
            <li>미신고·무신고 시 20~40% 가산세 부과</li>
          </ul>
        </section>

        <div className="text-center">
          <Link href="/inheritance-tax" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            상속세 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
