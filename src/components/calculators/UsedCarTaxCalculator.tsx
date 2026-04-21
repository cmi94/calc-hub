"use client";

import { useState } from "react";
import { calculateUsedCarTax, type UsedCarTaxResult, type VehicleType } from "@/lib/calculators/usedCarTax";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

const VEHICLE_OPTIONS: { value: VehicleType; label: string }[] = [
  { value: "passenger", label: "승용차 (비영업용)" },
  { value: "van", label: "승합차" },
  { value: "truck", label: "화물차" },
  { value: "electric", label: "전기차" },
];

export default function UsedCarTaxCalculator() {
  const [price, setPrice] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType>("passenger");
  const [result, setResult] = useState<UsedCarTaxResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const amount = Number(price.replace(/,/g, ""));
    if (!amount || amount < 100_000) {
      setError("차량 가격을 10만원 이상 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateUsedCarTax({ price: amount, vehicleType }));
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setPrice(raw ? Number(raw).toLocaleString("ko-KR") : "");
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">차종</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {VEHICLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            차량 가격 <span className="text-gray-400 font-normal">(시가표준액 또는 실거래가)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={handlePriceChange}
              placeholder="예: 20,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

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
            <p className="text-sm text-blue-600 font-medium mb-1">총 납부 세액</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.totalTax)}</p>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">과세표준</span>
              <span>{formatKRW(result.taxBase)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">취득세율</span>
              <span>{(result.taxRate * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">취득세</span>
              <span>{formatKRW(result.acquisitionTax)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">지방교육세 (취득세 × 20%)</span>
              <span>{formatKRW(result.localEduTax)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>총 납부 세액</span>
              <span className="text-blue-600">{formatKRW(result.totalTax)}</span>
            </div>
          </div>

          {vehicleType === "electric" && (
            <div className="bg-green-50 rounded-xl p-3 text-sm text-green-700">
              전기차 취득세 감면 140만원 적용 (지방세특례제한법 제66조)
            </div>
          )}

          <p className="text-xs text-gray-400">
            지방세법 기준. 실제 납부액은 관할 지자체 기준에 따라 다를 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
