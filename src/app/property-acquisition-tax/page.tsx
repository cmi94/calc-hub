import type { Metadata } from "next";
import PropertyAcquisitionTaxCalculator from "@/components/calculators/PropertyAcquisitionTaxCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "부동산 취득세 계산기 2026 — 주택수·조정지역별 세금 자동 계산",
  description:
    "주택 취득가액, 주택수, 조정대상지역 여부를 입력하면 취득세·지방교육세·농어촌특별세를 자동 계산합니다. 지방세법 제11조 기준.",
};

export default function PropertyAcquisitionTaxPage() {
  const calc = calculators.find((c) => c.id === "property-acquisition-tax")!;
  return (
    <CalcPageLayout calc={calc}>
      <PropertyAcquisitionTaxCalculator />
    </CalcPageLayout>
  );
}
