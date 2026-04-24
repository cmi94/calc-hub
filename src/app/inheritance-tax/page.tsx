import type { Metadata } from "next";
import InheritanceTaxCalculator from "@/components/calculators/InheritanceTaxCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "상속세 계산기 2026 — 배우자·자녀 공제 포함",
  description:
    "상속 재산, 배우자 상속 여부, 자녀 수를 입력하면 일괄공제·배우자공제 후 상속세를 계산합니다. 상속세및증여세법 기준.",
};

export default function InheritanceTaxPage() {
  const calc = calculators.find((c) => c.id === "inheritance-tax")!;
  return (
    <CalcPageLayout calc={calc}>
      <InheritanceTaxCalculator />
    </CalcPageLayout>
  );
}
