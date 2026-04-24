"use client";

import { useState } from "react";
import { calculateLifeRemaining, type LifeRemainingResult } from "@/lib/calculators/lifeRemaining";

export default function LifeRemainingCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState(83);
  const [result, setResult] = useState<LifeRemainingResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!birthDate) {
      setError("생년월일을 입력해주세요.");
      return;
    }
    const d = new Date(birthDate);
    if (isNaN(d.getTime())) {
      setError("올바른 날짜를 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateLifeRemaining({ birthDate, lifeExpectancy }));
  }

  const livedPct = result ? Math.min(100, Math.round((result.livedDays / (result.livedDays + result.remainingDays)) * 100)) : 0;

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => { setBirthDate(e.target.value); setResult(null); setError(""); }}
            max={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            기대수명: <span className="font-bold text-cyan-600">{lifeExpectancy}세</span>
          </label>
          <input
            type="range"
            min={60}
            max={100}
            value={lifeExpectancy}
            onChange={(e) => { setLifeExpectancy(Number(e.target.value)); setResult(null); }}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>60세</span>
            <span>100세</span>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          남은 시간 계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">이미 살아온 날</p>
              <p className="text-2xl font-bold text-gray-700">{result.livedDays.toLocaleString("ko-KR")}</p>
              <p className="text-xs text-gray-400">일</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4 text-center border border-cyan-200">
              <p className="text-xs text-cyan-600 mb-1">남은 날</p>
              <p className="text-2xl font-bold text-cyan-700">{result.remainingDays.toLocaleString("ko-KR")}</p>
              <p className="text-xs text-cyan-400">일</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>살아온 날 {livedPct}%</span>
              <span>남은 날 {100 - livedPct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-cyan-500 h-4 rounded-full transition-all"
                style={{ width: `${livedPct}%` }}
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">남은 심장박동</span>
              <span className="font-semibold">{result.remainingHeartbeats.toLocaleString("ko-KR")}회</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">남은 수면시간</span>
              <span className="font-semibold">{result.remainingSleepHours.toLocaleString("ko-KR")}시간</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">남은 식사 횟수</span>
              <span className="font-semibold">{result.remainingMeals.toLocaleString("ko-KR")}회</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            기대수명 {lifeExpectancy}세 기준. 재미로만 즐겨주세요.
          </p>
        </div>
      )}
    </div>
  );
}
