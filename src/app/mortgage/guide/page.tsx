import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "주택담보대출 이자 계산 방법 가이드 2026 — 원리금균등·원금균등·체증식",
  description:
    "주담대 상환 방식별 차이, 원리금균등상환 계산 공식, 대출금리 종류와 선택 기준을 설명합니다.",
};

const FAQS = [
  {
    q: "원리금균등상환과 원금균등상환의 차이는?",
    a: "원리금균등상환은 매월 같은 금액을 납부합니다(이자 비중은 점점 줄어듦). 원금균등상환은 원금을 균등 분할하고 이자는 잔금에 따라 줄어들어 초기 납입액이 크지만 총 이자가 적습니다.",
  },
  {
    q: "변동금리 대출은 어떻게 계산하나요?",
    a: "변동금리는 기준금리 변동에 따라 적용 금리가 바뀌므로 정확한 예측이 어렵습니다. 이 계산기는 입력한 금리가 전 기간 유지된다는 가정 하에 계산합니다. 금리 변동 리스크를 고려하려면 여러 금리 시나리오로 비교해보세요.",
  },
  {
    q: "주담대 한도는 어떻게 결정되나요?",
    a: "LTV(담보인정비율)와 DSR(총부채원리금상환비율) 규제에 따라 결정됩니다. 2026년 기준 투기지역은 LTV 40%, 조정지역 50%, 비규제지역 70%이며, DSR 40% 규제도 함께 적용됩니다.",
  },
  {
    q: "중도상환수수료란 무엇인가요?",
    a: "대출 만기 전에 원금 일부 또는 전부를 상환할 때 부과되는 수수료입니다. 통상 3년 이내 상환 시 0.5~1.5%가 부과됩니다. 대출 계약 시 조건을 확인하세요.",
  },
  {
    q: "금리 1%p 차이가 얼마나 중요한가요?",
    a: "3억원을 30년 상환 기준으로 금리 4%와 5%를 비교하면 월 납입액은 약 16만원, 총 이자는 약 5,800만원 차이가 납니다. 금리 협상에 충분히 시간을 투자할 가치가 있습니다.",
  },
];

export default function MortgageGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/mortgage" className="text-blue-600 text-sm hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            주택담보대출 이자 계산 방법 가이드 (2026년)
          </h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">원리금균등상환 계산 공식</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800">
            월 납입액 = 대출금액 × [r(1+r)^n] / [(1+r)^n - 1]
            <p className="text-gray-500 text-xs mt-1">r = 월 금리, n = 총 상환 개월수</p>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            매월 동일한 금액을 납부하며, 초기에는 이자 비중이 높고 후기로 갈수록 원금 비중이 높아집니다.
            납부 금액이 일정해 가계 예산 관리가 수월한 장점이 있습니다.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">금리별 월 상환액 비교</h2>
          <p className="text-sm text-gray-500">대출금액 3억원, 30년 상환 기준</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">연 금리</th>
                  <th className="text-right py-2 text-gray-600 font-medium">월 상환액</th>
                  <th className="text-right py-2 text-gray-600 font-medium">총 이자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { rate: "3.0%", monthly: "1,265,000원", interest: "1억 5,540만원" },
                  { rate: "4.0%", monthly: "1,432,000원", interest: "2억 1,552만원" },
                  { rate: "4.5%", monthly: "1,520,000원", interest: "2억 4,720만원" },
                  { rate: "5.0%", monthly: "1,610,000원", interest: "2억 7,960만원" },
                  { rate: "6.0%", monthly: "1,799,000원", interest: "3억 4,764만원" },
                ].map((row) => (
                  <tr key={row.rate}>
                    <td className="py-2 font-medium">{row.rate}</td>
                    <td className="text-right">{row.monthly}</td>
                    <td className="text-right text-red-500">{row.interest}</td>
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
          <Link href="/mortgage" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            대출 이자 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
