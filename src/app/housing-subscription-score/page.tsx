import type { Metadata } from "next";
import HousingSubscriptionScoreCalculator from "@/components/calculators/HousingSubscriptionScoreCalculator";

export const metadata: Metadata = {
  title: "청약 가점 계산기 2026 — 무주택·부양가족·청약통장 자동 계산",
  description:
    "무주택기간, 부양가족 수, 청약통장 가입기간을 입력하면 청약 가점을 자동 계산합니다. 최대 84점 기준.",
};

export default function HousingSubscriptionScorePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">청약 가점 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">주택공급에 관한 규칙 제28조 기준 · 최대 84점</p>
        <HousingSubscriptionScoreCalculator />
      </div>
    </main>
  );
}
