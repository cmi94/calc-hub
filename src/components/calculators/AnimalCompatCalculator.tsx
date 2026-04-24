"use client";

import { useState } from "react";
import { calculateAnimalCompat, type AnimalCompatResult } from "@/lib/calculators/animalCompat";

function scoreColor(score: number): string {
  if (score >= 80) return "text-pink-600";
  if (score >= 60) return "text-orange-500";
  return "text-gray-500";
}

function scoreBg(score: number): string {
  if (score >= 80) return "bg-pink-50 border-pink-200";
  if (score >= 60) return "bg-orange-50 border-orange-200";
  return "bg-gray-50 border-gray-200";
}

const CURRENT_YEAR = new Date().getFullYear();

export default function AnimalCompatCalculator() {
  const [year1, setYear1] = useState("");
  const [year2, setYear2] = useState("");
  const [result, setResult] = useState<AnimalCompatResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const y1 = Number(year1);
    const y2 = Number(year2);
    if (!y1 || !y2) {
      setError("두 사람의 출생연도를 모두 입력해주세요.");
      return;
    }
    if (y1 < 1900 || y1 > CURRENT_YEAR || y2 < 1900 || y2 > CURRENT_YEAR) {
      setError("올바른 출생연도를 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateAnimalCompat({ person1BirthYear: y1, person2BirthYear: y2 }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">나의 출생연도</label>
            <input
              type="number"
              value={year1}
              onChange={(e) => { setYear1(e.target.value); setResult(null); setError(""); }}
              placeholder="예: 1990"
              min={1900}
              max={CURRENT_YEAR}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상대방 출생연도</label>
            <input
              type="number"
              value={year2}
              onChange={(e) => { setYear2(e.target.value); setResult(null); setError(""); }}
              placeholder="예: 1992"
              min={1900}
              max={CURRENT_YEAR}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          띠 궁합 보기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-4xl">{result.person1Animal.emoji}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{result.person1Animal.nameKo}띠</p>
            </div>
            <div className="text-gray-400 text-xl">×</div>
            <div className="text-center">
              <p className="text-4xl">{result.person2Animal.emoji}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{result.person2Animal.nameKo}띠</p>
            </div>
          </div>

          <div className={`rounded-xl p-4 text-center border ${scoreBg(result.score)}`}>
            <p className="text-sm font-medium text-gray-600 mb-1">{result.compatType}</p>
            <p className={`text-5xl font-bold ${scoreColor(result.score)}`}>{result.score}점</p>
            <p className="text-base font-semibold text-gray-700 mt-2">{result.grade}</p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{result.description}</p>

          {result.tips && result.tips.length > 0 && (
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
              <p className="text-xs font-semibold text-yellow-700 mb-2">관계 팁</p>
              <ul className="space-y-1">
                {result.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-yellow-800">• {tip}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-gray-400">띠 궁합은 재미 목적입니다. 과학적 근거가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
