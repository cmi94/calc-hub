import type { Metadata } from "next";
import ZodiacCompatCalculator from "@/components/calculators/ZodiacCompatCalculator";

export const metadata: Metadata = {
  title: "별자리 궁합 계산기 2026 — 우리 별자리 궁합은?",
  description: "생년월일로 별자리를 계산하고 두 별자리의 궁합 점수와 분석을 확인해보세요. 12가지 별자리 조합별 무료 궁합 풀이.",
  alternates: { canonical: "https://dagyesan.com/zodiac-compatibility" },
};

export default function ZodiacCompatibilityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">별자리 궁합 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">생월일로 알아보는 별자리 궁합 점수</p>
        <ZodiacCompatCalculator />
      </div>
    </main>
  );
}
