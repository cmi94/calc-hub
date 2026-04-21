import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "중고차 취득세 계산 방법 가이드 2026 — 차종별 세율·감면·납부 방법",
  description:
    "중고차 취득세 계산 공식, 차종별 세율, 전기차 감면, 납부 방법을 상세히 설명합니다.",
};

const FAQS = [
  {
    q: "취득세는 언제, 어떻게 납부하나요?",
    a: "차량 취득일로부터 60일 이내에 관할 시·군·구청에 신고·납부해야 합니다. 위택스(wetax.go.kr)에서 온라인 신고도 가능합니다.",
  },
  {
    q: "시가표준액과 실거래가 중 어느 것이 과세표준인가요?",
    a: "원칙적으로 시가표준액(행정안전부 고시)과 실거래가 중 높은 금액이 과세표준이 됩니다. 단, 중고차는 실거래가가 시가표준액보다 낮은 경우가 많아 실거래가를 기준으로 신고하는 경우가 일반적입니다.",
  },
  {
    q: "전기차 취득세 감면은 언제까지인가요?",
    a: "지방세특례제한법에 따라 전기차 취득세 감면은 정기적으로 연장되어 왔습니다. 2026년 기준 감면 여부는 최신 법령을 확인하세요. 이 계산기는 140만원 감면을 적용합니다.",
  },
  {
    q: "법인이 차량을 취득할 때도 같은 세율인가요?",
    a: "비영업용 승용차는 개인·법인 모두 7%입니다. 단, 영업용(렌터카, 운수업 등)은 4%가 적용됩니다. 이 계산기는 비영업용 기준입니다.",
  },
];

export default function UsedCarTaxGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/used-car-tax" className="text-blue-600 text-sm hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            중고차 취득세 계산 방법 가이드 (2026년)
          </h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">차종별 취득세율</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">차종</th>
                  <th className="text-right py-2 text-gray-600 font-medium">취득세율</th>
                  <th className="text-right py-2 text-gray-600 font-medium">지방교육세</th>
                  <th className="text-right py-2 text-gray-600 font-medium">합계</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2">승용차 (비영업용)</td>
                  <td className="text-right">7%</td>
                  <td className="text-right">취득세 × 20%</td>
                  <td className="text-right font-semibold">8.4%</td>
                </tr>
                <tr>
                  <td className="py-2">승합차·화물차</td>
                  <td className="text-right">5%</td>
                  <td className="text-right">취득세 × 20%</td>
                  <td className="text-right font-semibold">6%</td>
                </tr>
                <tr>
                  <td className="py-2">전기차</td>
                  <td className="text-right">7%</td>
                  <td className="text-right">취득세 × 20%</td>
                  <td className="text-right font-semibold">8.4% (140만원 감면)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">출처: 지방세법 제11조, 행정안전부</p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">가격별 취득세 예시 (승용차)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">차량 가격</th>
                  <th className="text-right py-2 text-gray-600 font-medium">취득세</th>
                  <th className="text-right py-2 text-gray-600 font-medium">지방교육세</th>
                  <th className="text-right py-2 text-gray-600 font-medium">합계</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { price: "1,000만원", acq: "70만원", edu: "14만원", total: "84만원" },
                  { price: "2,000만원", acq: "140만원", edu: "28만원", total: "168만원" },
                  { price: "3,000만원", acq: "210만원", edu: "42만원", total: "252만원" },
                  { price: "5,000만원", acq: "350만원", edu: "70만원", total: "420만원" },
                ].map((row) => (
                  <tr key={row.price}>
                    <td className="py-2 font-medium">{row.price}</td>
                    <td className="text-right">{row.acq}</td>
                    <td className="text-right">{row.edu}</td>
                    <td className="text-right text-blue-600 font-semibold">{row.total}</td>
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
          <Link href="/used-car-tax" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            취득세 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
