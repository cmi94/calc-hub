import type { Metadata } from "next";
import PastLifeCalculator from "@/components/calculators/PastLifeCalculator";

export const metadata: Metadata = {
  title: "전생 직업 계산기 — 나의 전생은?",
  description: "생년월일과 성별을 입력하면 나의 전생 직업, 살았던 시대와 나라, 전생의 특성을 재미있게 풀이해드립니다.",
  alternates: { canonical: "https://dagyesan.com/past-life" },
};

export default function PastLifePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">전생 직업 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">나의 전생은 어떤 직업이었을까?</p>
        <PastLifeCalculator />
      </div>
    </main>
  );
}
