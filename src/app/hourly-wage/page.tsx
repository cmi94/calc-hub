import type { Metadata } from "next";
import HourlyWageCalculator from "@/components/calculators/HourlyWageCalculator";

export const metadata: Metadata = {
  title: "시급 계산기 2026 — 일급·주급·월급·연봉 환산",
  description:
    "시급과 주간 근로시간을 입력하면 일급, 주급, 월급, 연봉을 자동 계산합니다. 2026년 최저시급 10,320원 기준 주휴수당 포함.",
};

export default function HourlyWagePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">시급 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">2026 최저시급 10,320원 · 주휴수당 포함</p>
        <HourlyWageCalculator />
      </div>
    </main>
  );
}
