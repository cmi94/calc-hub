import type { Metadata } from "next";
import SeveranceCalculator from "@/components/calculators/SeveranceCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "퇴직금 계산기 2026 — 입사일·퇴사일·급여로 간단 계산",
  description:
    "입사일, 퇴사일, 최근 3개월 급여를 입력하면 퇴직금을 자동 계산합니다. 근로자퇴직급여보장법 기준 평균임금 방식 적용.",
};

export default function RetirementPage() {
  const calc = calculators.find((c) => c.id === "severance")!;
  return (
    <CalcPageLayout calc={calc}>
      <SeveranceCalculator />
    </CalcPageLayout>
  );
}
