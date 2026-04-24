import type { Metadata } from "next";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 2026 — 4대보험·세금 공제 후 월급",
  description:
    "2026년 최신 기준으로 연봉 입력 시 국민연금·건강보험·고용보험·근로소득세를 자동 계산합니다. 월 실수령액과 연간 실수령액을 바로 확인하세요.",
};

export default function SalaryPage() {
  const calc = calculators.find((c) => c.id === "salary")!;
  return (
    <CalcPageLayout calc={calc}>
      <SalaryCalculator />
    </CalcPageLayout>
  );
}
