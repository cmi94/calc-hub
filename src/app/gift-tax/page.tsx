import type { Metadata } from "next";
import GiftTaxCalculator from "@/components/calculators/GiftTaxCalculator";

export const metadata: Metadata = {
  title: "증여세 계산기 2026 — 관계별 공제·누진세율 자동 계산",
  description:
    "증여금액과 증여자와의 관계를 선택하면 증여세를 자동 계산합니다. 배우자·직계존비속·기타 친족별 공제 적용. 상속세 및 증여세법 기준.",
};

export default function GiftTaxPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">증여세 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">상속세 및 증여세법 기준 · 관계별 공제 적용</p>
        <GiftTaxCalculator />
      </div>
    </main>
  );
}
