"use client";

import { useState } from "react";
import { calculateBac, type BacResult, type DrinkItem } from "@/lib/calculators/bac";

const PRESET_DRINKS = [
  { name: "소주 (1병)", volumeMl: 360, alcoholPct: 19 },
  { name: "맥주 (500mL)", volumeMl: 500, alcoholPct: 5 },
  { name: "와인 (1잔)", volumeMl: 150, alcoholPct: 12 },
  { name: "막걸리 (1병)", volumeMl: 750, alcoholPct: 6 },
  { name: "양주 (1잔)", volumeMl: 45, alcoholPct: 40 },
];

type DrinkEntry = DrinkItem & { name: string };

export default function BacCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weightKg, setWeightKg] = useState("");
  const [hoursElapsed, setHoursElapsed] = useState("0");
  const [drinks, setDrinks] = useState<DrinkEntry[]>([
    { name: "소주 (1병)", volumeMl: 360, alcoholPct: 19, count: 1 },
  ]);
  const [result, setResult] = useState<BacResult | null>(null);
  const [error, setError] = useState("");

  function updateDrinkCount(idx: number, count: number) {
    setDrinks((prev) => prev.map((d, i) => i === idx ? { ...d, count } : d));
    setError("");
    setResult(null);
  }

  function addPreset(preset: typeof PRESET_DRINKS[0]) {
    setDrinks((prev) => {
      const existing = prev.findIndex((d) => d.name === preset.name);
      if (existing >= 0) {
        return prev.map((d, i) => i === existing ? { ...d, count: d.count + 1 } : d);
      }
      return [...prev, { ...preset, count: 1 }];
    });
    setError("");
    setResult(null);
  }

  function removeDrink(idx: number) {
    setDrinks((prev) => prev.filter((_, i) => i !== idx));
    setError("");
    setResult(null);
  }

  function handleCalculate() {
    const w = parseFloat(weightKg);
    const h = parseFloat(hoursElapsed);
    if (!weightKg || isNaN(w) || w <= 0) {
      setError("체중을 입력해주세요.");
      return;
    }
    if (isNaN(h) || h < 0) {
      setError("경과 시간을 입력해주세요.");
      return;
    }
    const activeDrinks = drinks.filter((d) => d.count > 0);
    setError("");
    setResult(calculateBac({ gender, weightKg: w, drinks: activeDrinks, hoursElapsed: h }));
  }

  const warningColor = (bac: number) => {
    if (bac === 0) return "bg-green-50 text-green-700";
    if (bac < 0.03) return "bg-yellow-50 text-yellow-700";
    if (bac < 0.08) return "bg-orange-50 text-orange-700";
    return "bg-red-50 text-red-700";
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* 성별 */}
        <div className="flex gap-3">
          <button
            onClick={() => { setGender("male"); setError(""); setResult(null); }}
            className={`flex-1 py-2 rounded-lg border font-medium text-sm transition-colors ${gender === "male" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
          >
            남성
          </button>
          <button
            onClick={() => { setGender("female"); setError(""); setResult(null); }}
            className={`flex-1 py-2 rounded-lg border font-medium text-sm transition-colors ${gender === "female" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
          >
            여성
          </button>
        </div>

        {/* 체중 / 경과시간 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">체중 (kg)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => { setWeightKg(e.target.value); setError(""); setResult(null); }}
              placeholder="예: 70"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">경과 시간 (h)</label>
            <input
              type="number"
              value={hoursElapsed}
              onChange={(e) => { setHoursElapsed(e.target.value); setError(""); setResult(null); }}
              placeholder="0"
              step="0.5"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 음료 프리셋 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">음료 추가</label>
          <div className="flex flex-wrap gap-2">
            {PRESET_DRINKS.map((p) => (
              <button
                key={p.name}
                onClick={() => addPreset(p)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors"
              >
                + {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 음료 목록 */}
        {drinks.length > 0 && (
          <div className="space-y-2">
            {drinks.map((drink, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <span className="flex-1 text-gray-700">{drink.name}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => drink.count > 1 ? updateDrinkCount(idx, drink.count - 1) : removeDrink(idx)}
                    className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold">{drink.count}</span>
                  <button
                    onClick={() => updateDrinkCount(idx, drink.count + 1)}
                    className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeDrink(idx)} className="text-gray-400 hover:text-red-500 text-xs">삭제</button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          측정하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className={`rounded-xl p-4 text-center ${warningColor(result.currentBac)}`}>
            <p className="text-sm font-medium mb-1">현재 혈중알코올농도 (BAC)</p>
            <p className="text-4xl font-bold">{(result.currentBac * 100).toFixed(3)}%</p>
            <p className="text-sm font-semibold mt-2">{result.warning}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">총 알코올 섭취량</span>
              <span className="font-semibold">{result.totalAlcoholGrams}g</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">최고 BAC</span>
              <span className="font-semibold">{(result.peakBac * 100).toFixed(3)}%</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">완전 해소까지</span>
              <span className="font-semibold">{result.soberInHours}시간</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">단속기준 (0.03%) 미만</span>
              <span className={`font-semibold ${result.isDrivingSafe ? "text-green-600" : "text-red-600"}`}>
                {result.isDrivingSafe ? "안전" : "위반"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">면허취소 (0.08%) 미만</span>
              <span className={`font-semibold ${result.isDrivingLegal ? "text-green-600" : "text-red-600"}`}>
                {result.isDrivingLegal ? "미만" : "초과"}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Widmark 공식 기반 추정치. 개인 대사 능력·음식 섭취·건강 상태에 따라 실제 수치가 크게 다를 수 있습니다.
            이 계산기는 참고용이며 음주 후 운전은 절대 금지입니다.
          </p>
        </div>
      )}
    </div>
  );
}
