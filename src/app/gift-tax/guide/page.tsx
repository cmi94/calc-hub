import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "증여세 계산 방법 가이드 2026 — 공제한도·세율표·신고",
  description: "증여세 공제한도, 누진세율표, 신고 기한, 절세 방법을 안내합니다.",
};

const TAX_BRACKETS = [
  { range: "1억 이하", rate: "10%", deduction: "0원" },
  { range: "1억 초과 ~ 5억 이하", rate: "20%", deduction: "1,000만원" },
  { range: "5억 초과 ~ 10억 이하", rate: "30%", deduction: "6,000만원" },
  { range: "10억 초과 ~ 30억 이하", rate: "40%", deduction: "1억 6,000만원" },
  { range: "30억 초과", rate: "50%", deduction: "4억 6,000만원" },
];

const DEDUCTIONS = [
  { relation: "배우자", amount: "6억원" },
  { relation: "직계존속 (부모·조부모)", amount: "5,000만원" },
  { relation: "직계비속 (자녀·손자, 성인)", amount: "5,000만원" },
  { relation: "직계비속 (미성년자)", amount: "2,000만원" },
  { relation: "기타 친족 (형제자매 등)", amount: "1,000만원" },
  { relation: "타인", amount: "없음" },
];

export default function GiftTaxGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/gift-tax" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">증여세 계산 방법 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">상속세 및 증여세법 제26조, 제53조 기준</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">증여재산공제 한도 (10년 합산)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-600 font-medium">관계</th>
                <th className="text-right py-2 text-gray-600 font-medium">공제한도</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {DEDUCTIONS.map((row) => (
                  <tr key={row.relation}>
                    <td className="py-2 text-gray-800">{row.relation}</td>
                    <td className="text-right font-medium">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">증여세 누진세율표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-600 font-medium">과세표준</th>
                <th className="text-right py-2 text-gray-600 font-medium">세율</th>
                <th className="text-right py-2 text-gray-600 font-medium">누진공제</th>
              </tr></thead>
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
          <h2 className="text-lg font-semibold text-gray-900">신고 기한 및 공제</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside leading-relaxed">
            <li>증여받은 날로부터 3개월 이내 신고·납부</li>
            <li>기한 내 신고 시 산출세액의 3% 신고세액공제</li>
            <li>기한 초과 시 무신고가산세(20%) 또는 납부지연가산세 부과</li>
          </ul>
        </section>

        <div className="text-center">
          <Link href="/gift-tax" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            증여세 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
