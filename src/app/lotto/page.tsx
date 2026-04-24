import type { Metadata } from "next";
import LottoCalculator from "@/components/calculators/LottoCalculator";
import CalcPageLayout from "@/components/layout/CalcPageLayout";
import { calculators } from "@/content/calculators";

export const metadata: Metadata = {
  title: "로또 번호 생성기 — 고정·제외 번호 설정",
  description:
    "로또 번호를 최대 10게임 자동 생성합니다. 고정 번호와 제외 번호를 설정할 수 있습니다. 재미용 번호 생성기.",
};

export default function LottoPage() {
  const calc = calculators.find((c) => c.id === "lotto")!;
  return (
    <CalcPageLayout calc={calc}>
      <LottoCalculator />
    </CalcPageLayout>
  );
}
