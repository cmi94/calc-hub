import type { Metadata } from "next";
import RandomMenuCalculator from "@/components/calculators/RandomMenuCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "랜덤 메뉴 추천 — 오늘 뭐 먹지?",
  description:
    "한식, 중식, 일식, 양식, 분식 등 카테고리에서 오늘의 메뉴를 랜덤으로 추천합니다. 메뉴 고민 해결!",
};

export default function RandomMenuPage() {
  const calc = calculators.find((c) => c.id === "random-menu")!;
  return (
    <CalcPageLayout calc={calc}>
      <RandomMenuCalculator />
    </CalcPageLayout>
  );
}
