"use client";

import { useState } from "react";
import {
  calculateMilitaryDischarge,
  SERVICE_PERIODS,
  type MilitaryDischargeResult,
} from "@/lib/calculators/militaryDischarge";

export default function MilitaryDischargeCalculator() {
  const [enlistmentDate, setEnlistmentDate] = useState("");
  const [branchKey, setBranchKey] = useState("army");
  const [result, setResult] = useState<MilitaryDischargeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!enlistmentDate) {
      setError("입대일을 입력해주세요.");
      return;
    }
    const enlist = new Date(enlistmentDate);
    if (isNaN(enlist.getTime())) {
      setError("날짜 형식이 올바르지 않습니다.");
      return;
    }
    setError("");
    setResult(calculateMilitaryDischarge({ enlistmentDate, branchKey }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">입대일</label>
          <input
            type="date"
            value={enlistmentDate}
            onChange={(e) => { setEnlistmentDate(e.target.value); setError(""); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">병종</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(SERVICE_PERIODS).map(([key, { label, months }]) => (
              <button
                key={key}
                onClick={() => { setBranchKey(key); setError(""); setResult(null); }}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors text-left ${branchKey === key ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
              >
                {label} ({months}개월)
              </button>
            ))}
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
          <div className={`rounded-xl p-4 text-center ${result.isCompleted ? "bg-green-50" : "bg-blue-50"}`}>
            <p className={`text-sm font-medium mb-1 ${result.isCompleted ? "text-green-700" : "text-blue-700"}`}>
              {result.isCompleted ? "전역 완료" : "전역일"}
            </p>
            <p className={`text-2xl font-bold ${result.isCompleted ? "text-green-900" : "text-blue-900"}`}>
              {result.dischargeDateFormatted}
            </p>
            {!result.isCompleted && (
              <p className="text-sm text-blue-600 mt-1">D-{result.daysRemaining}일</p>
            )}
          </div>

          {/* 진행률 바 */}
          {!result.isCompleted && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>복무 진행률</span>
                <span>{result.progressPct}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${result.progressPct}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">병종</span>
              <span className="font-semibold">{result.branchLabel}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">총 복무일수</span>
              <span className="font-semibold">{result.serviceDays.toLocaleString("ko-KR")}일</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">복무한 일수</span>
              <span className="font-semibold">{result.daysServed.toLocaleString("ko-KR")}일</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">남은 일수</span>
              <span className="font-semibold">{result.daysRemaining.toLocaleString("ko-KR")}일</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            병역법 제19조 기준 (2026년). 실제 전역일은 군 복무 규정에 따라 달라질 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
