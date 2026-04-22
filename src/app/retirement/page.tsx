import type { Metadata } from "next";
import SeveranceCalculator from "@/components/calculators/SeveranceCalculator";

export const metadata: Metadata = {
  title: "퇴직금 계산기 2026 — 입사일·퇴사일·급여로 간단 계산",
  description:
    "입사일, 퇴사일, 최근 3개월 급여를 입력하면 퇴직금을 자동 계산합니다. 근로자퇴직급여보장법 기준 평균임금 방식 적용.",
};

export default function RetirementPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">퇴직금 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">근로자퇴직급여보장법 기준</p>
        <SeveranceCalculator />
      </div>
    </main>
  );
}
