import type { Metadata } from "next";
import LottoProbabilityCalculator from "@/components/calculators/LottoProbabilityCalculator";

export const metadata: Metadata = {
  title: "로또 확률 계산기 2026 — 등수별 당첨 확률 계산",
  description:
    "로또 6/45 등수별 당첨 확률을 계산합니다. 1등부터 5등까지 확률과 게임 수를 입력하면 당첨 가능성을 계산해드립니다.",
  alternates: { canonical: "https://dagyesan.com/lotto/probability" },
};

export default function LottoProbabilityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">로또 확률 계산기</h1>
        <p className="text-sm text-gray-500 mb-8">
          2026년 기준 · 로또 6/45 등수별 당첨 확률
        </p>
        <LottoProbabilityCalculator />
      </div>
    </main>
  );
}
