import type { Metadata } from "next";
import TojeongCalculator from "@/components/calculators/TojeongCalculator";

export const metadata: Metadata = {
  title: "토정비결 2026 — 나의 2026년 운세",
  description: "생년월일을 입력하여 2026년 토정비결을 무료로 확인해보세요. 전체운과 1월~12월 월별 운세를 상세하게 풀이해드립니다.",
  alternates: { canonical: "https://dagyesan.com/tojeong" },
};

export default function TojeongPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">토정비결 2026</h1>
        <p className="text-sm text-gray-500 text-center mb-8">나의 2026년 월별 운세 풀이</p>
        <TojeongCalculator />
      </div>
    </main>
  );
}
