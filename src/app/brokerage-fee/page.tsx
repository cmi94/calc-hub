import type { Metadata } from "next";
import BrokerageFeeCalculator from "@/components/calculators/BrokerageFeeCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "부동산 중개수수료 계산기 2026 — 매매·전세·월세 법정 상한",
  description:
    "매매가·전세금·보증금과 월세를 입력하면 법정 상한 중개수수료를 자동 계산합니다. 공인중개사법 시행규칙 별표 기준.",
};

export default function BrokerageFee() {
  const calc = calculators.find((c) => c.id === "brokerage-fee")!;
  return (
    <CalcPageLayout calc={calc}>
      <BrokerageFeeCalculator />
    </CalcPageLayout>
  );
}
