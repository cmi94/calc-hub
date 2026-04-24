import type { Metadata } from "next";
import CarTaxCalculator from "@/components/calculators/CarTaxCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "자동차세 계산기 2026 — 배기량·차령별 자동차세",
  description:
    "배기량, 차종, 차령(연식)을 입력하면 자동차세와 지방교육세, 차령 경감액을 계산합니다. 2026년 지방세법 기준.",
};

export default function CarTaxPage() {
  const calc = calculators.find((c) => c.id === "car-tax")!;
  return (
    <CalcPageLayout calc={calc}>
      <CarTaxCalculator />
    </CalcPageLayout>
  );
}
