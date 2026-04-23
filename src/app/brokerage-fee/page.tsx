import type { Metadata } from "next";
import BrokerageFeeCalculator from "@/components/calculators/BrokerageFeeCalculator";

export const metadata: Metadata = {
  title: "부동산 중개수수료 계산기 2026 — 매매·전세·월세 법정 상한",
  description:
    "매매가·전세금·보증금과 월세를 입력하면 법정 상한 중개수수료를 자동 계산합니다. 공인중개사법 시행규칙 별표 기준.",
};

export default function BrokerageFee() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">부동산 중개수수료 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">공인중개사법 시행규칙 별표 기준 · 법정 상한</p>
        <BrokerageFeeCalculator />
      </div>
    </main>
  );
}
