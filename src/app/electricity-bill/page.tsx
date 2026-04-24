import type { Metadata } from "next";
import ElectricityBillCalculator from "@/components/calculators/ElectricityBillCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "전기요금 계산기 2026 — 누진세 포함 전기세 계산",
  description:
    "월 전기 사용량을 입력하면 기본요금, 전력량요금, 부가세, 전력산업기반기금 포함 전기요금을 계산합니다. 한전 주택용 누진제 기준.",
};

export default function ElectricityBillPage() {
  const calc = calculators.find((c) => c.id === "electricity-bill")!;
  return (
    <CalcPageLayout calc={calc}>
      <ElectricityBillCalculator />
    </CalcPageLayout>
  );
}
