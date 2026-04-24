"use client";

import { useState } from "react";
import { calculateWeeklyHolidayPay, MIN_HOURLY_WAGE_2026, type WeeklyHolidayPayResult } from "@/lib/calculators/weeklyHolidayPay";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

export default function WeeklyHolidayPayCalculator() {
  const [hourlyWage, setHourlyWage] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [result, setResult] = useState<WeeklyHolidayPayResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const wage = Number(hourlyWage.replace(/,/g, ""));
    const hours = Number(weeklyHours);

    if (!wage || wage < MIN_HOURLY_WAGE_2026) {
      setError(`시급은 2025년 최저시급 ${MIN_HOURLY_WAGE_2026.toLocaleString()}원 이상이어야 합니다.`);
      return;
    }
    if (!hours || hours <= 0 || hours > 168) {
      setError("주간 근무시간을 1~168 사이로 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateWeeklyHolidayPay({ hourlyWage: wage, weeklyHours: hours }));
  }

  function handleWageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setHourlyWage(raw ? Number(raw).toLocaleString("ko-KR") : "");
    setError("");
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">시급</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={hourlyWage}
              onChange={handleWageChange}
              placeholder={`최저시급 ${MIN_HOURLY_WAGE_2026.toLocaleString()}`}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">주간 소정근로시간</label>
          <div className="relative">
            <input
              type="number"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
              placeholder="예: 40"
              min="1"
              max="168"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-14 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">시간</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">주 15시간 미만은 주휴수당이 발생하지 않습니다.</p>
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
          {!result.isEligible ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="font-medium text-yellow-800">주휴수당 미발생</p>
              <p className="text-sm text-yellow-700 mt-1">
                주 15시간 이상 근무 시 주휴수당이 발생합니다. (현재 {result.weeklyHours}시간)
              </p>
            </div>
          ) : (
            <>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-blue-600 font-medium mb-1">주당 주휴수당</p>
                <p className="text-3xl font-bold text-blue-700">{formatKRW(result.holidayPayPerWeek)}</p>
              </div>
              <div className="divide-y divide-gray-100 text-sm">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">시급</span>
                  <span>{formatKRW(result.hourlyWage)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">주간 근무시간</span>
                  <span>{result.weeklyHours}시간</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">월 주휴수당</span>
                  <span>{formatKRW(result.holidayPayPerMonth)}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>월 총 임금 <span className="font-normal text-gray-400">(근로분 + 주휴)</span></span>
                  <span className="text-blue-600">{formatKRW(result.monthlyTotalWage)}</span>
                </div>
              </div>
            </>
          )}
          <p className="text-xs text-gray-400">
            근로기준법 제55조 기준. 개근 조건 충족 시 지급됩니다.
          </p>
        </div>
      )}
    </div>
  );
}
