import type { Metadata } from "next";
import BmiCalculator from "@/components/calculators/BmiCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "BMI 계산기 2026 — 체질량지수·비만도 계산",
  description:
    "키와 몸무게를 입력하면 BMI 지수, 비만도(저체중·정상·과체중·비만), 적정 체중 범위를 계산합니다. 대한비만학회 아시아-태평양 기준.",
};

export default function BmiPage() {
  const calc = calculators.find((c) => c.id === "bmi")!;
  return (
    <CalcPageLayout calc={calc}>
      <BmiCalculator />
    </CalcPageLayout>
  );
}
