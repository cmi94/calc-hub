"use client";

import { useState } from "react";
import { calculateMbtiCompat, type MbtiCompatResult, type MbtiCompatInput } from "@/lib/calculators/mbtiCompatibility";

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

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

export default function MbtiCompatibilityCalculator() {
  const [typeA, setTypeA] = useState<string>("INFP");
  const [typeB, setTypeB] = useState<string>("ENFJ");
  const [result, setResult] = useState<MbtiCompatResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!typeA || !typeB) {
      setError("두 MBTI 유형을 모두 선택해주세요.");
      return;
    }
    setError("");
    const input: MbtiCompatInput = { type1: typeA, type2: typeB };
    setResult(calculateMbtiCompat(input));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">나의 MBTI</label>
          <div className="grid grid-cols-4 gap-2">
            {MBTI_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => { setTypeA(t); setResult(null); }}
                className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  typeA === t
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-pink-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">상대방 MBTI</label>
          <div className="grid grid-cols-4 gap-2">
            {MBTI_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => { setTypeB(t); setResult(null); }}
                className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  typeB === t
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-orange-400"
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
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          궁합 확인하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className={`rounded-xl p-5 text-center border ${scoreBg(result.score)}`}>
            <p className="text-sm font-medium text-gray-600 mb-1">{typeA} × {typeB} 궁합 점수</p>
            <p className={`text-5xl font-bold ${scoreColor(result.score)}`}>{result.score}점</p>
            <p className="text-lg font-semibold text-gray-700 mt-2">{result.grade}</p>
            <p className="text-sm text-gray-500 mt-1">{result.relationshipType}</p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{result.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-700 mb-2">강점</p>
              <ul className="space-y-1">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-green-800 flex items-start gap-1">
                    <span className="mt-0.5">•</span><span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-orange-700 mb-2">주의할 점</p>
              <ul className="space-y-1">
                {result.challenges.map((c, i) => (
                  <li key={i} className="text-xs text-orange-800 flex items-start gap-1">
                    <span className="mt-0.5">•</span><span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-gray-400">재미로만 즐겨주세요. MBTI 궁합은 과학적 근거가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
