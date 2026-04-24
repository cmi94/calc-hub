"use client";

import { useState } from "react";
import { calculateElectricityBill, type ElectricityResult } from "@/lib/calculators/electricityBill";

const fmt = (n: number) => n.toLocaleString() + "원";

const TIER_LABELS: Record<1 | 2 | 3, { label: string; color: string }> = {
  1: { label: "1구간 (200kWh 이하)", color: "text-green-600" },
  2: { label: "2구간 (201~400kWh)", color: "text-yellow-600" },
  3: { label: "3구간 (400kWh 초과)", color: "text-red-600" },
};

export default function ElectricityBillCalculator() {
  const [monthlyKwh, setMonthlyKwh] = useState("");
  const [includesTvFee, setIncludesTvFee] = useState(false);
  const [result, setResult] = useState<ElectricityResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const kwh = parseFloat(monthlyKwh);
    if (!monthlyKwh || isNaN(kwh) || kwh < 0) {
      setError("월 사용량을 입력해주세요.");
      return;
    }
    if (kwh > 10000) {
      setError("월 사용량은 10,000kWh 이하로 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateElectricityBill({ monthlyKwh: kwh, includesTvFee }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">월 사용량 (kWh)</label>
          <input
            type="number"
            value={monthlyKwh}
            onChange={(e) => { setMonthlyKwh(e.target.value); setResult(null); setError(""); }}
            placeholder="예: 300"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">전기요금 고지서의 당월 사용량을 입력하세요</p>
        </div>

        {/* TV 수신료 */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">TV 수신료 포함 (2,500원)</label>
          <button
            onClick={() => { setIncludesTvFee(!includesTvFee); setResult(null); }}
            className={`relative w-12 h-6 rounded-full transition-colors ${includesTvFee ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${includesTvFee ? "left-7" : "left-1"}`} />
          </button>
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
          {/* 총 청구액 강조 */}
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">이번 달 예상 전기요금</p>
            <p className="text-3xl font-bold text-blue-700">{fmt(result.totalBill)}</p>
            <p className={`text-sm font-medium mt-1 ${TIER_LABELS[result.tier].color}`}>
              {TIER_LABELS[result.tier].label} 적용
            </p>
          </div>

          {/* 세부 내역 */}
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">기본요금</span>
              <span className="font-semibold">{fmt(result.basicCharge)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">전력량요금 ({result.monthlyKwh.toLocaleString()} kWh)</span>
              <span className="font-semibold">{fmt(result.usageCharge)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">소계</span>
              <span className="font-semibold">{fmt(result.subtotal)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">부가가치세 (10%)</span>
              <span className="font-semibold">{fmt(result.vat)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">전력산업기반기금 (3.7%)</span>
              <span className="font-semibold">{fmt(result.powerFundLevy)}</span>
            </div>
            {result.tvFee > 0 && (
              <div className="flex justify-between py-2.5">
                <span className="text-gray-600">TV 수신료</span>
                <span className="font-semibold">{fmt(result.tvFee)}</span>
              </div>
            )}
            <div className="flex justify-between py-2.5 font-semibold">
              <span>청구 합계</span>
              <span className="text-blue-700">{fmt(result.totalBill)}</span>
            </div>
          </div>

          {/* 평균 단가 */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm flex justify-between">
            <span className="text-gray-600">평균 단가</span>
            <span className="font-semibold">{result.avgUnitPrice.toLocaleString()}원/kWh</span>
          </div>

          {/* 누진 구간 안내 */}
          <div className="text-sm space-y-1.5">
            <p className="text-gray-500 font-medium text-xs">누진구간 안내</p>
            {([
              { tier: "1구간", range: "200kWh 이하", basic: "910원", rate: "120.0원/kWh" },
              { tier: "2구간", range: "201~400kWh", basic: "1,600원", rate: "214.6원/kWh" },
              { tier: "3구간", range: "400kWh 초과", basic: "7,300원", rate: "307.3원/kWh" },
            ]).map((item) => (
              <div key={item.tier} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-12 text-gray-700 font-medium">{item.tier}</span>
                <span className="w-24">{item.range}</span>
                <span>기본 {item.basic} / {item.rate}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400">
            2024년 한전 주택용 저압 전력 요금 기준. 실제 청구액은 계절별 할인·지원금에 따라 다를 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
