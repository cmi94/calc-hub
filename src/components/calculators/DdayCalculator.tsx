"use client";

import { useState } from "react";
import { calculateDday, type DdayResult } from "@/lib/calculators/dday";

function todayStr() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

export default function DdayCalculator() {
  const today = todayStr();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<DdayResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!startDate || !endDate) {
      setError("시작일과 종료일을 모두 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateDday({ startDate, endDate }));
  }

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">종료일 (목표일)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          {/* D-day 강조 */}
          <div className={`rounded-xl p-4 text-center ${result.dday > 0 ? "bg-blue-50" : result.dday === 0 ? "bg-green-50" : "bg-gray-50"}`}>
            <p className="text-sm font-medium text-gray-600 mb-1">D-day</p>
            {result.dday === 0 ? (
              <p className="text-3xl font-bold text-green-600">D-Day!</p>
            ) : result.dday > 0 ? (
              <p className="text-3xl font-bold text-blue-700">D - {fmt(result.dday)}</p>
            ) : (
              <p className="text-3xl font-bold text-gray-600">D + {fmt(Math.abs(result.dday))}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {result.dday > 0 ? `${result.endDate}까지 ${fmt(result.dday)}일 남았습니다` :
               result.dday === 0 ? "오늘이 목표일입니다!" :
               `목표일로부터 ${fmt(Math.abs(result.dday))}일이 지났습니다`}
            </p>
          </div>

          {/* 날짜 차이 상세 */}
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">총 일수</span>
              <span className="font-semibold">{fmt(result.totalDays)}일</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">총 주수</span>
              <span className="font-semibold">{fmt(result.weeks)}주</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">총 개월수</span>
              <span className="font-semibold">약 {fmt(result.months)}개월</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">총 년수</span>
              <span className="font-semibold">약 {fmt(result.years)}년</span>
            </div>
          </div>

          {/* 세부 분해 */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm">
            <p className="text-gray-600 font-medium mb-2">기간 분해</p>
            <p className="text-gray-800 font-semibold">
              {result.breakdown.years > 0 && `${result.breakdown.years}년 `}
              {result.breakdown.months > 0 && `${result.breakdown.months}개월 `}
              {result.breakdown.days > 0 && `${result.breakdown.days}일`}
              {result.breakdown.years === 0 && result.breakdown.months === 0 && result.breakdown.days === 0 && "같은 날"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
