"use client";

import { useState } from "react";
import { calculateDailyFortune, type DailyFortuneResult } from "@/lib/calculators/dailyFortune";

export default function DailyFortuneCalculator() {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<DailyFortuneResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!birthDate) {
      setError("생년월일을 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateDailyFortune({ birthDate, referenceDate: todayStr }));
  }

  const scoreLabel = (score: number) => {
    if (score >= 80) return { text: "최고", color: "text-blue-600" };
    if (score >= 60) return { text: "좋음", color: "text-green-600" };
    if (score >= 40) return { text: "보통", color: "text-yellow-600" };
    return { text: "무난", color: "text-gray-500" };
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => { setBirthDate(e.target.value); setResult(null); }}
            max={todayStr}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          오늘의 한마디 보기
        </button>
      </div>

      {result && (() => {
        const { text, color } = scoreLabel(result.luckyScore);
        return (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            {/* 점수 */}
            <div className="text-center space-y-1">
              <p className="text-sm text-gray-500">{result.referenceDate} 오늘의 운세</p>
              <div className="flex items-end justify-center gap-2">
                <span className={`text-5xl font-bold ${color}`}>{result.luckyScore}</span>
                <span className="text-gray-400 text-lg mb-1">/ 100</span>
              </div>
              <span className={`text-sm font-semibold ${color}`}>{text}</span>
            </div>

            {/* 점수 바 */}
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                style={{ width: `${result.luckyScore}%` }}
              />
            </div>

            {/* 메시지 */}
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-gray-800 text-sm leading-relaxed text-center">{result.message}</p>
            </div>

            {/* 행운의 숫자 */}
            <div>
              <p className="text-xs text-gray-500 text-center mb-2">행운의 숫자</p>
              <div className="flex justify-center gap-3">
                {result.luckyNumbers.map((n) => (
                  <span
                    key={n}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: result.luckyColorHex }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* 행운의 색 */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-gray-500">행운의 색</span>
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: result.luckyColorHex }}
              />
              <span className="text-sm font-medium text-gray-700">{result.luckyColor}</span>
            </div>

            {/* 면책 문구 */}
            <p className="text-xs text-gray-400 text-center border-t border-gray-100 pt-3">
              재미로 보는 오늘의 한마디입니다. 실제 운세·점술과 무관하며 어떠한 의사결정에도 근거로 활용하지 마세요.
            </p>
          </div>
        );
      })()}
    </div>
  );
}
