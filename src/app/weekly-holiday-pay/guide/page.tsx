import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "주휴수당 계산 방법 완벽 가이드 2026 — 지급 요건·공식·예시",
  description:
    "주휴수당 지급 요건, 계산 공식, 아르바이트·파트타임 적용 기준을 상세히 설명합니다.",
};

const FAQS = [
  {
    q: "주휴수당은 아르바이트에게도 지급되나요?",
    a: "네. 고용 형태와 관계없이 주 15시간 이상 근무하고 소정 근로일을 개근한 모든 근로자에게 지급됩니다. 아르바이트, 파트타임, 단기 계약직 모두 해당됩니다.",
  },
  {
    q: "주휴수당을 포함한 시급이란 무엇인가요?",
    a: "일부 사업장은 시급에 주휴수당을 포함해 계약하기도 합니다. 이 경우 실제 시급은 계약 시급보다 낮습니다. 계약서에 '주휴수당 포함' 문구가 있는지 확인하세요.",
  },
  {
    q: "지각이나 조퇴를 하면 주휴수당이 없나요?",
    a: "지각·조퇴는 결근이 아니므로 주휴수당 산정에 영향이 없습니다. 단, 소정 근로일에 실제로 출근하지 않은 결근이 있으면 주휴수당이 감소하거나 미지급될 수 있습니다.",
  },
  {
    q: "주 15시간이 안 되는 주가 있으면 어떻게 되나요?",
    a: "4주 단위로 평균을 내어 주 15시간 이상 여부를 판단합니다. 특정 주만 15시간 미만이어도 4주 평균이 15시간 이상이면 주휴수당이 발생합니다.",
  },
  {
    q: "주휴수당을 받지 못했을 때 어떻게 해야 하나요?",
    a: "고용노동부 고객상담센터(1350) 또는 가까운 고용노동부 지청에 진정을 제기할 수 있습니다. 임금 체불로 처리되며, 사업주는 3년 이하 징역 또는 3천만원 이하 벌금에 처할 수 있습니다.",
  },
];

export default function WeeklyHolidayPayGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/weekly-holiday-pay" className="text-blue-600 text-sm hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            주휴수당 계산 방법 완벽 가이드 (2026년)
          </h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">주휴수당이란?</h2>
          <p className="text-gray-700 leading-relaxed">
            주휴수당은 1주일 동안 소정 근로일을 개근한 근로자에게 유급 휴일 하루치 임금을 추가로 지급하는 제도입니다.
            근로기준법 제55조에 따라 사업주는 반드시 지급해야 하며, 위반 시 형사처벌 대상이 됩니다.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">계산 공식</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800 space-y-1">
            <p>주휴수당 = (주간 소정근로시간 ÷ 40) × 8시간 × 시급</p>
            <p className="text-gray-500 text-xs mt-2">※ 주 40시간 이상 근무 시 8시간분 상한 적용</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">근무시간별 예시</h2>
          <p className="text-sm text-gray-500">시급 10,030원 기준 (2025년 최저시급)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">주간 근무</th>
                  <th className="text-right py-2 text-gray-600 font-medium">주휴수당</th>
                  <th className="text-right py-2 text-gray-600 font-medium">월 총 임금</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { hours: 15, holiday: 30090, total: 717797 },
                  { hours: 20, holiday: 40120, total: 911851 },
                  { hours: 30, holiday: 60180, total: 1368228 },
                  { hours: 40, holiday: 80240, total: 1743370 },
                ].map((row) => (
                  <tr key={row.hours}>
                    <td className="py-2 font-medium">{row.hours}시간</td>
                    <td className="text-right">{row.holiday.toLocaleString()}원</td>
                    <td className="text-right text-blue-600 font-semibold">{row.total.toLocaleString()}원</td>
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
          <Link
            href="/weekly-holiday-pay"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            주휴수당 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
