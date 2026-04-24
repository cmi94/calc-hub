import type { Metadata } from "next";
import YearEndTaxCalculator from "@/components/calculators/YearEndTaxCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "연말정산 계산기 2026 — 환급액 간편 추정",
  description:
    "총급여, 4대보험, 카드 사용액, 의료비 등을 입력하면 결정세액과 환급액 또는 추납액을 추정합니다. 소득세법 기준 간편 계산.",
};

export default function YearEndTaxPage() {
  const calc = calculators.find((c) => c.id === "year-end-tax")!;
  return (
    <CalcPageLayout calc={calc}>
      <YearEndTaxCalculator />
    </CalcPageLayout>
  );
}
