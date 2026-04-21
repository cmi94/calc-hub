import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "전세대출 이자 계산 방법 가이드 2026 — 종류·한도·금리 비교",
  description: "전세대출 종류(버팀목·카카오뱅크·시중은행), 한도, 금리 비교 기준을 설명합니다.",
};

const FAQS = [
  {
    q: "전세대출과 주택담보대출의 차이는?",
    a: "전세대출은 전세보증금을 담보로 이자만 납부하다가 만기에 원금을 일시 상환합니다. 주택담보대출은 주택 소유권을 담보로 원리금을 매월 상환합니다.",
  },
  {
    q: "버팀목 전세대출 대상은 누구인가요?",
    a: "무주택 세대주로, 부부합산 연 소득 5천만원 이하(신혼부부 7.5천만원 이하), 순자산 3.61억원 이하인 경우 지원 대상입니다. 금리는 2026년 기준 연 2.1~2.9% 수준입니다.",
  },
  {
    q: "전세대출 한도는 어떻게 되나요?",
    a: "임차보증금의 80% 이내, 수도권 최대 3억원, 지방 2억원이 일반적인 기준입니다. 버팀목 전세대출은 수도권 1.2억원, 지방 8천만원 한도가 적용됩니다.",
  },
  {
    q: "전세보증보험이란 무엇인가요?",
    a: "집주인이 전세보증금을 돌려주지 못할 때 HUG(주택도시보증공사) 또는 SGI서울보증이 대신 지급하는 보험입니다. 연 0.128~0.154% 수준의 보험료가 발생하며, 전세대출 실행 시 가입이 권장됩니다.",
  },
];

export default function JeonseLoanGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/jeonse-loan" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">전세대출 이자 계산 방법 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold">계산 공식</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800">
            월 이자 = 대출금액 × 연 금리 ÷ 12
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            전세대출은 만기까지 이자만 납부하고 원금은 만기에 일시 상환합니다. 월 부담이 주택담보대출보다 낮지만, 만기 시 원금 전액을 마련해야 합니다.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold">금리별 월 이자 예시</h2>
          <p className="text-sm text-gray-500">대출금액 2억원 기준</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-600 font-medium">연 금리</th>
                <th className="text-right py-2 text-gray-600 font-medium">월 이자</th>
                <th className="text-right py-2 text-gray-600 font-medium">연 이자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { rate: "2.5%", monthly: "416,667원", annual: "5,000,000원" },
                { rate: "3.0%", monthly: "500,000원", annual: "6,000,000원" },
                { rate: "3.5%", monthly: "583,333원", annual: "7,000,000원" },
                { rate: "4.0%", monthly: "666,667원", annual: "8,000,000원" },
              ].map((row) => (
                <tr key={row.rate}>
                  <td className="py-2 font-medium">{row.rate}</td>
                  <td className="text-right text-blue-600 font-semibold">{row.monthly}</td>
                  <td className="text-right">{row.annual}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <Link href="/jeonse-loan" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            전세대출 이자 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
