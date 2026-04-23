import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "연말정산 완벽 가이드 2026 — 공제 항목·환급 방법",
  description:
    "연말정산 근로소득공제, 인적공제, 세액공제 항목과 절세 방법을 안내합니다. 소득세법 기준.",
};

export default function YearEndTaxGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/year-end-tax" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">연말정산 완벽 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">소득세법 제47조·제50조·제55조·제59조 기준</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">연말정산 계산 흐름</h2>
          <div className="space-y-2 text-sm">
            {[
              { step: "①", label: "총급여", desc: "연간 급여·상여 합계" },
              { step: "②", label: "근로소득공제", desc: "소득 구간별 공제 (최대 2,000만원)" },
              { step: "③", label: "근로소득금액", desc: "① - ②" },
              { step: "④", label: "종합소득공제", desc: "인적공제·4대보험·신용카드 등" },
              { step: "⑤", label: "과세표준", desc: "③ - ④" },
              { step: "⑥", label: "산출세액", desc: "⑤에 누진세율 적용" },
              { step: "⑦", label: "세액공제", desc: "근로소득·자녀·의료비·교육비·기부금 등" },
              { step: "⑧", label: "결정세액", desc: "⑥ - ⑦" },
              { step: "⑨", label: "환급 또는 추납", desc: "기납부세액 - ⑧ (양수=환급, 음수=추납)" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold w-6 flex-shrink-0">{item.step}</span>
                <span className="font-medium w-28 flex-shrink-0">{item.label}</span>
                <span className="text-gray-500">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">주요 소득공제 항목</h2>
          <div className="divide-y divide-gray-100 text-sm">
            {[
              { label: "기본공제 (1인당)", amount: "150만원" },
              { label: "국민연금", amount: "납부액 전액" },
              { label: "건강보험·고용보험", amount: "납부액 전액" },
              { label: "신용카드 (총급여 25% 초과분)", amount: "15% 공제, 상한 300만" },
              { label: "체크카드·현금영수증 (초과분)", amount: "30% 공제" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5">
                <span className="text-gray-700">{row.label}</span>
                <span className="font-semibold text-green-600">{row.amount}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">주요 세액공제 항목</h2>
          <div className="divide-y divide-gray-100 text-sm">
            {[
              { label: "근로소득세액공제", amount: "산출세액 55%~30%, 최대 74만" },
              { label: "자녀세액공제", amount: "1명 15만 / 2명 30만 / 추가 30만" },
              { label: "의료비 (총급여 3% 초과분)", amount: "지출액 × 15%" },
              { label: "교육비", amount: "지출액 × 15%" },
              { label: "기부금", amount: "1천만 이하 15%, 초과 30%" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5">
                <span className="text-gray-700">{row.label}</span>
                <span className="font-semibold text-green-600">{row.amount}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">연말정산 절세 팁</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside leading-relaxed">
            <li>신용카드보다 체크카드·현금영수증 활용 (공제율 30% vs 15%)</li>
            <li>IRP·연금저축 납입 시 세액공제 최대 900만원 (세율에 따라 16.5%)</li>
            <li>의료비는 가족 중 가장 소득이 낮은 사람 명의로 몰기</li>
            <li>기부금 영수증 꼼꼼히 챙기기</li>
            <li>홈택스 '간소화서비스'로 1월 15일 이후 자료 수집</li>
          </ul>
        </section>

        <div className="text-center">
          <Link href="/year-end-tax" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            연말정산 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
