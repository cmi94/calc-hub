import type { Metadata } from "next";
import NamingScoreCalculator from "@/components/calculators/NamingScoreCalculator";

export const metadata: Metadata = {
  title: "작명 점수 계산기 — 내 이름의 획수 점수는?",
  description: "성과 이름의 획수를 계산하여 원격·형격·이격·정격 4격 수리로 작명 점수를 분석해드립니다. 내 이름이 좋은 이름인지 확인해보세요.",
  alternates: { canonical: "https://dagyesan.com/naming-score" },
};

export default function NamingScorePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">작명 점수 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">내 이름의 획수 수리로 보는 작명 점수</p>
        <NamingScoreCalculator />
      </div>
    </main>
  );
}
