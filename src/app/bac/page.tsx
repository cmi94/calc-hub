import type { Metadata } from "next";
import BacCalculator from "@/components/calculators/BacCalculator";

export const metadata: Metadata = {
  title: "음주측정 계산기 2026 — 혈중알코올농도(BAC) 계산",
  description:
    "성별·체중·음주량·경과 시간을 입력하면 혈중알코올농도(BAC)를 추정합니다. Widmark 공식 기반. 도로교통법 단속기준(0.03%) 안내.",
};

export default function BacPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">음주측정 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">혈중알코올농도(BAC) 추정 · 도로교통법 제44조 기준</p>
        <BacCalculator />
      </div>
    </main>
  );
}
