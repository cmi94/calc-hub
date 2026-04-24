import type { Metadata } from "next";
import FaceAgeCalculator from "@/components/calculators/FaceAgeCalculator";

export const metadata: Metadata = {
  title: "관상 얼굴 나이 계산기 — 나는 몇 살로 보일까?",
  description: "이름과 생년월일을 입력하면 관상으로 보이는 외형 나이, 매력 포인트, 개선 팁을 재미있게 분석해드립니다. 재미 목적 계산기입니다.",
  alternates: { canonical: "https://dagyesan.com/face-age" },
};

export default function FaceAgePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">관상 얼굴 나이 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">나는 몇 살로 보일까? (재미용)</p>
        <FaceAgeCalculator />
      </div>
    </main>
  );
}
