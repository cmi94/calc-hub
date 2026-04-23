import type { Metadata } from "next";
import ElectricityBillCalculator from "@/components/calculators/ElectricityBillCalculator";

export const metadata: Metadata = {
  title: "전기요금 계산기 2026 — 누진세 포함 전기세 계산",
  description:
    "월 전기 사용량을 입력하면 기본요금, 전력량요금, 부가세, 전력산업기반기금 포함 전기요금을 계산합니다. 한전 주택용 누진제 기준.",
};

export default function ElectricityBillPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">전기요금 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">누진세 · 기본요금 · 부가세 포함</p>
        <ElectricityBillCalculator />
      </div>
    </main>
  );
}
