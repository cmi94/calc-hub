import type { Metadata } from "next";
import BmiCalculator from "@/components/calculators/BmiCalculator";

export const metadata: Metadata = {
  title: "BMI 계산기 2026 — 체질량지수·비만도 계산",
  description:
    "키와 몸무게를 입력하면 BMI 지수, 비만도(저체중·정상·과체중·비만), 적정 체중 범위를 계산합니다. 대한비만학회 아시아-태평양 기준.",
};

export default function BmiPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">BMI 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">체질량지수 · 비만도 · 적정 체중</p>
        <BmiCalculator />
      </div>
    </main>
  );
}
