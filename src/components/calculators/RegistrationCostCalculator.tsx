"use client";

import { useState } from "react";
import { calculateRegistrationCost, type RegistrationCostResult } from "@/lib/calculators/registrationCost";

export default function RegistrationCostCalculator() {
  const [propertyPrice, setPropertyPrice] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [result, setResult] = useState<RegistrationCostResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const price = parseFloat(propertyPrice.replace(/,/g, ""));
    if (!propertyPrice || isNaN(price)) {
      setError("취득가액을 입력해주세요.");
      return;
    }
    if (price <= 0) {
      setError("취득가액은 0원보다 커야 합니다.");
      return;
    }
    setError("");
    setResult(calculateRegistrationCost({ propertyPrice: price, isOnline }));
  }

  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";
  const pct = (r: number) => (r * 100).toFixed(1) + "%";

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">취득가액 (원)</label>
          <input
            type="number"
            value={propertyPrice}
            onChange={(e) => { setPropertyPrice(e.target.value); setError(""); setResult(null); }}
            placeholder="예: 300000000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setIsOnline(false); setError(""); }}
            className={`flex-1 py-2 rounded-lg border font-medium text-sm transition-colors ${!isOnline ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
          >
            방문 신청
          </button>
          <button
            onClick={() => { setIsOnline(true); setError(""); }}
            className={`flex-1 py-2 rounded-lg border font-medium text-sm transition-colors ${isOnline ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
          >
            온라인 신청
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
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm font-medium text-blue-700 mb-1">총 등기비용 (예상)</p>
            <p className="text-3xl font-bold text-blue-900">{fmt(result.total)}</p>
            <p className="text-xs text-blue-600 mt-1">채권 할인 부담금 기준</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">등록면허세</span>
              <span className="font-semibold">{fmt(result.registrationTax)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">지방교육세</span>
              <span className="font-semibold">{fmt(result.localEducationTax)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">국민주택채권 매입액</span>
              <span className="font-semibold">{fmt(result.nationalHousingBondAmount)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">채권 할인 부담금 (실부담)</span>
              <span className="font-semibold text-orange-600">{fmt(result.bondDiscountCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">등기신청 수수료</span>
              <span className="font-semibold">{fmt(result.registrationFee)}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-500 text-xs">
              <span>적용 채권매입률</span>
              <span>{pct(result.bondRate)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            지방세법 제23조·제28조 기준. 법무사 수수료 등 부대비용은 별도. 실제 비용과 차이가 있을 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
