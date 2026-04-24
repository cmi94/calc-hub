import type { Metadata } from "next";
import CoupleAnniversaryCalculator from "@/components/calculators/CoupleAnniversaryCalculator";

export const metadata: Metadata = {
  title: "커플 기념일 계산기 2026 — 오늘 몇일째?",
  description: "사귀기 시작한 날짜를 입력하면 오늘까지 몇일째인지, 100일·200일·1주년 등 다가오는 기념일을 자동으로 계산해드립니다.",
  alternates: { canonical: "https://dagyesan.com/couple-anniversary" },
};

export default function CoupleAnniversaryPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">커플 기념일 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">오늘까지 몇일째? 다가오는 기념일 자동 계산</p>
        <CoupleAnniversaryCalculator />
      </div>
    </main>
  );
}
