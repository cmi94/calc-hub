import type { Metadata } from "next";
import DailyFortuneCalculator from "@/components/calculators/DailyFortuneCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "오늘의 한마디 — 생년월일로 보는 오늘의 응원",
  description:
    "생년월일을 입력하면 오늘의 응원 메시지와 행운의 숫자, 색을 알려드립니다. 재미로 즐기는 가벼운 한마디.",
};

export default function DailyFortunePage() {
  const calc = calculators.find((c) => c.id === "daily-fortune")!;
  return (
    <CalcPageLayout calc={calc}>
      <DailyFortuneCalculator />
    </CalcPageLayout>
  );
}
