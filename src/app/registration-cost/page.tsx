import type { Metadata } from "next";
import RegistrationCostCalculator from "@/components/calculators/RegistrationCostCalculator";

export const metadata: Metadata = {
  title: "등기비용 계산기 2026 — 소유권이전 등기 비용 계산",
  description:
    "취득가액을 입력하면 등록면허세, 지방교육세, 국민주택채권 매입액, 채권 할인 부담금, 등기신청 수수료를 자동 계산합니다. 지방세법 제23조·제28조 기준.",
};

export default function RegistrationCostPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">등기비용 계산기</h1>
        <p className="text-sm text-gray-500 text-center mb-8">소유권이전 등기 · 지방세법 제23조·제28조 기준</p>
        <RegistrationCostCalculator />
      </div>
    </main>
  );
}
