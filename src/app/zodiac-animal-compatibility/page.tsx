import type { Metadata } from "next";
import AnimalCompatCalculator from "@/components/calculators/AnimalCompatCalculator";

export const metadata: Metadata = {
  title: "띠별 궁합 계산기 — 우리 띠 궁합은?",
  description: "출생연도를 입력하면 나의 띠와 상대방 띠를 계산하고 삼합·육합·상충 등 띠별 전통 궁합을 풀이해드립니다.",
  alternates: { canonical: "https://dagyesan.com/zodiac-animal-compatibility" },
};

export default function ZodiacAnimalCompatibilityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">띠별 궁합 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">삼합·육합·상충으로 보는 전통 띠 궁합</p>
        <AnimalCompatCalculator />
      </div>
    </main>
  );
}
