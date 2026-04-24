"use client";

import { useState } from "react";
import { calculatePastLife, type PastLifeResult, type PastLifeInput } from "@/lib/calculators/pastLife";

type Gender = "male" | "female" | "other";

export default function PastLifeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [result, setResult] = useState<PastLifeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!birthDate) {
      setError("생년월일을 입력해주세요.");
      return;
    }
    setError("");
    const input: PastLifeInput = { birthDate, gender };
    setResult(calculatePastLife(input));
  }

  const GENDER_OPTIONS: { value: Gender; label: string }[] = [
    { value: "male", label: "남성" },
    { value: "female", label: "여성" },
    { value: "other", label: "기타" },
  ];

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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
          <div className="flex gap-2">
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setGender(opt.value); setResult(null); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                  gender === opt.value
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-purple-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          전생 알아보기
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-xs text-purple-200 mb-2">당신의 전생은...</p>
            <p className="text-3xl font-bold mb-3">{result.job}</p>
            <div className="flex gap-2 text-sm text-purple-200 mb-4">
              <span>{result.era}</span>
              <span>·</span>
              <span>{result.country}</span>
            </div>
            <p className="text-sm text-purple-100 leading-relaxed">{result.description}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {result.trait}
              </span>
            </div>
            <p className="text-xs text-gray-400">전생 계산은 순수한 재미를 위한 것입니다. 과학적 근거가 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
