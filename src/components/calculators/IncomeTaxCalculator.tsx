"use client";

import { useState } from "react";
import { calculateIncomeTax, type IncomeTaxResult, type ExpenseType } from "@/lib/calculators/incomeTax";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState("");
  const [expenseType, setExpenseType] = useState<ExpenseType>("simple");
  const [actualExpense, setActualExpense] = useState("");
  const [result, setResult] = useState<IncomeTaxResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const income = Number(annualIncome.replace(/,/g, ""));
    if (!income || income < 1) { setError("연 소득을 입력해주세요."); return; }
    setError("");
    setResult(calculateIncomeTax({
      annualIncome: income,
      expenseType,
      actualExpense: Number(actualExpense.replace(/,/g, "")),
    }));
  }

  function handleNumberChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      setter(raw ? Number(raw).toLocaleString("ko-KR") : "");
      setError("");
    };
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">연 소득 (사업·프리랜서)</label>
          <div className="relative">
            <input type="text" inputMode="numeric" value={annualIncome} onChange={handleNumberChange(setAnnualIncome)}
              placeholder="예: 50,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">필요경비 적용 방식</label>
          <div className="space-y-2">
            {([
              { value: "simple", label: "단순경비율 (64.1%)", desc: "소규모 사업자·신규 프리랜서" },
              { value: "standard", label: "기준경비율 (15.7%)", desc: "일반 사업자" },
              { value: "actual", label: "실제 경비 직접 입력", desc: "장부를 작성한 경우" },
            ] as const).map((opt) => (
              <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer ${expenseType === opt.value ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}>
                <input type="radio" name="expenseType" value={opt.value}
                  checked={expenseType === opt.value}
                  onChange={() => setExpenseType(opt.value)}
                  className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                  <p className="text-xs text-gray-500">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {expenseType === "actual" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">실제 필요경비</label>
            <div className="relative">
              <input type="text" inputMode="numeric" value={actualExpense} onChange={handleNumberChange(setActualExpense)}
                placeholder="예: 15,000,000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">총 납부 세금 (소득세 + 지방소득세)</p>
            <p className="text-3xl font-bold text-blue-700">{formatKRW(result.totalTax)}</p>
          </div>
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">연 소득</span>
              <span>{formatKRW(result.annualIncome)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">필요경비</span>
              <span className="text-red-400">- {formatKRW(result.expense)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">사업소득금액</span>
              <span>{formatKRW(result.businessIncome)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">기본공제 (본인)</span>
              <span className="text-red-400">- {formatKRW(result.personalDeduction)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">과세표준</span>
              <span>{formatKRW(result.taxableIncome)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">적용 세율</span>
              <span>{(result.taxRate * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">종합소득세</span>
              <span>{formatKRW(result.calculatedTax)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">지방소득세</span>
              <span>{formatKRW(result.localIncomeTax)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>총 납부 세금</span>
              <span className="text-blue-600">{formatKRW(result.totalTax)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            프리랜서·기타자영업 업종 기준 간편 계산입니다. 실제 세액은 개인 상황·공제 항목에 따라 다릅니다.
          </p>
        </div>
      )}
    </div>
  );
}
