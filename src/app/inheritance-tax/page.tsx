import type { Metadata } from "next";
import InheritanceTaxCalculator from "@/components/calculators/InheritanceTaxCalculator";

export const metadata: Metadata = {
  title: "상속세 계산기 2026 — 배우자·자녀 공제 포함",
  description:
    "상속 재산, 배우자 상속 여부, 자녀 수를 입력하면 일괄공제·배우자공제 후 상속세를 계산합니다. 상속세및증여세법 기준.",
};

export default function InheritanceTaxPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">상속세 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">일괄공제 · 배우자공제 · 누진세율</p>
        <InheritanceTaxCalculator />
      </div>
    </main>
  );
}
