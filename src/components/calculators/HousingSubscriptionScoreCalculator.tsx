"use client";

import { useState } from "react";
import { calculateHousingSubscriptionScore, type HousingSubscriptionScoreResult } from "@/lib/calculators/housingSubscriptionScore";

export default function HousingSubscriptionScoreCalculator() {
  const [noHouseYears, setNoHouseYears] = useState("");
  const [dependents, setDependents] = useState("0");
  const [subscriptionYears, setSubscriptionYears] = useState("");
  const [result, setResult] = useState<HousingSubscriptionScoreResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const nyears = Number(noHouseYears);
    const dep = Number(dependents);
    const syears = Number(subscriptionYears);

    if (noHouseYears === "" || nyears < 0) {
      setError("무주택기간을 입력해주세요.");
      return;
    }
    if (subscriptionYears === "" || syears < 0) {
      setError("청약통장 가입기간을 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateHousingSubscriptionScore({
      noHouseYears: nyears,
      dependents: dep,
      subscriptionYears: syears,
    }));
  }

  const scoreColor = (score: number, max: number) => {
    const ratio = score / max;
    if (ratio >= 0.8) return "text-blue-600";
    if (ratio >= 0.5) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* 무주택기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            무주택기간 <span className="text-xs text-gray-400">(최대 15년, 32점)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={noHouseYears}
              onChange={(e) => { setNoHouseYears(e.target.value); setResult(null); }}
              placeholder="예: 5"
              min="0"
              max="30"
              step="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">년</span>
          </div>
        </div>

        {/* 부양가족 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            부양가족 수 <span className="text-xs text-gray-400">(본인 제외, 최대 6명 이상, 35점)</span>
          </label>
          <select
            value={dependents}
            onChange={(e) => { setDependents(e.target.value); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[0,1,2,3,4,5,6].map((n) => (
              <option key={n} value={n}>{n}명{n === 6 ? " 이상" : ""}</option>
            ))}
          </select>
        </div>

        {/* 청약통장 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            청약통장 가입기간 <span className="text-xs text-gray-400">(최대 15년, 17점)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={subscriptionYears}
              onChange={(e) => { setSubscriptionYears(e.target.value); setResult(null); }}
              placeholder="예: 3"
              min="0"
              max="30"
              step="0.5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">년</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">6개월 단위로 점수 반영 (예: 2.5년 입력 가능)</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          {/* 총점 강조 */}
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">청약 가점</p>
            <p className="text-4xl font-bold text-blue-700">{result.totalScore}점</p>
            <p className="text-sm text-blue-400 mt-1">최대 84점</p>
          </div>

          {/* 항목별 */}
          <div className="space-y-3">
            {[
              { label: "무주택기간", score: result.noHouseScore, max: 32 },
              { label: "부양가족", score: result.dependentsScore, max: 35 },
              { label: "청약통장", score: result.subscriptionScore, max: 17 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className={`font-semibold ${scoreColor(item.score, item.max)}`}>
                    {item.score}점 / {item.max}점
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(item.score / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400">
            주택공급에 관한 규칙 제28조 기준. 실제 청약 자격 및 당첨 기준은 단지마다 다릅니다.
          </p>
        </div>
      )}
    </div>
  );
}
