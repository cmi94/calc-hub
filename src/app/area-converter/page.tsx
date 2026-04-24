import type { Metadata } from "next";
import AreaConverterCalculator from "@/components/calculators/AreaConverterCalculator";

export const metadata: Metadata = {
  title: "평수 변환기 2026 — 평 ↔ ㎡ 즉시 환산",
  description:
    "평과 제곱미터(㎡)를 양방향으로 즉시 환산합니다. 제곱피트(sqft) 환산 및 자주 쓰는 평수 환산표 제공. 1평 = 3.30579㎡ 기준.",
};

export default function AreaConverterPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">평수 변환기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">평 ↔ ㎡ ↔ sqft 즉시 환산 · 1평 = 3.30579㎡</p>
        <AreaConverterCalculator />
      </div>
    </main>
  );
}
