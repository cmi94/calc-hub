import type { Metadata } from "next";
import HourlyWageCalculator from "@/components/calculators/HourlyWageCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "시급 계산기 2026 — 일급·주급·월급·연봉 환산",
  description:
    "시급과 주간 근로시간을 입력하면 일급, 주급, 월급, 연봉을 자동 계산합니다. 2026년 최저시급 10,320원 기준 주휴수당 포함.",
};

export default function HourlyWagePage() {
  const calc = calculators.find((c) => c.id === "hourly-wage")!;
  return (
    <CalcPageLayout calc={calc}>
      <HourlyWageCalculator />
    </CalcPageLayout>
  );
}
