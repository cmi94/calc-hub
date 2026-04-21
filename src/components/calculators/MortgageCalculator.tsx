"use client";

import { useState } from "react";
import { calculateMortgage, type MortgageResult } from "@/lib/calculators/mortgage";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [termYears, setTermYears] = useState("30");
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [error, setError] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);

  function handleCalculate() {
    const amount = Number(loanAmount.replace(/,/g, ""));
    const rate = Number(annualRate);
    const years = Number(termYears);

    if (!amount || amount < 1_000_000) {
      setError("대출금액을 100만원 이상 입력해주세요.");
      return;
    }
    if (rate < 0 || rate > 30) {
      setError("금리를 0~30% 사이로 입력해주세요.");
      return;
    }
    if (!years || years < 1 || years > 50) {
      setError("대출 기간을 1~50년 사이로 입력해주세요.");
      return;
    }
    setError("");
    setShowSchedule(false);
    setResult(calculateMortgage({ loanAmount: amount, annualRate: rate, termYears: years }));
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setLoanAmount(raw ? Number(raw).toLocaleString("ko-KR") : "");
  }

  const scheduleToShow = result?.schedule.filter((_, i) => i % 12 === 0) ?? [];

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">대출금액</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={loanAmount}
              onChange={handleAmountChange}
              placeholder="예: 300,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연 금리</label>
            <div className="relative">
              <input
                type="number"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                placeholder="예: 4.5"
                step="0.1"
                min="0"
                max="30"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대출 기간</label>
            <select
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[10, 15, 20, 25, 30, 35, 40].map((y) => (
                <option key={y} value={y}>{y}년</option>
              ))}
            </select>
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
            <p className="text-sm text-blue-600 font-medium mb-1">월 상환액</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.monthlyPayment)}</p>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">총 상환액</span>
              <span>{formatKRW(result.totalPayment)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">총 이자</span>
              <span className="text-red-500">{formatKRW(result.totalInterest)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>월 상환액</span>
              <span className="text-blue-600">{formatKRW(result.monthlyPayment)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full text-sm text-blue-600 hover:text-blue-700 py-2 border border-blue-200 rounded-lg"
          >
            {showSchedule ? "연도별 스케줄 닫기" : "연도별 상환 스케줄 보기"}
          </button>

          {showSchedule && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-600 font-medium">연도</th>
                    <th className="text-right py-2 text-gray-600 font-medium">원금</th>
                    <th className="text-right py-2 text-gray-600 font-medium">이자</th>
                    <th className="text-right py-2 text-gray-600 font-medium">잔금</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {scheduleToShow.map((row) => (
                    <tr key={row.month}>
                      <td className="py-2">{row.month / 12}년차</td>
                      <td className="text-right">{formatKRW(row.principal)}</td>
                      <td className="text-right text-red-400">{formatKRW(row.interest)}</td>
                      <td className="text-right">{formatKRW(row.remainingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-xs text-gray-400">
            원리금균등상환 방식 기준. 변동금리 상품은 실제 상환액이 달라질 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
