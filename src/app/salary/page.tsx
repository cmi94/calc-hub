import type { Metadata } from "next";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 2026 — 4대보험·세금 공제 후 월급",
  description:
    "2026년 최신 기준으로 연봉 입력 시 국민연금·건강보험·고용보험·근로소득세를 자동 계산합니다. 월 실수령액과 연간 실수령액을 바로 확인하세요.",
};

export default function SalaryPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          연봉 실수령액 계산기
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          2026년 4대보험·근로소득세 기준
        </p>
        <SalaryCalculator />
      </div>
    </main>
  );
}
