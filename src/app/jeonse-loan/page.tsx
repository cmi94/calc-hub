import type { Metadata } from "next";
import JeonseLoanCalculator from "@/components/calculators/JeonseLoanCalculator";

export const metadata: Metadata = {
  title: "전세대출 이자 계산기 2026 — 월 이자·총 이자 자동 계산",
  description: "전세대출 금액·금리·기간을 입력하면 월 이자와 총 이자 부담액을 자동 계산합니다. 이자만납입 방식 기준.",
};

export default function JeonseLoanPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">전세대출 이자 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">이자만납입(만기 일시상환) 방식 기준</p>
        <JeonseLoanCalculator />
      </div>
    </main>
  );
}
