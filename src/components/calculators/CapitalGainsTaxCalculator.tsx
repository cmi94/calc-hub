"use client";

import { useState } from "react";
import { calculateCapitalGainsTax, type HouseCount, type CapitalGainsTaxResult } from "@/lib/calculators/capitalGainsTax";

const fmt = (n: number) => n.toLocaleString() + "원";
const pct = (r: number) => (r * 100).toFixed(1) + "%";

export default function CapitalGainsTaxCalculator() {
  const [transferPrice, setTransferPrice] = useState("");
  const [acquisitionPrice, setAcquisitionPrice] = useState("");
  const [necessaryExpenses, setNecessaryExpenses] = useState("0");
  const [holdingYears, setHoldingYears] = useState("");
  const [residenceYears, setResidenceYears] = useState("0");
  const [houseCount, setHouseCount] = useState<HouseCount>("one");
  const [isAdjustedArea, setIsAdjustedArea] = useState(false);
  const [result, setResult] = useState<CapitalGainsTaxResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const tp = parseFloat(transferPrice.replace(/,/g, ""));
    const ap = parseFloat(acquisitionPrice.replace(/,/g, ""));
    const exp = parseFloat(necessaryExpenses.replace(/,/g, "") || "0");
    const hy = parseFloat(holdingYears);
    const ry = parseFloat(residenceYears || "0");

    if (!transferPrice || isNaN(tp) || tp <= 0) {
      setError("양도가액을 입력해주세요.");
      return;
    }
    if (!acquisitionPrice || isNaN(ap) || ap <= 0) {
      setError("취득가액을 입력해주세요.");
      return;
    }
    if (!holdingYears || isNaN(hy) || hy < 0) {
      setError("보유기간을 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateCapitalGainsTax({
      transferPrice: tp,
      acquisitionPrice: ap,
      necessaryExpenses: isNaN(exp) ? 0 : exp,
      holdingYears: hy,
      residenceYears: isNaN(ry) ? 0 : ry,
      houseCount,
      isAdjustedArea,
    }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">

        {/* 주택수 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">보유 주택수</label>
          <div className="flex gap-2">
            {(["one", "two", "three"] as HouseCount[]).map((v) => (
              <button
                key={v}
                onClick={() => { setHouseCount(v); setResult(null); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                  houseCount === v
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {v === "one" ? "1주택" : v === "two" ? "2주택" : "3주택+"}
              </button>
            ))}
          </div>
        </div>

        {/* 조정지역 */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">조정대상지역</label>
          <button
            onClick={() => { setIsAdjustedArea(!isAdjustedArea); setResult(null); setError(""); }}
            className={`relative w-12 h-6 rounded-full transition-colors ${isAdjustedArea ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${isAdjustedArea ? "left-7" : "left-1"}`} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">양도가액 (원)</label>
          <input
            type="text"
            value={transferPrice}
            onChange={(e) => { setTransferPrice(e.target.value); setResult(null); setError(""); }}
            placeholder="예: 800000000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">취득가액 (원)</label>
          <input
            type="text"
            value={acquisitionPrice}
            onChange={(e) => { setAcquisitionPrice(e.target.value); setResult(null); setError(""); }}
            placeholder="예: 500000000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">필요경비 (원)</label>
          <input
            type="text"
            value={necessaryExpenses}
            onChange={(e) => { setNecessaryExpenses(e.target.value); setResult(null); setError(""); }}
            placeholder="등기비용, 중개수수료 등"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">보유기간 (년)</label>
            <input
              type="number"
              value={holdingYears}
              onChange={(e) => { setHoldingYears(e.target.value); setResult(null); setError(""); }}
              placeholder="예: 5"
              step="0.5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">거주기간 (년)</label>
            <input
              type="number"
              value={residenceYears}
              onChange={(e) => { setResidenceYears(e.target.value); setResult(null); setError(""); }}
              placeholder="예: 3"
              step="0.5"
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
          {result.isExempt ? (
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
              <p className="text-lg font-bold text-green-700">비과세</p>
              <p className="text-sm text-green-600 mt-1">{result.exemptReason}</p>
              <p className="text-2xl font-bold text-green-700 mt-2">납부세액 0원</p>
            </div>
          ) : (
            <>
              {result.warning && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-700">
                  {result.warning}
                </div>
              )}

              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-blue-600 font-medium mb-1">총 납부세액</p>
                <p className="text-3xl font-bold text-blue-700">{fmt(result.totalTax)}</p>
              </div>

              <div className="divide-y divide-gray-100 text-sm">
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-600">양도차익</span>
                  <span className="font-semibold">{fmt(result.capitalGain)}</span>
                </div>
                {result.longTermDeductionRate > 0 && (
                  <div className="flex justify-between py-2.5">
                    <span className="text-gray-600">장기보유특별공제 ({pct(result.longTermDeductionRate)})</span>
                    <span className="font-semibold text-green-600">- {fmt(result.longTermDeduction)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-600">기본공제</span>
                  <span className="font-semibold text-green-600">- {fmt(result.basicDeduction)}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-600">과세표준</span>
                  <span className="font-semibold">{fmt(result.taxableIncome)}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-600">세율</span>
                  <span className="font-semibold">{pct(result.taxRate)}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-600">양도소득세</span>
                  <span className="font-semibold">{fmt(result.calculatedTax)}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-600">지방소득세 (10%)</span>
                  <span className="font-semibold">{fmt(result.localIncomeTax)}</span>
                </div>
              </div>
            </>
          )}

          <p className="text-xs text-gray-400">
            소득세법 제94조 기준. 실제 세액은 세무사 상담을 권장합니다.
          </p>
        </div>
      )}
    </div>
  );
}
