import type { Metadata } from "next";
import WeeklyHolidayPayCalculator from "@/components/calculators/WeeklyHolidayPayCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "주휴수당 계산기 2026 — 시급·주간 근무시간으로 간단 계산",
  description:
    "시급과 주간 근무시간을 입력하면 주휴수당과 월 총 임금을 자동 계산합니다. 근로기준법 제55조 기준.",
};

export default function WeeklyHolidayPayPage() {
  const calc = calculators.find((c) => c.id === "weekly-holiday-pay")!;
  return (
    <CalcPageLayout calc={calc}>
      <WeeklyHolidayPayCalculator />
    </CalcPageLayout>
  );
}
