"use client";

import { useState } from "react";
import { calculateSalary, type SalaryResult } from "@/lib/calculators/salary";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

const DEDUCTION_LABELS: { key: keyof SalaryResult; label: string }[] = [
  { key: "nationalPension", label: "국민연금" },
  { key: "healthInsurance", label: "건강보험" },
  { key: "longTermCare", label: "장기요양보험" },
  { key: "employmentInsurance", label: "고용보험" },
  { key: "incomeTax", label: "근로소득세" },
  { key: "localIncomeTax", label: "지방소득세" },
];

export default function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState("");
  const [dependents, setDependents] = useState("1");
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const salary = Number(annualSalary.replace(/,/g, ""));
    if (!salary || salary < 1_000_000) {
      setError("연봉을 100만원 이상 입력해주세요.");
      setResult(null);
      return;
    }
    setError("");
    setResult(calculateSalary({ annualSalary: salary, dependents: Number(dependents) }));
  }

  function handleSalaryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setAnnualSalary(raw ? Number(raw).toLocaleString("ko-KR") : "");
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* 입력 영역 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            연봉 (세전)
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={annualSalary}
              onChange={handleSalaryChange}
              placeholder="예: 40,000,000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            부양가족 수 <span className="text-gray-400 font-normal">(본인 포함)</span>
          </label>
          <select
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}명</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          계산하기
        </button>
      </div>

      {/* 결과 영역 */}
      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          {/* 핵심 결과 */}
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">월 실수령액</p>
            <p className="text-3xl font-bold text-blue-700">
              {formatKRW(result.monthlyNetSalary)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              연 {formatKRW(result.annualNetSalary)}
            </p>
          </div>

          {/* 공제 내역 */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">월 공제 내역</p>
            <div className="divide-y divide-gray-100">
              <div className="flex justify-between py-2 text-sm text-gray-500">
                <span>월 급여</span>
                <span>{formatKRW(result.monthlySalary)}</span>
              </div>
              {DEDUCTION_LABELS.map(({ key, label }) => (
                <div key={key} className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">{label}</span>
                  <span className="text-red-500">- {formatKRW(result[key] as number)}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 text-sm font-semibold">
                <span className="text-gray-700">총 공제액</span>
                <span className="text-red-600">- {formatKRW(result.totalDeduction)}</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-base">
                <span>실수령액</span>
                <span className="text-blue-600">{formatKRW(result.monthlyNetSalary)}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            2026년 기준 요율 적용. 실제 수령액은 회사 규정 및 개인 상황에 따라 다를 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
