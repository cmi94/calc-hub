"use client";

import { useState } from "react";
import { calculateBmi, type BmiResult } from "@/lib/calculators/bmi";

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

export default function BmiCalculator() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (!heightCm || !weightKg || isNaN(h) || isNaN(w)) {
      setError("키와 몸무게를 모두 입력해주세요.");
      return;
    }
    if (h < 50 || h > 250) {
      setError("키는 50~250cm 범위로 입력해주세요.");
      return;
    }
    if (w < 10 || w > 300) {
      setError("몸무게는 10~300kg 범위로 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateBmi({ heightCm: h, weightKg: w }));
  }

  const colorClass = result ? (COLOR_MAP[result.categoryColor] ?? COLOR_MAP.green) : "";

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">키 (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => { setHeightCm(e.target.value); setResult(null); }}
              placeholder="예: 170"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">몸무게 (kg)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => { setWeightKg(e.target.value); setResult(null); }}
              placeholder="예: 65"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          {/* BMI 강조 */}
          <div className={`rounded-xl p-4 text-center border ${colorClass}`}>
            <p className="text-sm font-medium mb-1">BMI 지수</p>
            <p className="text-4xl font-bold">{result.bmi}</p>
            <p className="text-lg font-semibold mt-1">{result.categoryLabel}</p>
          </div>

          {/* BMI 척도 */}
          <div className="space-y-1.5 text-sm">
            {[
              { label: "저체중", range: "18.5 미만", color: "bg-blue-200" },
              { label: "정상", range: "18.5 ~ 22.9", color: "bg-green-200" },
              { label: "과체중", range: "23.0 ~ 24.9", color: "bg-yellow-200" },
              { label: "비만 1단계", range: "25.0 ~ 29.9", color: "bg-orange-200" },
              { label: "비만 2단계", range: "30.0 ~ 34.9", color: "bg-red-200" },
              { label: "고도비만", range: "35.0 이상", color: "bg-red-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0`} />
                <span className="text-gray-700 w-20">{item.label}</span>
                <span className="text-gray-500">{item.range}</span>
              </div>
            ))}
          </div>

          {/* 적정 체중 */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <p className="font-medium text-gray-700">
              {heightCm}cm 기준 적정 체중 범위 (BMI 18.5 ~ 22.9)
            </p>
            <div className="flex justify-between">
              <span className="text-gray-600">최소 적정 체중</span>
              <span className="font-semibold">{result.idealWeightMin} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">최대 적정 체중</span>
              <span className="font-semibold">{result.idealWeightMax} kg</span>
            </div>
            {result.weightDiff !== 0 && (
              <div className="flex justify-between pt-1 border-t border-gray-200">
                <span className="text-gray-600">
                  {result.weightDiff > 0 ? "감량 필요량" : "증량 필요량"}
                </span>
                <span className={`font-semibold ${result.weightDiff > 0 ? "text-red-600" : "text-blue-600"}`}>
                  {Math.abs(result.weightDiff)} kg
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400">
            아시아-태평양 기준 (대한비만학회). 전문 의료인의 진단을 대체하지 않습니다.
          </p>
        </div>
      )}
    </div>
  );
}
