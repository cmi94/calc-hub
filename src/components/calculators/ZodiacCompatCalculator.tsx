"use client";

import { useState } from "react";
import { calculateZodiacCompat, type ZodiacCompatResult, type ZodiacCompatInput } from "@/lib/calculators/zodiacCompat";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function ZodiacCompatCalculator() {
  const [month1, setMonth1] = useState("3");
  const [day1, setDay1] = useState("21");
  const [month2, setMonth2] = useState("6");
  const [day2, setDay2] = useState("21");
  const [result, setResult] = useState<ZodiacCompatResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const m1 = Number(month1);
    const d1 = Number(day1);
    const m2 = Number(month2);
    const d2 = Number(day2);
    if (!m1 || !d1 || !m2 || !d2) {
      setError("생년월일을 모두 입력해주세요.");
      return;
    }
    setError("");
    const input: ZodiacCompatInput = { person1Month: m1, person1Day: d1, person2Month: m2, person2Day: d2 };
    setResult(calculateZodiacCompat(input));
  }

  function scoreColor(score: number): string {
    if (score >= 80) return "text-pink-600";
    if (score >= 60) return "text-orange-500";
    return "text-gray-500";
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">나의 생월일</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">월</label>
              <select
                value={month1}
                onChange={(e) => { setMonth1(e.target.value); setResult(null); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}월</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">일</label>
              <select
                value={day1}
                onChange={(e) => { setDay1(e.target.value); setResult(null); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>{d}일</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">상대방 생월일</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">월</label>
              <select
                value={month2}
                onChange={(e) => { setMonth2(e.target.value); setResult(null); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}월</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">일</label>
              <select
                value={day2}
                onChange={(e) => { setDay2(e.target.value); setResult(null); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>{d}일</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          별자리 궁합 보기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-center justify-center gap-4 text-center">
            <div>
              <p className="text-3xl">{result.person1Sign.symbol}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{result.person1Sign.nameKo}</p>
            </div>
            <div className="text-gray-400 text-xl">×</div>
            <div>
              <p className="text-3xl">{result.person2Sign.symbol}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{result.person2Sign.nameKo}</p>
            </div>
          </div>

          <div className="bg-pink-50 rounded-xl p-4 text-center border border-pink-200">
            <p className="text-sm text-pink-600 font-medium mb-1">궁합 점수</p>
            <p className={`text-5xl font-bold ${scoreColor(result.score)}`}>{result.score}점</p>
            <p className="text-base font-semibold text-gray-700 mt-2">{result.grade}</p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{result.description}</p>

          {result.tips && result.tips.length > 0 && (
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-xs font-semibold text-yellow-700 mb-2">궁합 팁</p>
              <ul className="space-y-1">
                {result.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-yellow-800">• {tip}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-gray-400">재미로만 즐겨주세요. 별자리 궁합은 과학적 근거가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
