import type { Metadata } from "next";
import CompatibilityCalculator from "@/components/calculators/CompatibilityCalculator";

export const metadata: Metadata = {
  title: "이름 궁합 계산기 — 두 이름으로 보는 재미 궁합",
  description:
    "두 사람의 이름을 입력하면 한글 획수 기반의 재미 궁합 점수를 계산합니다. 이름 궁합, 커플 궁합, 친구 궁합까지 확인해보세요. 과학적 근거 없는 재미용 콘텐츠입니다.",
  alternates: {
    canonical: "/name-compatibility",
  },
};

export default function NameCompatibilityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">이름 궁합 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">이름으로 보는 재미 궁합</p>
        <CompatibilityCalculator />
      </div>
    </main>
  );
}
