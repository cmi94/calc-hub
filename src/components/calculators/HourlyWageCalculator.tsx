"use client";

import { useState } from "react";
import { calculateHourlyWage, MIN_HOURLY_WAGE_2026, type HourlyWageResult } from "@/lib/calculators/hourlyWage";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

export default function HourlyWageCalculator() {
  const [hourlyWage, setHourlyWage] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("40");
  const [includeHolidayPay, setIncludeHolidayPay] = useState(true);
  const [result, setResult] = useState<HourlyWageResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const wage = Number(hourlyWage.replace(/,/g, ""));
    const hours = Number(weeklyHours);

    if (!wage || wage < 1) {
      setError("시급을 입력해주세요.");
      return;
    }
    if (!hours || hours < 1 || hours > 84) {
      setError("주간 근로시간을 1~84시간 사이로 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateHourlyWage({ hourlyWage: wage, weeklyHours: hours, includeHolidayPay }));
  }

  function handleWageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setHourlyWage(raw ? Number(raw).toLocaleString("ko-KR") : "");
    setResult(null);
    setError("");
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* 시급 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">시급</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={hourlyWage}
              onChange={handleWageChange}
              placeholder={`예: ${MIN_HOURLY_WAGE_2026.toLocaleString("ko-KR")} (2026 최저시급)`}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>

        {/* 주간 근로시간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">주간 소정근로시간</label>
          <div className="relative">
            <input
              type="number"
              value={weeklyHours}
              onChange={(e) => { setWeeklyHours(e.target.value); setResult(null); setError(""); }}
              min="1"
              max="84"
              step="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-14 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">시간</span>
          </div>
        </div>

        {/* 주휴수당 포함 */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">주휴수당 포함</p>
            <p className="text-xs text-gray-400 mt-0.5">주 15시간 이상 근무 시 적용</p>
          </div>
          <button
            onClick={() => { setIncludeHolidayPay(!includeHolidayPay); setResult(null); }}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              includeHolidayPay ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                includeHolidayPay ? "left-7" : "left-1"
              }`}
            />
          </button>
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
          {/* 최저임금 경고 */}
          {!result.isAboveMinWage && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
              입력한 시급이 2026년 최저시급({formatKRW(result.minWage)})보다 낮습니다.
            </div>
          )}

          {/* 월급 강조 */}
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">월급</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.monthlyWage)}</p>
          </div>

          {/* 항목별 */}
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">일급 <span className="text-xs text-gray-400">(8시간)</span></span>
              <span className="font-medium">{formatKRW(result.dailyWage)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">
                주급
                {result.holidayPayPerWeek > 0 && (
                  <span className="text-xs text-gray-400 ml-1">(주휴 {formatKRW(result.holidayPayPerWeek)} 포함)</span>
                )}
              </span>
              <span className="font-medium">{formatKRW(result.weeklyWage)}</span>
            </div>
            <div className="flex justify-between py-2.5 font-semibold">
              <span>월급</span>
              <span className="text-blue-600">{formatKRW(result.monthlyWage)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">연봉</span>
              <span className="font-medium">{formatKRW(result.annualWage)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            월급은 주급 × 4.345주 기준. 실제 수령액은 4대보험·소득세 공제 후 달라집니다.
          </p>
        </div>
      )}
    </div>
  );
}
