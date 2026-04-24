import type { Metadata } from "next";
import MbtiCompatibilityCalculator from "@/components/calculators/MbtiCompatibilityCalculator";

export const metadata: Metadata = {
  title: "MBTI 궁합 계산기 2026 — 우리 MBTI 궁합은?",
  description: "두 MBTI 유형의 궁합 점수와 관계 분석을 확인해보세요. INFP와 ENFJ 등 16가지 유형 조합별 궁합을 무료로 확인할 수 있습니다.",
  alternates: { canonical: "https://dagyesan.com/mbti-compatibility" },
};

export default function MbtiCompatibilityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">MBTI 궁합 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">두 MBTI 유형의 궁합 점수와 관계 유형 분석</p>
        <MbtiCompatibilityCalculator />
      </div>
    </main>
  );
}
