"use client";

import { useState } from "react";
import { calculateGiftTax, type DonorRelation, type GiftTaxResult } from "@/lib/calculators/giftTax";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

function formatRate(rate: number): string {
  return (rate * 100).toFixed(2) + "%";
}

const RELATIONS: { value: DonorRelation; label: string; deduction: string }[] = [
  { value: "spouse", label: "배우자", deduction: "6억 공제" },
  { value: "lineal-ascend", label: "직계존속", deduction: "5천만 공제" },
  { value: "lineal-descend", label: "직계비속", deduction: "성인 5천만 / 미성년 2천만" },
  { value: "other-relative", label: "기타 친족", deduction: "1천만 공제" },
  { value: "other", label: "타인", deduction: "공제 없음" },
];

export default function GiftTaxCalculator() {
  const [giftAmount, setGiftAmount] = useState("");
  const [relation, setRelation] = useState<DonorRelation>("lineal-ascend");
  const [isMinor, setIsMinor] = useState(false);
  const [priorGifts, setPriorGifts] = useState("");
  const [result, setResult] = useState<GiftTaxResult | null>(null);
  const [error, setError] = useState("");

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setGiftAmount(raw ? Number(raw).toLocaleString("ko-KR") : "");
    setResult(null);
  }

  function handlePriorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setPriorGifts(raw ? Number(raw).toLocaleString("ko-KR") : "");
    setResult(null);
  }

  function handleCalculate() {
    const amount = Number(giftAmount.replace(/,/g, ""));
    const prior = Number(priorGifts.replace(/,/g, "")) || 0;
    if (!amount || amount < 1) {
      setError("증여금액을 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateGiftTax({ giftAmount: amount, relation, isMinor, priorGifts: prior }));
  }

  const showMinorToggle = relation === "lineal-descend";

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* 증여자 관계 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">증여자와의 관계</label>
          <div className="space-y-2">
            {RELATIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  relation === opt.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="relation"
                    value={opt.value}
                    checked={relation === opt.value}
                    onChange={() => { setRelation(opt.value); setResult(null); setIsMinor(false); }}
                    className="text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                </div>
                <span className="text-xs text-gray-400">{opt.deduction}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 미성년자 여부 */}
        {showMinorToggle && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">미성년자</p>
              <p className="text-xs text-gray-400 mt-0.5">직계비속이 미성년자인 경우 공제 2천만원</p>
            </div>
            <button
              onClick={() => { setIsMinor(!isMinor); setResult(null); }}
              className={`relative w-12 h-6 rounded-full overflow-hidden transition-colors ${
                isMinor ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                isMinor ? "translate-x-7" : "translate-x-1"
              }`} />
            </button>
          </div>
        )}

        {/* 증여금액 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">증여금액</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={giftAmount}
              onChange={handleAmountChange}
              placeholder="예: 100,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>

        {/* 이전 증여액 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            10년 이내 이전 증여액 <span className="text-xs text-gray-400">(동일인, 없으면 0)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={priorGifts}
              onChange={handlePriorChange}
              placeholder="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
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
            <p className="text-sm text-blue-600 font-medium mb-1">납부 증여세</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.finalTax)}</p>
            {result.giftAmount > 0 && (
              <p className="text-sm text-blue-500 mt-1">실효세율 {formatRate(result.effectiveRate)}</p>
            )}
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">증여금액</span>
              <span>{formatKRW(result.giftAmount)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">증여재산공제</span>
              <span className="text-green-600">- {formatKRW(result.deduction)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">과세표준</span>
              <span>{formatKRW(result.taxableAmount)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">산출세액</span>
              <span>{formatKRW(result.taxBeforeCredit)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">신고세액공제 <span className="text-xs text-gray-400">(3%)</span></span>
              <span className="text-green-600">- {formatKRW(result.taxCredit)}</span>
            </div>
            <div className="flex justify-between py-2.5 font-semibold">
              <span>최종 납부세액</span>
              <span className="text-blue-600">{formatKRW(result.finalTax)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            상속세 및 증여세법 제26조, 제53조 기준. 증여세 신고는 증여일로부터 3개월 이내.
          </p>
        </div>
      )}
    </div>
  );
}
