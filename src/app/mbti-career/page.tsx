import type { Metadata } from "next";
import MbtiCareerCalculator from "@/components/calculators/MbtiCareerCalculator";

export const metadata: Metadata = {
  title: "MBTI 직업 궁합 — 내 MBTI에 맞는 직업은?",
  description: "16가지 MBTI 유형별 추천 직업과 비추천 직업, 같은 유형의 유명인, 업무 스타일과 강점을 확인해보세요.",
  alternates: { canonical: "https://dagyesan.com/mbti-career" },
};

export default function MbtiCareerPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">MBTI 직업 궁합</h1>
        <p className="text-sm text-gray-500 text-center mb-8">내 MBTI에 맞는 직업과 업무 스타일 분석</p>
        <MbtiCareerCalculator />
      </div>
    </main>
  );
}
