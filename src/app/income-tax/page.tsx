import type { Metadata } from "next";
import IncomeTaxCalculator from "@/components/calculators/IncomeTaxCalculator";

export const metadata: Metadata = {
  title: "종합소득세 계산기 2026 — 프리랜서·사업소득 간편 계산",
  description: "연 소득과 경비율을 입력하면 종합소득세·지방소득세를 자동 계산합니다. 단순경비율·기준경비율·실제 경비 선택 가능.",
};

export default function IncomeTaxPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">종합소득세 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">프리랜서·사업소득자 간편 계산 · 2026년 기준</p>
        <IncomeTaxCalculator />
      </div>
    </main>
  );
}
