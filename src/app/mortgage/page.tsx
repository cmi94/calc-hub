import type { Metadata } from "next";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "주택담보대출 이자 계산기 2026 — 월 상환액·총 이자 계산",
  description:
    "대출금액·금리·기간을 입력하면 원리금균등상환 기준 월 상환액, 총 이자, 연도별 상환 스케줄을 자동 계산합니다.",
};

export default function MortgagePage() {
  const calc = calculators.find((c) => c.id === "mortgage")!;
  return (
    <CalcPageLayout calc={calc}>
      <MortgageCalculator />
    </CalcPageLayout>
  );
}
