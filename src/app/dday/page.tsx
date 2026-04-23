import type { Metadata } from "next";
import DdayCalculator from "@/components/calculators/DdayCalculator";

export const metadata: Metadata = {
  title: "D-day 계산기 2026 — 날짜 차이·기념일 계산",
  description:
    "두 날짜 사이의 일수, 주, 개월, 년 단위를 계산하고 D-day를 표시합니다. 기념일, 시험일, 여행일까지 남은 날을 확인하세요.",
};

export default function DdayPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">D-day 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">날짜 차이 · 기념일 · D-day</p>
        <DdayCalculator />
      </div>
    </main>
  );
}
