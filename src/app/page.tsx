import type { Metadata } from "next";
import { calculators } from "@/content/calculators";
import HomeClient from "@/components/home/HomeClient";

export const metadata: Metadata = {
  title: "다계스탄 — 계산기 씬의 절대 체급",
  description:
    "연봉 실수령액, 퇴직금, 주휴수당, 취득세, 주담대, 전세대출, 종합소득세 등 한국인의 생활 계산기를 한곳에서. 2026년 최신 기준 무료 제공.",
};

export default function HomePage() {
  return <HomeClient calculators={calculators} />;
}
