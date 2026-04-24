import type { Metadata } from "next";
import FuelEconomyCalculator from "@/components/calculators/FuelEconomyCalculator";

export const metadata: Metadata = {
  title: "연비 계산기 2026 — km/L·월 연료비 계산",
  description:
    "주행거리와 주유량을 입력하면 연비(km/L), 100km당 연료비, km당 연료비를 계산합니다. 월 주행거리 입력 시 월·연간 연료비도 계산.",
};

export default function FuelEconomyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">연비 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">km/L · 100km당 연료비 · 월 연료비</p>
        <FuelEconomyCalculator />
      </div>
    </main>
  );
}
