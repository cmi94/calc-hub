"use client";

import { useState } from "react";
import { getMbtiCareer, type MbtiCareerResult } from "@/lib/calculators/mbtiCareer";

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

export default function MbtiCareerCalculator() {
  const [mbtiType, setMbtiType] = useState("INFP");
  const [result, setResult] = useState<MbtiCareerResult | null>(null);

  function handleCalculate() {
    setResult(getMbtiCareer({ mbtiType }));
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">나의 MBTI 유형</label>
          <div className="grid grid-cols-4 gap-2">
            {MBTI_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => { setMbtiType(t); setResult(null); }}
                className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  mbtiType === t
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-violet-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          직업 궁합 보기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="bg-violet-50 rounded-xl p-5 border border-violet-200">
            <p className="text-2xl font-bold text-violet-800">{result.typeName}</p>
            <p className="text-sm text-violet-600 mt-1">{result.description}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">추천 직업</p>
            <div className="grid grid-cols-1 gap-2">
              {result.recommendedCareers.map((career, i) => (
                <div key={i} className="bg-green-50 rounded-xl p-3 border border-green-100 flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-green-800">{career}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">비추천 직업</p>
            <div className="grid grid-cols-1 gap-2">
              {result.notRecommendedCareers.map((career, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    ✕
                  </span>
                  <span className="text-sm text-gray-600">{career}</span>
                </div>
              ))}
            </div>
          </div>

          {result.famousPeople && result.famousPeople.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">같은 MBTI 유명인</p>
              <div className="flex flex-wrap gap-2">
                {result.famousPeople.map((person, i) => (
                  <span key={i} className="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {person}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">업무 스타일</p>
              <p className="text-xs text-blue-800 leading-relaxed">{result.workStyle}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-xs font-semibold text-amber-700 mb-1">강점</p>
              <p className="text-xs text-amber-800 leading-relaxed">{result.strengths}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400">MBTI 직업 궁합은 재미 목적입니다. 과학적 근거가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
