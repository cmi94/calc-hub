import type { Metadata } from "next";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";

export const metadata: Metadata = {
  title: "주택담보대출 이자 계산기 2026 — 월 상환액·총 이자 계산",
  description:
    "대출금액·금리·기간을 입력하면 원리금균등상환 기준 월 상환액, 총 이자, 연도별 상환 스케줄을 자동 계산합니다.",
};

export default function MortgagePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">주택담보대출 이자 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">원리금균등상환 방식 기준</p>
        <MortgageCalculator />
      </div>
    </main>
  );
}
