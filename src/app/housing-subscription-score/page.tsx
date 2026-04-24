import type { Metadata } from "next";
import HousingSubscriptionScoreCalculator from "@/components/calculators/HousingSubscriptionScoreCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "청약 가점 계산기 2026 — 무주택·부양가족·청약통장 자동 계산",
  description:
    "무주택기간, 부양가족 수, 청약통장 가입기간을 입력하면 청약 가점을 자동 계산합니다. 최대 84점 기준.",
};

export default function HousingSubscriptionScorePage() {
  const calc = calculators.find((c) => c.id === "housing-subscription-score")!;
  return (
    <CalcPageLayout calc={calc}>
      <HousingSubscriptionScoreCalculator />
    </CalcPageLayout>
  );
}
