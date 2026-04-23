"use client";

import { useState } from "react";
import { calculateCompatibility, type CompatibilityResult } from "@/lib/calculators/compatibility";

export default function CompatibilityCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!name1.trim() || !name2.trim()) {
      setError("두 사람의 이름을 모두 입력해주세요.");
      return;
    }
    if (name1.trim().length < 2 || name2.trim().length < 2) {
      setError("이름은 최소 2자 이상 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateCompatibility({ name1: name1.trim(), name2: name2.trim() }));
  }

  const scoreColor =
    !result ? "text-gray-700" :
    result.score >= 80 ? "text-pink-600" :
    result.score >= 60 ? "text-orange-500" :
    "text-gray-600";

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">첫 번째 이름</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => { setName1(e.target.value); setResult(null); }}
              placeholder="예: 홍길동"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">두 번째 이름</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => { setName2(e.target.value); setResult(null); }}
              placeholder="예: 김영희"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          궁합 보기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          {/* 하트 + 이름 */}
          <div className="text-center text-2xl font-bold text-gray-700">
            {result.name1} <span className="text-pink-400">♥</span> {result.name2}
          </div>

          {/* 점수 강조 */}
          <div className="bg-pink-50 rounded-xl p-6 text-center">
            <p className="text-sm text-pink-600 font-medium mb-2">궁합 점수</p>
            <p className={`text-5xl font-bold ${scoreColor}`}>{result.score}<span className="text-2xl">점</span></p>
            <p className="text-lg font-semibold text-gray-700 mt-2">{result.label}</p>
          </div>

          {/* 점수 바 */}
          <div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-pink-400 to-red-500 h-3 rounded-full transition-all"
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          {/* 설명 */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
            <p>{result.description}</p>
          </div>

          {/* 획수 정보 */}
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">{result.name1} 이름 획수</span>
              <span className="font-semibold">{result.strokes1}획</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">{result.name2} 이름 획수</span>
              <span className="font-semibold">{result.strokes2}획</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            재미로 보는 궁합이며 과학적 근거가 없습니다. 실제 관계와 무관합니다.
          </p>
        </div>
      )}
    </div>
  );
}
