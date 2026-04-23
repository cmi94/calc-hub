import type { Metadata } from "next";
import DailyFortuneCalculator from "@/components/calculators/DailyFortuneCalculator";

export const metadata: Metadata = {
  title: "오늘의 한마디 — 생년월일로 보는 오늘의 응원",
  description:
    "생년월일을 입력하면 오늘의 응원 메시지와 행운의 숫자, 색을 알려드립니다. 재미로 즐기는 가벼운 한마디.",
};

export default function DailyFortunePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">오늘의 한마디</h1>
        <p className="text-sm text-gray-500 text-center mb-8">재미로 보는 오늘의 응원 · 실제 운세와 무관</p>
        <DailyFortuneCalculator />
      </div>
    </main>
  );
}
