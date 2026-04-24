"use client";

import { useState } from "react";
import { calculateCarInstallment, type CarInstallmentResult } from "@/lib/calculators/carInstallment";

export default function CarInstallmentCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [downPaymentPct, setDownPaymentPct] = useState("20");
  const [annualRate, setAnnualRate] = useState("6.5");
  const [termMonths, setTermMonths] = useState("36");
  const [result, setResult] = useState<CarInstallmentResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const price = parseFloat(vehiclePrice.replace(/,/g, ""));
    const down = parseFloat(downPaymentPct);
    const rate = parseFloat(annualRate);
    const term = parseInt(termMonths, 10);

    if (!vehiclePrice || isNaN(price) || price <= 0) {
      setError("차량 가격을 입력해주세요.");
      return;
    }
    if (isNaN(down) || down < 0 || down >= 100) {
      setError("선수금 비율은 0~99% 범위로 입력해주세요.");
      return;
    }
    if (isNaN(rate) || rate < 0) {
      setError("연 금리를 입력해주세요.");
      return;
    }
    if (isNaN(term) || term < 1 || term > 120) {
      setError("할부 기간은 1~120개월 범위로 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateCarInstallment({ vehiclePrice: price, downPaymentPct: down, annualRate: rate, termMonths: term }));
  }

  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">차량 가격 (원)</label>
          <input
            type="number"
            value={vehiclePrice}
            onChange={(e) => { setVehiclePrice(e.target.value); setError(""); setResult(null); }}
            placeholder="예: 30000000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">선수금 (%)</label>
            <input
              type="number"
              value={downPaymentPct}
              onChange={(e) => { setDownPaymentPct(e.target.value); setError(""); setResult(null); }}
              placeholder="20"
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연 금리 (%)</label>
            <input
              type="number"
              value={annualRate}
              onChange={(e) => { setAnnualRate(e.target.value); setError(""); setResult(null); }}
              placeholder="6.5"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간 (개월)</label>
            <input
              type="number"
              value={termMonths}
              onChange={(e) => { setTermMonths(e.target.value); setError(""); setResult(null); }}
              placeholder="36"
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <p className="text-sm font-medium text-blue-700 mb-1">월 납입금</p>
            <p className="text-3xl font-bold text-blue-900">{fmt(result.monthlyPayment)}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">차량 가격</span>
              <span className="font-semibold">{fmt(result.vehiclePrice)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">선수금</span>
              <span className="font-semibold">{fmt(result.downPayment)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">할부원금</span>
              <span className="font-semibold">{fmt(result.loanAmount)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">총 납입금 (할부)</span>
              <span className="font-semibold">{fmt(result.totalPayment)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">총 이자</span>
              <span className="font-semibold text-orange-600">{fmt(result.totalInterest)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span className="text-gray-700">총 부담액 (선수금+할부)</span>
              <span className="text-blue-700">{fmt(result.totalCost)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            원리금균등상환 기준. 취득세·보험료·등록비 등 부대비용은 별도입니다.
          </p>
        </div>
      )}
    </div>
  );
}
