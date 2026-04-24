import type { Metadata } from "next";
import UnemploymentBenefitCalculator from "@/components/calculators/UnemploymentBenefitCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "실업급여 계산기 2026 — 구직급여 수급액·수급일수",
  description:
    "퇴직 전 월 평균임금, 나이, 고용보험 피보험기간을 입력하면 구직급여 일액과 총 수급액을 계산합니다. 고용보험법 제50조 기준.",
};

export default function UnemploymentBenefitPage() {
  const calc = calculators.find((c) => c.id === "unemployment-benefit")!;
  return (
    <CalcPageLayout calc={calc}>
      <UnemploymentBenefitCalculator />
    </CalcPageLayout>
  );
}
