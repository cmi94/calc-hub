import type { Metadata } from "next";
import DueDateCalculator from "@/components/calculators/DueDateCalculator";

export const metadata: Metadata = {
  title: "출산예정일 계산기 2026 — 임신 주수·출산일 계산",
  description:
    "마지막 생리 시작일(LMP)을 입력하면 출산예정일, 현재 임신 주수, 임신 분기를 계산합니다. Naegele's rule(LMP + 280일) 기준.",
};

export default function DueDatePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">출산예정일 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">LMP + 280일 (Naegele&apos;s rule) 기준</p>
        <DueDateCalculator />
      </div>
    </main>
  );
}
