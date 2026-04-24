"use client";

import { useState } from "react";
import { calculateSeverance, type SeveranceResult } from "@/lib/calculators/severance";
import DateInput from "@/components/ui/DateInput";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

export default function SeveranceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pay, setPay] = useState("");
  const [days, setDays] = useState("90");
  const [result, setResult] = useState<SeveranceResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!startDate || !endDate) {
      setError("입사일과 퇴사일을 모두 입력해주세요.");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setError("퇴사일은 입사일보다 이후여야 합니다.");
      return;
    }
    const payAmount = Number(pay.replace(/,/g, ""));
    if (!payAmount || payAmount < 1) {
      setError("최근 3개월 급여를 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateSeverance({
      startDate,
      endDate,
      lastThreeMonthsPay: payAmount,
      lastThreeMonthsDays: Number(days),
    }));
  }

  function handlePayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setPay(raw ? Number(raw).toLocaleString("ko-KR") : "");
    setError("");
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">입사일</label>
            <DateInput
              value={startDate}
              onChange={(v) => setStartDate(v)}
              focusColor="blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">퇴사일</label>
            <DateInput
              value={endDate}
              onChange={(v) => setEndDate(v)}
              focusColor="blue"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            최근 3개월 급여 합계 <span className="text-gray-400 font-normal">(세전)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={pay}
              onChange={handlePayChange}
              placeholder="예: 9,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">최근 3개월 역일수</label>
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="89">89일</option>
            <option value="90">90일</option>
            <option value="91">91일</option>
            <option value="92">92일</option>
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
          {!result.isEligible ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="font-medium text-yellow-800">퇴직금 수급 요건 미충족</p>
              <p className="text-sm text-yellow-700 mt-1">
                재직기간 {result.workDays}일 — 1년(365일) 이상 근무 시 지급됩니다.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-blue-600 font-medium mb-1">예상 퇴직금</p>
                <p className="text-3xl font-bold text-blue-700">{formatKRW(result.severancePay)}</p>
              </div>
              <div className="divide-y divide-gray-100 text-sm">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">재직일수</span>
                  <span>{result.workDays.toLocaleString()}일 ({result.workYears.toFixed(2)}년)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">1일 평균임금</span>
                  <span>{formatKRW(result.averageDailyWage)}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>퇴직금</span>
                  <span className="text-blue-600">{formatKRW(result.severancePay)}</span>
                </div>
              </div>
            </>
          )}
          <p className="text-xs text-gray-400">
            근로자퇴직급여보장법 기준. 상여금·연차수당 포함 여부에 따라 실제 금액이 다를 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
