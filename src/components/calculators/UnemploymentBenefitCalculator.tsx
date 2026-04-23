"use client";

import { useState } from "react";
import {
  calculateUnemploymentBenefit,
  DAILY_BENEFIT_MAX,
  DAILY_BENEFIT_MIN,
  type AgeGroup,
  type InsurancePeriod,
  type UnemploymentBenefitResult,
} from "@/lib/calculators/unemploymentBenefit";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: "under50", label: "50세 미만" },
  { value: "50above", label: "50세 이상 / 장애인" },
];

const INSURANCE_PERIODS: { value: InsurancePeriod; label: string }[] = [
  { value: "under1year", label: "1년 미만" },
  { value: "1to3", label: "1년 이상 ~ 3년 미만" },
  { value: "3to5", label: "3년 이상 ~ 5년 미만" },
  { value: "5to10", label: "5년 이상 ~ 10년 미만" },
  { value: "10above", label: "10년 이상" },
];

export default function UnemploymentBenefitCalculator() {
  const [monthlyWage, setMonthlyWage] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("under50");
  const [insurancePeriod, setInsurancePeriod] = useState<InsurancePeriod>("1to3");
  const [result, setResult] = useState<UnemploymentBenefitResult | null>(null);
  const [error, setError] = useState("");

  function handleWageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setMonthlyWage(raw ? Number(raw).toLocaleString("ko-KR") : "");
    setResult(null);
  }

  function handleCalculate() {
    const monthly = Number(monthlyWage.replace(/,/g, ""));
    if (!monthly || monthly < 100_000) {
      setError("퇴직 전 월 평균임금을 입력해주세요.");
      return;
    }
    // 일평균임금: 월 평균임금 × 3 / 91일 (3개월 기준)
    const averageDailyWage = Math.floor((monthly * 3) / 91);
    setError("");
    setResult(calculateUnemploymentBenefit({ averageDailyWage, ageGroup, insurancePeriod }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* 퇴직 전 월 평균임금 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">퇴직 전 월 평균임금</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={monthlyWage}
              onChange={handleWageChange}
              placeholder="예: 3,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">이직 전 3개월 평균 급여 입력</p>
        </div>

        {/* 나이 구분 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">나이</label>
          <div className="grid grid-cols-2 gap-2">
            {AGE_GROUPS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setAgeGroup(opt.value); setResult(null); }}
                className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  ageGroup === opt.value
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-700 hover:border-blue-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 피보험기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">고용보험 피보험기간</label>
          <select
            value={insurancePeriod}
            onChange={(e) => { setInsurancePeriod(e.target.value as InsurancePeriod); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {INSURANCE_PERIODS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">총 수급액</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.totalBenefit)}</p>
            <p className="text-sm text-blue-500 mt-1">{result.benefitDays}일간 수급</p>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">구직급여일액</span>
              <span className="font-medium">{formatKRW(result.dailyBenefit)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">소정급여일수</span>
              <span className="font-medium">{result.benefitDays}일</span>
            </div>
            <div className="flex justify-between py-2.5 font-semibold">
              <span>총 수급액</span>
              <span className="text-blue-600">{formatKRW(result.totalBenefit)}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 space-y-1">
            <p>일액 하한: {formatKRW(DAILY_BENEFIT_MIN)} / 상한: {formatKRW(DAILY_BENEFIT_MAX)}</p>
            <p>일평균임금은 퇴직 전 3개월(91일) 기준으로 환산됩니다.</p>
          </div>

          <p className="text-xs text-gray-400">
            고용보험법 제50조 기준. 실제 수급은 고용센터 수급자격 심사 후 결정됩니다.
          </p>
        </div>
      )}
    </div>
  );
}
