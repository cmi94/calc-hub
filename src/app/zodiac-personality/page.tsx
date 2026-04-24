import type { Metadata } from "next";
import ZodiacPersonalityCalculator from "@/components/calculators/ZodiacPersonalityCalculator";

export const metadata: Metadata = {
  title: "별자리 성격 분석 — 별자리로 보는 나의 성격",
  description: "생월일로 별자리를 계산하고 별자리별 성격 특성, 강점과 약점, 잘 맞는 별자리, 직업 조언을 상세하게 분석해드립니다.",
  alternates: { canonical: "https://dagyesan.com/zodiac-personality" },
};

export default function ZodiacPersonalityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">별자리 성격 분석</h1>
        <p className="text-sm text-gray-500 text-center mb-8">별자리로 보는 나의 성격과 특성</p>
        <ZodiacPersonalityCalculator />
      </div>
    </main>
  );
}
