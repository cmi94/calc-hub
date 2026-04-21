import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산 방법 완벽 가이드 2026 — 4대보험·세금 공제 기준",
  description:
    "2026년 국민연금·건강보험·고용보험·근로소득세 요율과 공제 계산 방법을 상세히 설명합니다. 연봉별 실수령액 예시와 FAQ를 확인하세요.",
};

const EXAMPLES = [
  { annual: "3,000만원", monthly: "2,500,000원", net: "약 2,186,000원" },
  { annual: "4,000만원", monthly: "3,333,333원", net: "약 2,872,000원" },
  { annual: "5,000만원", monthly: "4,166,666원", net: "약 3,519,000원" },
  { annual: "6,000만원", monthly: "5,000,000원", net: "약 4,155,000원" },
  { annual: "8,000만원", monthly: "6,666,666원", net: "약 5,343,000원" },
];

const FAQS = [
  {
    q: "식대·교통비 같은 비과세 수당은 어떻게 처리하나요?",
    a: "월 20만원 이하의 식대는 비과세입니다. 비과세 수당은 4대보험 산정 기준에서 제외되므로 실수령액이 계산기 결과보다 조금 높을 수 있습니다.",
  },
  {
    q: "세전 연봉과 세후 연봉의 차이는 무엇인가요?",
    a: "세전 연봉은 4대보험과 세금을 공제하기 전 총급여이고, 세후 연봉은 공제 후 실제 수령 금액입니다. 계약서에 적힌 연봉은 일반적으로 세전입니다.",
  },
  {
    q: "회사에서 받는 실제 월급과 다를 수 있나요?",
    a: "네. 회사별 급여 지급 방식(상여금 포함 여부, 비과세 항목, 연말정산 조정)에 따라 차이가 발생할 수 있습니다. 이 계산기는 기본급 기준 근사값입니다.",
  },
  {
    q: "국민연금 상한은 왜 있나요?",
    a: "국민연금은 기준소득월액 상한(2025년 7월 기준 617만원)을 초과하는 소득에는 보험료를 부과하지 않습니다. 고소득자의 실제 공제율은 더 낮게 됩니다.",
  },
  {
    q: "연말정산으로 환급받으면 실수령액이 달라지나요?",
    a: "연말정산은 1년치 세금을 정산하는 과정입니다. 공제 항목(의료비, 교육비, 기부금 등)이 많으면 환급, 적으면 추가 납부가 발생합니다. 이 계산기는 연말정산 전 원천징수 기준 금액입니다.",
  },
];

export default function SalaryGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/salary" className="text-blue-600 text-sm hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            연봉 실수령액 계산 방법 완벽 가이드 (2026년)
          </h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>
        </div>

        {/* 개요 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">실수령액이란?</h2>
          <p className="text-gray-700 leading-relaxed">
            실수령액은 연봉에서 4대보험(국민연금·건강보험·장기요양보험·고용보험)과 근로소득세·지방소득세를 공제한 뒤 실제로 통장에 입금되는 금액입니다.
            같은 연봉이라도 부양가족 수, 비과세 수당, 상여금 지급 방식에 따라 차이가 납니다.
          </p>
        </section>

        {/* 공제 항목별 요율 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">2026년 공제 항목별 요율</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">항목</th>
                  <th className="text-right py-2 text-gray-600 font-medium">근로자 부담률</th>
                  <th className="text-right py-2 text-gray-600 font-medium">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2">국민연금</td>
                  <td className="text-right">4.5%</td>
                  <td className="text-right text-gray-500">상한 617만원</td>
                </tr>
                <tr>
                  <td className="py-2">건강보험</td>
                  <td className="text-right">3.545%</td>
                  <td className="text-right text-gray-500">직장가입자</td>
                </tr>
                <tr>
                  <td className="py-2">장기요양보험</td>
                  <td className="text-right">건강보험료 × 12.95%</td>
                  <td className="text-right text-gray-500">—</td>
                </tr>
                <tr>
                  <td className="py-2">고용보험</td>
                  <td className="text-right">0.9%</td>
                  <td className="text-right text-gray-500">—</td>
                </tr>
                <tr>
                  <td className="py-2">근로소득세</td>
                  <td className="text-right">누진세율</td>
                  <td className="text-right text-gray-500">6%~45%</td>
                </tr>
                <tr>
                  <td className="py-2">지방소득세</td>
                  <td className="text-right">근로소득세 × 10%</td>
                  <td className="text-right text-gray-500">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">
            출처: 국민연금공단·국민건강보험공단·고용노동부·국세청 (2026년 기준)
          </p>
        </section>

        {/* 연봉별 예시 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">연봉별 월 실수령액 예시</h2>
          <p className="text-sm text-gray-500">부양가족 1명(본인), 비과세 수당 없음 기준</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">연봉</th>
                  <th className="text-right py-2 text-gray-600 font-medium">월 급여</th>
                  <th className="text-right py-2 text-gray-600 font-medium">월 실수령액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {EXAMPLES.map((ex) => (
                  <tr key={ex.annual}>
                    <td className="py-2 font-medium">{ex.annual}</td>
                    <td className="text-right">{ex.monthly}</td>
                    <td className="text-right text-blue-600 font-semibold">{ex.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
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
            href="/salary"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            실수령액 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
