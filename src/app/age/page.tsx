import type { Metadata } from "next";
import AgeCalculator from "@/components/calculators/AgeCalculator";

export const metadata: Metadata = {
  title: "나이 계산기 2026 — 만나이·한국나이·다음 생일까지",
  description:
    "생년월일을 입력하면 만나이, 한국 나이(세는나이), 연나이, 다음 생일까지 남은 일수를 계산합니다. 2023년 만나이 통일법 기준.",
};

export default function AgePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">나이 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">만나이 · 한국 나이 · 다음 생일까지</p>
        <AgeCalculator />
      </div>
    </main>
  );
}
