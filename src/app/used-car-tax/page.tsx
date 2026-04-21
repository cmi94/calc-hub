import type { Metadata } from "next";
import UsedCarTaxCalculator from "@/components/calculators/UsedCarTaxCalculator";

export const metadata: Metadata = {
  title: "중고차 취득세 계산기 2026 — 차종별 세금 자동 계산",
  description:
    "차량 가격과 차종을 입력하면 취득세·지방교육세를 자동 계산합니다. 전기차 감면 적용. 지방세법 기준.",
};

export default function UsedCarTaxPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">중고차 취득세 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">지방세법 기준 · 전기차 감면 적용</p>
        <UsedCarTaxCalculator />
      </div>
    </main>
  );
}
