import type { Metadata } from "next";
import CapitalGainsTaxCalculator from "@/components/calculators/CapitalGainsTaxCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "양도소득세 계산기 2026 — 주택 양도세 간편 계산",
  description:
    "양도가액, 취득가액, 보유·거주기간을 입력하면 양도소득세, 장기보유특별공제, 1세대 1주택 비과세 여부를 계산합니다. 소득세법 기준.",
};

export default function CapitalGainsTaxPage() {
  const calc = calculators.find((c) => c.id === "capital-gains-tax")!;
  return (
    <CalcPageLayout calc={calc}>
      <CapitalGainsTaxCalculator />
    </CalcPageLayout>
  );
}
