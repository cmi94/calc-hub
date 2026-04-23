import type { Metadata } from "next";
import CarTaxCalculator from "@/components/calculators/CarTaxCalculator";

export const metadata: Metadata = {
  title: "자동차세 계산기 2026 — 배기량·차령별 자동차세",
  description:
    "배기량, 차종, 차령(연식)을 입력하면 자동차세와 지방교육세, 차령 경감액을 계산합니다. 2026년 지방세법 기준.",
};

export default function CarTaxPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">자동차세 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">배기량 · 차령 경감 · 지방교육세</p>
        <CarTaxCalculator />
      </div>
    </main>
  );
}
