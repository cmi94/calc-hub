import type { Metadata } from "next";
import LottoCalculator from "@/components/calculators/LottoCalculator";

export const metadata: Metadata = {
  title: "로또 번호 생성기 — 고정·제외 번호 설정",
  description:
    "로또 번호를 최대 10게임 자동 생성합니다. 고정 번호와 제외 번호를 설정할 수 있습니다. 재미용 번호 생성기.",
};

export default function LottoPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">로또 번호 생성기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">고정·제외 번호 설정 · 최대 10게임 생성</p>
        <LottoCalculator />
      </div>
    </main>
  );
}
