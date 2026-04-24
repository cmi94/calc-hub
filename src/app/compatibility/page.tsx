import type { Metadata } from "next";
import CompatibilityCalculator from "@/components/calculators/CompatibilityCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "궁합 계산기 — 이름으로 보는 재미 궁합",
  description:
    "두 사람의 이름을 입력하면 한글 획수 기반의 재미 궁합 점수를 계산합니다. 과학적 근거 없는 재미용 콘텐츠입니다.",
};

export default function CompatibilityPage() {
  const calc = calculators.find((c) => c.id === "compatibility")!;
  return (
    <CalcPageLayout calc={calc}>
      <CompatibilityCalculator />
    </CalcPageLayout>
  );
}
