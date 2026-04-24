"use client";

import { useState } from "react";
import { calculateMbtiChange, type MbtiChangeResult } from "@/lib/calculators/mbtiChange";

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

export default function MbtiChangeCalculator() {
  const [oldType, setOldType] = useState("INFP");
  const [newType, setNewType] = useState("ENFP");
  const [result, setResult] = useState<MbtiChangeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (oldType === newType) {
      setError("이전 MBTI와 바뀐 MBTI가 같습니다. 다른 유형을 선택해주세요.");
      return;
    }
    setError("");
    setResult(calculateMbtiChange(oldType, newType));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">이전 MBTI</label>
          <div className="grid grid-cols-4 gap-2">
            {MBTI_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => { setOldType(t); setResult(null); setError(""); }}
                className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  oldType === t
                    ? "bg-gray-600 text-white border-gray-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-gray-400 text-xl">↓</div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">바뀐 MBTI</label>
          <div className="grid grid-cols-4 gap-2">
            {MBTI_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => { setNewType(t); setResult(null); setError(""); }}
                className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  newType === t
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-violet-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          변화 분석하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-center justify-center gap-4">
            <span className="text-xl font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl">{oldType}</span>
            <span className="text-gray-400">→</span>
            <span className="text-xl font-bold text-violet-600 bg-violet-50 px-4 py-2 rounded-xl">{newType}</span>
          </div>

          {result.changedAxes.length > 0 ? (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                변경된 축 ({result.changedAxes.length}개)
              </p>
              <div className="space-y-3">
                {result.changedAxes.map((axis, i) => (
                  <div key={i} className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-violet-700">{axis.from} → {axis.to}</span>
                      <span className="text-xs bg-violet-200 text-violet-700 px-2 py-0.5 rounded-full">변화</span>
                    </div>
                    <p className="text-xs text-violet-800 leading-relaxed">{axis.analysis}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500 text-sm">
              변경된 축이 없습니다.
            </div>
          )}

          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <p className="text-sm font-semibold text-indigo-800 mb-1">종합 분석</p>
            <p className="text-sm text-indigo-700 leading-relaxed">{result.overallAnalysis}</p>
          </div>

          {result.growthAreas && result.growthAreas.length > 0 && (
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-semibold text-green-800 mb-2">성장 영역</p>
              <ul className="space-y-1">
                {result.growthAreas.map((area, i) => (
                  <li key={i} className="text-xs text-green-700">• {area}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-gray-400">MBTI 변화 분석은 재미 목적입니다. 실제 성격 변화와 다를 수 있습니다.</p>
        </div>
      )}
    </div>
  );
}
