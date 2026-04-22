import type { Metadata } from "next";
import PropertyAcquisitionTaxCalculator from "@/components/calculators/PropertyAcquisitionTaxCalculator";

export const metadata: Metadata = {
  title: "부동산 취득세 계산기 2026 — 주택수·조정지역별 세금 자동 계산",
  description:
    "주택 취득가액, 주택수, 조정대상지역 여부를 입력하면 취득세·지방교육세·농어촌특별세를 자동 계산합니다. 지방세법 제11조 기준.",
};

export default function PropertyAcquisitionTaxPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">부동산 취득세 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">지방세법 제11조 기준 · 주택수·조정지역 반영</p>
        <PropertyAcquisitionTaxCalculator />
      </div>
    </main>
  );
}
