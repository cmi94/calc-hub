import type { Metadata } from "next";
import TarotCalculator from "@/components/calculators/TarotCalculator";

export const metadata: Metadata = {
  title: "오늘의 타로 2026 — 오늘 타로 카드가 전하는 메시지",
  description: "오늘의 타로 카드를 뽑아보세요. 1장 카드 또는 과거·현재·미래 3장 스프레드로 오늘의 메시지를 확인할 수 있습니다.",
  alternates: { canonical: "https://dagyesan.com/tarot-daily" },
};

export default function TarotDailyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">오늘의 타로</h1>
        <p className="text-sm text-gray-500 text-center mb-8">타로 카드가 전하는 오늘의 메시지</p>
        <TarotCalculator />
      </div>
    </main>
  );
}
