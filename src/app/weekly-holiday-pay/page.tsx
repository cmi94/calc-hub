import type { Metadata } from "next";
import WeeklyHolidayPayCalculator from "@/components/calculators/WeeklyHolidayPayCalculator";

export const metadata: Metadata = {
  title: "주휴수당 계산기 2026 — 시급·주간 근무시간으로 간단 계산",
  description:
    "시급과 주간 근무시간을 입력하면 주휴수당과 월 총 임금을 자동 계산합니다. 근로기준법 제55조 기준.",
};

export default function WeeklyHolidayPayPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">주휴수당 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">근로기준법 제55조 기준</p>
        <WeeklyHolidayPayCalculator />
      </div>
    </main>
  );
}
