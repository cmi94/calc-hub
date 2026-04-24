"use client";

import { useState } from "react";
import { getZodiacPersonality, type ZodiacPersonalityResult } from "@/lib/calculators/zodiacPersonality";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function ZodiacPersonalityCalculator() {
  const [month, setMonth] = useState("3");
  const [day, setDay] = useState("21");
  const [result, setResult] = useState<ZodiacPersonalityResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const m = Number(month);
    const d = Number(day);
    if (!m || !d) {
      setError("월과 일을 입력해주세요.");
      return;
    }
    setError("");
    setResult(getZodiacPersonality({ month: m, day: d }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">태어난 월</label>
            <select
              value={month}
              onChange={(e) => { setMonth(e.target.value); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}월</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">태어난 일</label>
            <select
              value={day}
              onChange={(e) => { setDay(e.target.value); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          성격 분석하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="text-center bg-indigo-50 rounded-xl p-5 border border-indigo-100">
            <p className="text-4xl mb-2">{result.sign.symbol}</p>
            <p className="text-xl font-bold text-gray-800">{result.sign.nameKo}</p>
            <p className="text-sm text-indigo-600 mt-1">{result.sign.element} 별자리</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.traits.map((t, i) => (
              <span key={i} className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-xs font-semibold text-green-700 mb-2">강점</p>
              <ul className="space-y-1">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-green-800">• {s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <p className="text-xs font-semibold text-orange-700 mb-2">약점</p>
              <ul className="space-y-1">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="text-xs text-orange-800">• {w}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
              <p className="text-xs font-semibold text-pink-700 mb-1">잘 맞는 별자리</p>
              <p className="text-sm text-pink-800">{result.compatibility.best}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-1">주의할 별자리</p>
              <p className="text-sm text-gray-700">{result.compatibility.worst}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">직업 조언</p>
            <p className="text-sm text-blue-800 leading-relaxed">{result.career}</p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <p className="text-xs font-semibold text-yellow-700 mb-1">오늘의 조언</p>
            <p className="text-sm text-yellow-800 leading-relaxed">{result.advice}</p>
          </div>

          <p className="text-xs text-gray-400">별자리 성격 분석은 재미 목적입니다. 과학적 근거가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
