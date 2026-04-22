import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "부동산 취득세 계산 방법 완벽 가이드 2026 — 주택수·조정지역별 세율표",
  description:
    "주택 취득세 세율표, 6억~9억 누진 계산 방법, 조정대상지역 중과세율, 지방교육세·농어촌특별세 계산 방법을 설명합니다.",
};

const TAX_RATES = [
  { case: "1주택 (6억 이하)", adjusted: "1%", notAdjusted: "1%" },
  { case: "1주택 (6억 초과~9억)", adjusted: "1~3% 누진", notAdjusted: "1~3% 누진" },
  { case: "1주택 (9억 초과)", adjusted: "3%", notAdjusted: "3%" },
  { case: "2주택", adjusted: "8%", notAdjusted: "1~3% 누진" },
  { case: "3주택 이상", adjusted: "12%", notAdjusted: "8%" },
  { case: "법인", adjusted: "12%", notAdjusted: "12%" },
];

const FAQS = [
  {
    q: "취득세는 언제 납부하나요?",
    a: "부동산 취득일(잔금 지급일 또는 등기일 중 빠른 날)로부터 60일 이내에 신고·납부해야 합니다. 기한 초과 시 가산세가 부과됩니다.",
  },
  {
    q: "일시적 2주택은 중과세를 피할 수 있나요?",
    a: "기존 주택을 3년 이내에 처분한다는 조건으로 일시적 2주택 특례가 적용됩니다. 이 경우 조정지역이어도 1주택 세율이 적용됩니다. 이 계산기는 해당 감면을 반영하지 않으므로 실제 납부 시 관할 구청에 확인하세요.",
  },
  {
    q: "생애최초 주택 구입 감면이 있나요?",
    a: "생애최초 주택 구입자는 취득가액 12억 이하, 취득세 200만원 한도로 100% 감면을 받을 수 있습니다 (지방세특례제한법 제36조의3). 이 계산기는 감면 전 금액을 계산합니다.",
  },
  {
    q: "농어촌특별세는 왜 부과되나요?",
    a: "농어촌특별세법에 따라 전용면적 85㎡(약 25.7평) 초과 주택을 취득할 때 취득세의 20%가 농어촌특별세로 부과됩니다. 85㎡ 이하는 비과세입니다.",
  },
  {
    q: "조정대상지역은 어디인가요?",
    a: "조정대상지역은 국토부 고시로 지정되며 수시로 변경됩니다. 2026년 기준 서울 전역, 경기 일부(과천, 성남 분당·수정구 등) 등이 해당됩니다. 정확한 현황은 국토교통부 실거래가 공개시스템(rt.molit.go.kr)에서 확인하세요.",
  },
];

export default function PropertyAcquisitionTaxGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/property-acquisition-tax" className="text-blue-600 text-sm hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            부동산 취득세 계산 방법 완벽 가이드 (2026년)
          </h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월 · 지방세법 제11조 기준</p>
        </div>

        {/* 세율표 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">주택 취득세율표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">구분</th>
                  <th className="text-right py-2 text-gray-600 font-medium">조정대상지역</th>
                  <th className="text-right py-2 text-gray-600 font-medium">비조정</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TAX_RATES.map((row) => (
                  <tr key={row.case}>
                    <td className="py-2 text-gray-800">{row.case}</td>
                    <td className="text-right text-red-500 font-medium">{row.adjusted}</td>
                    <td className="text-right">{row.notAdjusted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 누진 계산 공식 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">6억~9억 구간 누진 계산</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800">
            세율(%) = 취득가액(억) × 2/3 − 3
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            예를 들어 8억에 1주택을 취득하면: 8 × 2/3 − 3 = 2.33%, 취득세 약 18,666,667원
          </p>
          <p className="text-xs text-gray-400">출처: 지방세법 시행령 제28조의2</p>
        </section>

        {/* 추가 세목 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">추가 세목</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="font-medium w-28 shrink-0">지방교육세</span>
              <span>취득세의 10% (지방세법 제151조)</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium w-28 shrink-0">농어촌특별세</span>
              <span>전용면적 85㎡ 초과 시 취득세의 20%, 이하 비과세 (농어촌특별세법 제5조)</span>
            </div>
          </div>
        </section>

        {/* 계산 예시 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">계산 예시</h2>
          <p className="text-sm text-gray-500">서울 소재 84㎡ 아파트 6억 취득, 1주택자</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">취득세 (6억 × 1%)</span>
              <span>6,000,000원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">지방교육세 (600만 × 10%)</span>
              <span>600,000원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">농어촌특별세 (84㎡ 이하)</span>
              <span>0원</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
              <span>합계</span>
              <span className="text-blue-600">6,600,000원</span>
            </div>
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
            href="/property-acquisition-tax"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            취득세 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
