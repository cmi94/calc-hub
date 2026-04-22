"use client";

import { useState } from "react";
import {
  calculatePropertyAcquisitionTax,
  type HouseCount,
  type PropertyAcquisitionTaxResult,
} from "@/lib/calculators/propertyAcquisitionTax";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

function formatRate(rate: number): string {
  return (rate * 100).toFixed(2) + "%";
}

const HOUSE_COUNT_OPTIONS: { value: HouseCount; label: string }[] = [
  { value: "1", label: "1주택" },
  { value: "2", label: "2주택" },
  { value: "3plus", label: "3주택 이상" },
  { value: "corporate", label: "법인" },
];

export default function PropertyAcquisitionTaxCalculator() {
  const [price, setPrice] = useState("");
  const [houseCount, setHouseCount] = useState<HouseCount>("1");
  const [isAdjusted, setIsAdjusted] = useState(false);
  const [area, setArea] = useState("");
  const [result, setResult] = useState<PropertyAcquisitionTaxResult | null>(null);
  const [error, setError] = useState("");

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setPrice(raw ? Number(raw).toLocaleString("ko-KR") : "");
  }

  function handleCalculate() {
    const priceNum = Number(price.replace(/,/g, ""));
    const areaNum = Number(area);

    if (!priceNum || priceNum < 1_000_000) {
      setError("취득가액을 100만원 이상 입력해주세요.");
      return;
    }
    if (!area || areaNum <= 0 || areaNum > 1000) {
      setError("전용면적을 올바르게 입력해주세요. (1~1,000㎡)");
      return;
    }

    setError("");
    setResult(
      calculatePropertyAcquisitionTax({
        propertyPrice: priceNum,
        houseCount,
        isAdjusted,
        area: areaNum,
      })
    );
  }

  const showAdjustedToggle = houseCount === "2" || houseCount === "3plus";

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">

        {/* 취득가액 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">취득가액</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={handlePriceChange}
              placeholder="예: 500,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>

        {/* 주택수 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">취득 후 주택수</label>
          <div className="grid grid-cols-2 gap-2">
            {HOUSE_COUNT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setHouseCount(opt.value);
                  setIsAdjusted(false);
                  setResult(null);
                }}
                className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  houseCount === opt.value
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-700 hover:border-blue-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 조정대상지역 토글 (2주택, 3주택이상만 표시) */}
        {showAdjustedToggle && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">조정대상지역</p>
              <p className="text-xs text-gray-400 mt-0.5">서울 전역, 경기 일부 등 해당 시 선택</p>
            </div>
            <button
              onClick={() => { setIsAdjusted(!isAdjusted); setResult(null); }}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isAdjusted ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  isAdjusted ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        )}

        {/* 전용면적 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">전용면적</label>
          <div className="relative">
            <input
              type="number"
              value={area}
              onChange={(e) => { setArea(e.target.value); setResult(null); }}
              placeholder="예: 84.9"
              step="0.1"
              min="1"
              max="1000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">㎡</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">85㎡ 초과 시 농어촌특별세 부과</p>
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
          {/* 합계 강조 */}
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">총 납부세액</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.totalTax)}</p>
            <p className="text-sm text-blue-500 mt-1">취득세율 {formatRate(result.taxRate)}</p>
          </div>

          {/* 세목별 내역 */}
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">취득세</span>
              <span className="font-medium">{formatKRW(result.acquisitionTax)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">지방교육세 <span className="text-xs text-gray-400">(취득세 × 10%)</span></span>
              <span>{formatKRW(result.localEducationTax)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">
                농어촌특별세
                <span className="text-xs text-gray-400 ml-1">
                  {result.ruralSpecialTax > 0 ? "(취득세 × 20%)" : "(85㎡ 이하 비과세)"}
                </span>
              </span>
              <span>{formatKRW(result.ruralSpecialTax)}</span>
            </div>
            <div className="flex justify-between py-2.5 font-semibold">
              <span>합계</span>
              <span className="text-blue-600">{formatKRW(result.totalTax)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            지방세법 제11조 기준. 일시적 2주택, 생애최초 감면 등 개별 감면은 반영되지 않습니다.
          </p>
        </div>
      )}
    </div>
  );
}
