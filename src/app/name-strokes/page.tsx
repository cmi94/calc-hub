import type { Metadata } from "next";
import NameStrokesCalculator from "@/components/calculators/NameStrokesCalculator";

export const metadata: Metadata = {
  title: "이름 획수 풀이 계산기 — 이름에 담긴 운명의 수리",
  description: "성과 이름을 입력하면 한글 획수를 계산하고 원격·형격·이격·정격 4격 수리로 이름의 운명을 풀이해드립니다.",
  alternates: { canonical: "https://dagyesan.com/name-strokes" },
};

export default function NameStrokesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">이름 획수 풀이 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">이름에 담긴 운명의 수리 분석</p>
        <NameStrokesCalculator />
      </div>
    </main>
  );
}
