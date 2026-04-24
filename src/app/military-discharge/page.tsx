import type { Metadata } from "next";
import MilitaryDischargeCalculator from "@/components/calculators/MilitaryDischargeCalculator";

export const metadata: Metadata = {
  title: "전역일 계산기 2026 — 병종별 전역일·복무 진행률 계산",
  description:
    "입대일과 병종(육군·해군·공군·사회복무요원 등)을 입력하면 전역일, 남은 일수, 복무 진행률을 계산합니다. 병역법 제19조 2026년 기준.",
};

export default function MilitaryDischargePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">전역일 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">병역법 제19조 기준 · 2026년 복무기간</p>
        <MilitaryDischargeCalculator />
      </div>
    </main>
  );
}
