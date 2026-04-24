import type { Metadata } from "next";
import MbtiBalanceCalculator from "@/components/calculators/MbtiBalanceCalculator";

export const metadata: Metadata = {
  title: "MBTI 밸런스 게임 — 당신의 MBTI 성향을 알아보세요",
  description: "20개의 밸런스 게임 질문으로 나의 MBTI 성향을 예측해보세요. A vs B 선택으로 E/I, S/N, T/F, J/P 4개 축을 분석합니다.",
  alternates: { canonical: "https://dagyesan.com/mbti-balance" },
};

export default function MbtiBalancePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">MBTI 밸런스 게임</h1>
        <p className="text-sm text-gray-500 text-center mb-8">당신의 MBTI 성향을 밸런스 게임으로 알아보세요</p>
        <MbtiBalanceCalculator />
      </div>
    </main>
  );
}
