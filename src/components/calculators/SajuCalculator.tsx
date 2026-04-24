"use client";

import { useState } from "react";
import { calculateSaju, type SajuResult, type SajuInput } from "@/lib/calculators/saju";

const ELEMENT_COLORS: Record<string, string> = {
  목: "bg-green-100 text-green-700 border-green-200",
  화: "bg-red-100 text-red-700 border-red-200",
  토: "bg-yellow-100 text-yellow-700 border-yellow-200",
  금: "bg-gray-100 text-gray-700 border-gray-200",
  수: "bg-blue-100 text-blue-700 border-blue-200",
};

const ELEMENT_BAR_COLORS: Record<string, string> = {
  목: "bg-green-500",
  화: "bg-red-500",
  토: "bg-yellow-500",
  금: "bg-gray-400",
  수: "bg-blue-500",
};

export default function SajuCalculator() {
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [birthHour, setBirthHour] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<SajuResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const year = Number(birthYear);
    if (!year || year < 1900 || year > 2010) {
      setError("출생연도를 올바르게 입력해주세요. (1900~2010)");
      return;
    }
    setError("");
    const input: SajuInput = {
      birthYear: year,
      birthMonth: Number(birthMonth),
      birthDay: Number(birthDay),
      birthHour: birthHour !== "" ? Number(birthHour) : undefined,
      gender,
    };
    setResult(calculateSaju(input));
  }

  const PILLAR_NAMES = ["년주", "월주", "일주", "시주"];

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">출생연도</label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => { setBirthYear(e.target.value); setResult(null); setError(""); }}
              placeholder="예: 1990"
              min={1900}
              max={2010}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">월</label>
            <select
              value={birthMonth}
              onChange={(e) => { setBirthMonth(e.target.value); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}월</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">일</label>
            <select
              value={birthDay}
              onChange={(e) => { setBirthDay(e.target.value); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}일</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            출생시각 <span className="text-xs text-gray-400">(선택, 시주 계산에 필요)</span>
          </label>
          <select
            value={birthHour}
            onChange={(e) => { setBirthHour(e.target.value); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">모름</option>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>{i}시</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
          <div className="flex gap-2">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => { setGender(g); setResult(null); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                  gender === g
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-amber-400"
                }`}
              >
                {g === "male" ? "남성" : "여성"}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          사주 분석하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">사주 4주</p>
            <div className="grid grid-cols-4 gap-2">
              {(() => {
                const pillars = [result.yearPillar, result.monthPillar, result.dayPillar, ...(result.hourPillar ? [result.hourPillar] : [])];
                return pillars.map((pillar, i) => (
                  <div key={i} className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                    <p className="text-xs text-amber-600 font-semibold mb-2">{PILLAR_NAMES[i]}</p>
                    <p className="text-lg font-bold text-gray-800">{pillar.heavenlyStem}</p>
                    <p className="text-lg font-bold text-gray-600">{pillar.earthlyBranch}</p>
                    <p className="text-xs text-gray-400 mt-1">{pillar.element}</p>
                  </div>
                ));
              })()}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">오행 분포</p>
            <div className="space-y-2">
              {(Object.entries(result.elementCounts) as [string, number][]).map(([element, count]) => (
                <div key={element} className="flex items-center gap-3">
                  <span className={`w-8 text-center text-sm font-bold px-1 py-0.5 rounded border ${ELEMENT_COLORS[element]}`}>
                    {element}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${ELEMENT_BAR_COLORS[element]}`}
                      style={{ width: `${Math.min(100, (count / 4) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-6 text-right">{count}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              {result.dominantElement && (
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${ELEMENT_COLORS[result.dominantElement]}`}>
                  강: {result.dominantElement}
                </span>
              )}
              {result.weakElement && (
                <span className="text-xs px-3 py-1 rounded-full border font-semibold bg-gray-50 text-gray-500 border-gray-200">
                  약: {result.weakElement}
                </span>
              )}
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="text-sm font-semibold text-amber-800 mb-1">분석</p>
            <p className="text-sm text-amber-700 leading-relaxed">{result.analysis}</p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-sm font-semibold text-indigo-800 mb-1">운세</p>
            <p className="text-sm text-indigo-700 leading-relaxed">{result.fortuneThisYear}</p>
          </div>

          <p className="text-xs text-gray-400">사주 분석은 재미 목적입니다. 과학적 근거가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
