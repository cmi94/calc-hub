import type { Metadata } from "next";
import CarInstallmentCalculator from "@/components/calculators/CarInstallmentCalculator";

export const metadata: Metadata = {
  title: "자동차 할부 계산기 2026 — 월납입금·총이자 계산",
  description:
    "차량 가격, 선수금 비율, 연 금리, 할부 기간을 입력하면 월 납입금, 총 이자, 총 부담액을 계산합니다. 원리금균등상환 기준.",
};

export default function CarInstallmentPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">자동차 할부 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">월납입금 · 총이자 · 원리금균등상환</p>
        <CarInstallmentCalculator />
      </div>
    </main>
  );
}
