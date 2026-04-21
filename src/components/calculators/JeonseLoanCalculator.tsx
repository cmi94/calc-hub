"use client";

import { useState } from "react";
import { calculateJeonseLoan, type JeonseLoanResult } from "@/lib/calculators/jeonseeLoan";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

export default function JeonseLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [termYears, setTermYears] = useState("2");
  const [result, setResult] = useState<JeonseLoanResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const amount = Number(loanAmount.replace(/,/g, ""));
    const rate = Number(annualRate);
    if (!amount || amount < 1_000_000) { setError("대출금액을 100만원 이상 입력해주세요."); return; }
    if (!rate || rate <= 0 || rate > 30) { setError("금리를 0~30% 사이로 입력해주세요."); return; }
    setError("");
    setResult(calculateJeonseLoan({ loanAmount: amount, annualRate: rate, termYears: Number(termYears) }));
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setLoanAmount(raw ? Number(raw).toLocaleString("ko-KR") : "");
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">대출금액</label>
          <div className="relative">
            <input type="text" inputMode="numeric" value={loanAmount} onChange={handleAmountChange}
              placeholder="예: 200,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연 금리</label>
            <div className="relative">
              <input type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)}
                placeholder="예: 3.5" step="0.1" min="0" max="30"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 text-right focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대출 기간</label>
            <select value={termYears} onChange={(e) => setTermYears(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {[1, 2, 3, 4, 5].map((y) => <option key={y} value={y}>{y}년</option>)}
            </select>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">월 이자</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.monthlyInterest)}</p>
          </div>
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">연 이자</span>
              <span>{formatKRW(result.annualInterest)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">총 이자 ({termYears}년)</span>
              <span className="text-red-500">{formatKRW(result.totalInterest)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>만기 시 상환 원금</span>
              <span>{formatKRW(result.loanAmount)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            이자만납입(만기 일시상환) 방식 기준. 변동금리 상품은 실제 이자가 달라질 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
