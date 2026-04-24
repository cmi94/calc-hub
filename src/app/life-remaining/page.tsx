import type { Metadata } from "next";
import LifeRemainingCalculator from "@/components/calculators/LifeRemainingCalculator";

export const metadata: Metadata = {
  title: "인생 남은 시간 계산기 — 내게 남은 시간은?",
  description: "생년월일과 기대수명을 입력하면 남은 날·심장박동수·수면시간·식사 횟수 등 인생에 남은 시간을 다양한 관점으로 보여드립니다.",
  alternates: { canonical: "https://dagyesan.com/life-remaining" },
};

export default function LifeRemainingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">인생 남은 시간 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">내게 남은 날·시간·심장박동을 확인해보세요</p>
        <LifeRemainingCalculator />
      </div>
    </main>
  );
}
