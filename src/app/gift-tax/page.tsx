import type { Metadata } from "next";
import GiftTaxCalculator from "@/components/calculators/GiftTaxCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "증여세 계산기 2026 — 관계별 공제·누진세율 자동 계산",
  description:
    "증여금액과 증여자와의 관계를 선택하면 증여세를 자동 계산합니다. 배우자·직계존비속·기타 친족별 공제 적용. 상속세 및 증여세법 기준.",
};

export default function GiftTaxPage() {
  const calc = calculators.find((c) => c.id === "gift-tax")!;
  return (
    <CalcPageLayout calc={calc}>
      <GiftTaxCalculator />
    </CalcPageLayout>
  );
}
