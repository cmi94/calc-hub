"use client";

import { useState } from "react";
import { analyzeFaceAge, type FaceAgeResult } from "@/lib/calculators/faceAge";
import DateInput from "@/components/ui/DateInput";

export default function FaceAgeCalculator() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<FaceAgeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }
    if (!birthDate) {
      setError("생년월일을 입력해주세요.");
      return;
    }
    setError("");
    setResult(analyzeFaceAge({ name: name.trim(), birthDate }));
  }

  function ageDiffLabel(diff: number): string {
    if (diff === 0) return "실제 나이와 똑같아요!";
    if (diff < 0) return `${Math.abs(diff)}살 동안`;
    return `${diff}살 노안`;
  }

  function ageDiffColor(diff: number): string {
    if (diff === 0) return "text-gray-600";
    if (diff < 0) return "text-blue-600";
    return "text-orange-500";
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
        <p className="text-sm text-orange-700 font-medium text-center">
          이 계산기는 재미로만 즐겨주세요! 과학적 근거가 없습니다.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setResult(null); setError(""); }}
            placeholder="이름을 입력하세요"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
          <DateInput
            value={birthDate}
            onChange={(v) => { setBirthDate(v); setResult(null); setError(""); }}
            max={new Date().toISOString().split("T")[0]}
            focusColor="pink"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          관상 나이 분석하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl p-6 text-center text-white">
            <p className="text-sm text-pink-100 mb-1">{name}님의 관상 나이</p>
            <p className="text-6xl font-bold">{result.apparentAge}세</p>
            <p className={`text-base font-semibold mt-2 ${ageDiffColor(result.apparentAge - result.actualAge)} bg-white bg-opacity-20 rounded-full px-4 py-1 inline-block`}>
              {ageDiffLabel(result.apparentAge - result.actualAge)}
            </p>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">실제 나이</span>
              <span className="font-semibold">{result.actualAge}세</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">관상 나이</span>
              <span className="font-semibold text-pink-600">{result.apparentAge}세</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">관상 유형</span>
              <span className="font-semibold">{result.faceType}</span>
            </div>
          </div>

          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
            <p className="text-xs font-semibold text-pink-700 mb-1">매력 포인트</p>
            <p className="text-sm text-pink-800 leading-relaxed">{result.charmPoint}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">개선 팁</p>
            <p className="text-sm text-blue-800 leading-relaxed">{result.improvementTip}</p>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">60세의 나</p>
            <p className="text-sm text-amber-800 leading-relaxed">{result.futureAt60}</p>
          </div>

          <p className="text-xs text-gray-400">재미로만 즐겨주세요. 과학적·의학적 근거가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
