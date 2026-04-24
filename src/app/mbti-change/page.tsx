import type { Metadata } from "next";
import MbtiChangeCalculator from "@/components/calculators/MbtiChangeCalculator";

export const metadata: Metadata = {
  title: "MBTI 변화 추적기 — 내 MBTI가 바뀌었을 때",
  description: "이전 MBTI와 새로운 MBTI를 선택하면 어떤 축이 바뀌었는지, 성격 변화가 의미하는 바를 분석해드립니다.",
  alternates: { canonical: "https://dagyesan.com/mbti-change" },
};

export default function MbtiChangePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">MBTI 변화 추적기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">내 MBTI가 바뀌었다면 어떤 변화일까?</p>
        <MbtiChangeCalculator />
      </div>
    </main>
  );
}
