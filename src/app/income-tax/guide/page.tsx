import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "종합소득세 계산 방법 가이드 2026 — 신고 기간·경비율·세율표",
  description: "종합소득세 신고 기간, 단순경비율·기준경비율 차이, 세율표, 절세 방법을 설명합니다.",
};

const TAX_BRACKETS = [
  { range: "1,400만원 이하", rate: "6%", deduction: "—" },
  { range: "1,400만원 ~ 5,000만원", rate: "15%", deduction: "126만원" },
  { range: "5,000만원 ~ 8,800만원", rate: "24%", deduction: "576만원" },
  { range: "8,800만원 ~ 1억 5천만원", rate: "35%", deduction: "1,544만원" },
  { range: "1억 5천만원 ~ 3억원", rate: "38%", deduction: "1,994만원" },
  { range: "3억원 ~ 5억원", rate: "40%", deduction: "2,594만원" },
  { range: "5억원 ~ 10억원", rate: "42%", deduction: "3,594만원" },
  { range: "10억원 초과", rate: "45%", deduction: "6,594만원" },
];

const FAQS = [
  {
    q: "종합소득세 신고 기간은 언제인가요?",
    a: "매년 5월 1일부터 5월 31일까지 전년도 소득에 대해 신고합니다. 성실신고확인 대상자는 6월 30일까지입니다. 홈택스(hometax.go.kr)에서 온라인 신고가 가능합니다.",
  },
  {
    q: "단순경비율과 기준경비율은 어떻게 다른가요?",
    a: "단순경비율은 소득 전체에 경비율을 적용하는 방식으로 계산이 단순합니다. 기준경비율은 주요 경비(매입비·임차료·인건비)를 장부로 입증하고, 나머지는 경비율로 적용합니다. 소득이 낮을수록 단순경비율이 유리한 경우가 많습니다.",
  },
  {
    q: "프리랜서 3.3% 원천징수와 종합소득세의 관계는?",
    a: "3.3%는 소득세 3% + 지방소득세 0.3%로, 원천징수된 금액입니다. 5월 종합소득세 신고 시 이미 납부한 3.3%를 기납부세액으로 차감합니다. 실제 세금이 기납부액보다 적으면 환급받습니다.",
  },
  {
    q: "연 소득 300만원 이하 프리랜서도 신고해야 하나요?",
    a: "원칙적으로 사업소득이 있으면 신고 의무가 있습니다. 다만 다른 종합과세 대상 소득이 없고 원천징수를 완납한 경우, 실무상 신고하지 않는 경우도 있습니다. 정확한 판단은 세무사 상담을 권장합니다.",
  },
];

export default function IncomeTaxGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/income-tax" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">종합소득세 계산 방법 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold">2026년 소득세율표</h2>
          <p className="text-xs text-gray-400">출처: 소득세법 제55조</p>
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
                    <td className="py-2">{row.range}</td>
                    <td className="text-right font-semibold text-blue-600">{row.rate}</td>
                    <td className="text-right text-gray-500">{row.deduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold">자주 묻는 질문</h2>
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
          <Link href="/income-tax" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            종합소득세 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
