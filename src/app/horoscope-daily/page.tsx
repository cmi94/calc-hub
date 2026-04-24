import type { Metadata } from "next";
import HoroscopeCalculator from "@/components/calculators/HoroscopeCalculator";

export const metadata: Metadata = {
  title: "오늘의 별자리 운세 2026 — 오늘 나의 별자리 운세",
  description: "12개 별자리의 오늘 운세를 확인해보세요. 전체운·애정운·직업운·재물운·건강운을 별자리별로 무료 제공합니다.",
  alternates: { canonical: "https://dagyesan.com/horoscope-daily" },
};

export default function HoroscopeDailyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">오늘의 별자리 운세</h1>
        <p className="text-sm text-gray-500 text-center mb-8">2026년 나의 별자리 오늘 운세</p>
        <HoroscopeCalculator />
      </div>
    </main>
  );
}
