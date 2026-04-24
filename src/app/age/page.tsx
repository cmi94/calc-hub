import type { Metadata } from "next";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "나이 계산기 2026 — 만나이·한국나이·다음 생일까지",
  description:
    "생년월일을 입력하면 만나이, 한국 나이(세는나이), 연나이, 다음 생일까지 남은 일수를 계산합니다. 2023년 만나이 통일법 기준.",
};

export default function AgePage() {
  const calc = calculators.find((c) => c.id === "age")!;
  return (
    <CalcPageLayout calc={calc}>
      <AgeCalculator />
    </CalcPageLayout>
  );
}
