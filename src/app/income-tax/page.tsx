import type { Metadata } from "next";
import IncomeTaxCalculator from "@/components/calculators/IncomeTaxCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "종합소득세 계산기 2026 — 프리랜서·사업소득 간편 계산",
  description: "연 소득과 경비율을 입력하면 종합소득세·지방소득세를 자동 계산합니다. 단순경비율·기준경비율·실제 경비 선택 가능.",
};

export default function IncomeTaxPage() {
  const calc = calculators.find((c) => c.id === "income-tax")!;
  return (
    <CalcPageLayout calc={calc}>
      <IncomeTaxCalculator />
    </CalcPageLayout>
  );
}
