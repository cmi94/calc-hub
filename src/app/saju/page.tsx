import type { Metadata } from "next";
import SajuCalculator from "@/components/calculators/SajuCalculator";

export const metadata: Metadata = {
  title: "사주 오행 분석기 2026 — 나의 사주와 오행 기운",
  description: "생년월일시를 입력하여 사주 4주(년주·월주·일주·시주)와 오행(목화토금수) 분포를 분석해드립니다. 2026년 기준 무료 사주 풀이.",
  alternates: { canonical: "https://dagyesan.com/saju" },
};

export default function SajuPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">사주 오행 분석기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">생년월일시로 보는 나의 사주와 오행 기운</p>
        <SajuCalculator />
      </div>
    </main>
  );
}
