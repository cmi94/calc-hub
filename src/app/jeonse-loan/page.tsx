import type { Metadata } from "next";
import JeonseLoanCalculator from "@/components/calculators/JeonseLoanCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "전세대출 이자 계산기 2026 — 월 이자·총 이자 자동 계산",
  description: "전세대출 금액·금리·기간을 입력하면 월 이자와 총 이자 부담액을 자동 계산합니다. 이자만납입 방식 기준.",
};

export default function JeonseLoanPage() {
  const calc = calculators.find((c) => c.id === "jeonse-loan")!;
  return (
    <CalcPageLayout calc={calc}>
      <JeonseLoanCalculator />
    </CalcPageLayout>
  );
}
