import type { Metadata } from "next";
import RandomMenuCalculator from "@/components/calculators/RandomMenuCalculator";

export const metadata: Metadata = {
  title: "랜덤 메뉴 추천 — 오늘 뭐 먹지?",
  description:
    "한식, 중식, 일식, 양식, 분식 등 카테고리에서 오늘의 메뉴를 랜덤으로 추천합니다. 메뉴 고민 해결!",
};

export default function RandomMenuPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">랜덤 메뉴 추천</h1>
        <p className="text-sm text-gray-500 text-center mb-8">오늘 뭐 먹지? 고민 해결!</p>
        <RandomMenuCalculator />
      </div>
    </main>
  );
}
