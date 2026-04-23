import type { Metadata } from "next";
import UnemploymentBenefitCalculator from "@/components/calculators/UnemploymentBenefitCalculator";

export const metadata: Metadata = {
  title: "실업급여 계산기 2026 — 구직급여 수급액·수급일수",
  description:
    "퇴직 전 월 평균임금, 나이, 고용보험 피보험기간을 입력하면 구직급여 일액과 총 수급액을 계산합니다. 고용보험법 제50조 기준.",
};

export default function UnemploymentBenefitPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">실업급여 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">고용보험법 제50조 기준 · 2026년 최저임금 반영</p>
        <UnemploymentBenefitCalculator />
      </div>
    </main>
  );
}
