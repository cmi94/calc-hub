"use client";

import { useState } from "react";
import { calculateFuelEconomy, type FuelEconomyResult } from "@/lib/calculators/fuelEconomy";

export default function FuelEconomyCalculator() {
  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  const [fuelPrice, setFuelPrice] = useState("1650");
  const [monthlyDistance, setMonthlyDistance] = useState("");
  const [result, setResult] = useState<FuelEconomyResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const d = parseFloat(distance);
    const f = parseFloat(fuelUsed);
    const p = parseFloat(fuelPrice);
    const md = monthlyDistance ? parseFloat(monthlyDistance) : undefined;

    if (!distance || isNaN(d) || d <= 0) {
      setError("주행거리를 입력해주세요.");
      return;
    }
    if (!fuelUsed || isNaN(f) || f <= 0) {
      setError("주유량을 입력해주세요.");
      return;
    }
    if (!fuelPrice || isNaN(p) || p <= 0) {
      setError("연료 단가를 입력해주세요.");
      return;
    }
    if (md !== undefined && (isNaN(md) || md <= 0)) {
      setError("월 평균 주행거리를 올바르게 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateFuelEconomy({ distance: d, fuelUsed: f, fuelPrice: p, monthlyDistance: md }));
  }

  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">주행거리 (km)</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => { setDistance(e.target.value); setError(""); setResult(null); }}
              placeholder="예: 400"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">주유량 (L)</label>
            <input
              type="number"
              value={fuelUsed}
              onChange={(e) => { setFuelUsed(e.target.value); setError(""); setResult(null); }}
              placeholder="예: 32"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연료 단가 (원/L)</label>
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => { setFuelPrice(e.target.value); setError(""); setResult(null); }}
              placeholder="예: 1650"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">월 주행거리 (km, 선택)</label>
            <input
              type="number"
              value={monthlyDistance}
              onChange={(e) => { setMonthlyDistance(e.target.value); setError(""); setResult(null); }}
              placeholder="예: 1500"
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
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm font-medium text-blue-700 mb-1">연비</p>
            <p className="text-4xl font-bold text-blue-900">{result.fuelEfficiency} <span className="text-lg">km/L</span></p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">100km당 연료비</span>
              <span className="font-semibold">{fmt(result.costPer100km)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">km당 연료비</span>
              <span className="font-semibold">{result.costPerKm.toLocaleString("ko-KR")}원</span>
            </div>
            {result.monthlyFuelCost !== undefined && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">월 연료비 예상</span>
                <span className="font-semibold text-orange-600">{fmt(result.monthlyFuelCost)}</span>
              </div>
            )}
            {result.annualFuelCost !== undefined && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">연간 연료비 예상</span>
                <span className="font-semibold text-orange-600">{fmt(result.annualFuelCost)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
