import type { Metadata } from "next";
import YearEndTaxCalculator from "@/components/calculators/YearEndTaxCalculator";

export const metadata: Metadata = {
  title: "연말정산 계산기 2026 — 환급액 간편 추정",
  description:
    "총급여, 4대보험, 카드 사용액, 의료비 등을 입력하면 결정세액과 환급액 또는 추납액을 추정합니다. 소득세법 기준 간편 계산.",
};

export default function YearEndTaxPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">연말정산 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">환급액 · 추납액 · 세액공제 추정</p>
        <YearEndTaxCalculator />
      </div>
    </main>
  );
}
