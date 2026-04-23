import type { Metadata } from "next";
import CapitalGainsTaxCalculator from "@/components/calculators/CapitalGainsTaxCalculator";

export const metadata: Metadata = {
  title: "양도소득세 계산기 2026 — 주택 양도세 간편 계산",
  description:
    "양도가액, 취득가액, 보유·거주기간을 입력하면 양도소득세, 장기보유특별공제, 1세대 1주택 비과세 여부를 계산합니다. 소득세법 기준.",
};

export default function CapitalGainsTaxPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">양도소득세 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">1주택 비과세 · 장기보유공제 · 중과세율</p>
        <CapitalGainsTaxCalculator />
      </div>
    </main>
  );
}
