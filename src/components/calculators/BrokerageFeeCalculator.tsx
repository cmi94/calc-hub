"use client";

import { useState } from "react";
import { calculateBrokerageFee, type TransactionType, type BrokerageFeeResult } from "@/lib/calculators/brokerageFee";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

function formatRate(rate: number): string {
  return (rate * 100).toFixed(1) + "%";
}

const TRANSACTION_TYPES: { value: TransactionType; label: string }[] = [
  { value: "buy-sell", label: "매매" },
  { value: "rent-jeonse", label: "전세" },
  { value: "rent-monthly", label: "월세" },
];

export default function BrokerageFeeCalculator() {
  const [transactionType, setTransactionType] = useState<TransactionType>("buy-sell");
  const [price, setPrice] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [result, setResult] = useState<BrokerageFeeResult | null>(null);
  const [error, setError] = useState("");

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setPrice(raw ? Number(raw).toLocaleString("ko-KR") : "");
    setResult(null);
    setError("");
  }

  function handleRentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setMonthlyRent(raw ? Number(raw).toLocaleString("ko-KR") : "");
    setResult(null);
    setError("");
  }

  function handleCalculate() {
    const priceNum = Number(price.replace(/,/g, ""));
    const rentNum = Number(monthlyRent.replace(/,/g, ""));

    if (!priceNum || priceNum < 100_000) {
      setError(transactionType === "rent-monthly" ? "보증금을 입력해주세요." : "거래금액을 입력해주세요.");
      return;
    }
    if (transactionType === "rent-monthly" && !rentNum) {
      setError("월세를 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateBrokerageFee({
      transactionType,
      price: priceNum,
      monthlyRent: rentNum,
    }));
  }

  const priceLabel =
    transactionType === "buy-sell" ? "매매가격" :
    transactionType === "rent-jeonse" ? "전세금" : "보증금";

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* 거래유형 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">거래 유형</label>
          <div className="grid grid-cols-3 gap-2">
            {TRANSACTION_TYPES.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setTransactionType(opt.value); setResult(null); setError(""); }}
                className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  transactionType === opt.value
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-700 hover:border-blue-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 금액 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{priceLabel}</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={handlePriceChange}
              placeholder="예: 300,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>

        {/* 월세 입력 */}
        {transactionType === "rent-monthly" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">월세</label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={monthlyRent}
                onChange={handleRentChange}
                placeholder="예: 1,000,000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">환산가 = 보증금 + 월세 × 100</p>
          </div>
        )}

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
            <p className="text-sm text-blue-600 font-medium mb-1">법정 상한 수수료</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.recommendedFee)}</p>
            <p className="text-sm text-blue-500 mt-1">상한 요율 {formatRate(result.maxRate)}</p>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            {transactionType === "rent-monthly" && (
              <div className="flex justify-between py-2.5">
                <span className="text-gray-600">환산 거래금액</span>
                <span>{formatKRW(result.effectivePrice)}</span>
              </div>
            )}
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">상한 요율</span>
              <span>{formatRate(result.maxRate)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">요율 적용 수수료</span>
              <span>{formatKRW(result.maxFee)}</span>
            </div>
            {result.limitFee !== null && (
              <div className="flex justify-between py-2.5">
                <span className="text-gray-600">한도액</span>
                <span>{formatKRW(result.limitFee)}</span>
              </div>
            )}
            <div className="flex justify-between py-2.5 font-semibold">
              <span>최종 상한 수수료</span>
              <span className="text-blue-600">{formatKRW(result.recommendedFee)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            공인중개사법 시행규칙 별표 기준. 실제 수수료는 중개사와 협의하며 상한액을 초과할 수 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
