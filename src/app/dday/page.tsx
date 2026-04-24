import type { Metadata } from "next";
import DdayCalculator from "@/components/calculators/DdayCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "D-day 계산기 2026 — 날짜 차이·기념일 계산",
  description:
    "두 날짜 사이의 일수, 주, 개월, 년 단위를 계산하고 D-day를 표시합니다. 기념일, 시험일, 여행일까지 남은 날을 확인하세요.",
};

export default function DdayPage() {
  const calc = calculators.find((c) => c.id === "dday")!;
  return (
    <CalcPageLayout calc={calc}>
      <DdayCalculator />
    </CalcPageLayout>
  );
}
