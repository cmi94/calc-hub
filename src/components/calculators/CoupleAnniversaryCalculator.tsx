"use client";

import { useState } from "react";
import { calculateCoupleAnniversary, type CoupleAnniversaryResult, type Anniversary } from "@/lib/calculators/coupleAnniversary";

export default function CoupleAnniversaryCalculator() {
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState<CoupleAnniversaryResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!startDate) {
      setError("사귀기 시작한 날짜를 입력해주세요.");
      return;
    }
    const d = new Date(startDate);
    if (isNaN(d.getTime())) {
      setError("올바른 날짜를 입력해주세요.");
      return;
    }
    if (d > new Date()) {
      setError("오늘 이전 날짜를 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateCoupleAnniversary({ startDate }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">사귀기 시작한 날 (1일차)</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setResult(null); setError(""); }}
            max={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          기념일 계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="bg-pink-50 rounded-xl p-5 text-center border border-pink-200">
            <p className="text-sm font-medium text-pink-600 mb-1">오늘까지</p>
            <p className="text-5xl font-bold text-pink-700">{result.currentDays.toLocaleString("ko-KR")}일째</p>
            <p className="text-sm text-gray-500 mt-2">{startDate} 시작</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">다가오는 기념일</p>
            <div className="space-y-2">
              {result.anniversaries.map((ann: Anniversary, i: number) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    ann.isPast
                      ? "bg-gray-50 border-gray-100 opacity-50"
                      : "bg-pink-50 border-pink-100"
                  }`}
                >
                  <div>
                    <span className={`text-sm font-semibold ${ann.isPast ? "text-gray-500" : "text-pink-700"}`}>
                      {ann.label}
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">{ann.date}</p>
                  </div>
                  {!ann.isPast && (
                    <span className="text-xs bg-pink-100 text-pink-600 font-semibold px-2 py-1 rounded-full">
                      D-{ann.daysUntil}
                    </span>
                  )}
                  {ann.isPast && (
                    <span className="text-xs text-gray-400">지남</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400">기념일은 1일차를 기준으로 계산됩니다.</p>
        </div>
      )}
    </div>
  );
}
