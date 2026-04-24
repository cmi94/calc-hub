"use client";

import { useState } from "react";
import { calculateDueDate, type DueDateResult } from "@/lib/calculators/dueDate";

export default function DueDateCalculator() {
  const [lmpDate, setLmpDate] = useState("");
  const [result, setResult] = useState<DueDateResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!lmpDate) {
      setError("마지막 생리 시작일을 입력해주세요.");
      return;
    }
    const lmp = new Date(lmpDate);
    if (isNaN(lmp.getTime())) {
      setError("날짜 형식이 올바르지 않습니다.");
      return;
    }
    const today = new Date();
    if (lmp > today) {
      setError("마지막 생리 시작일은 오늘보다 이전이어야 합니다.");
      return;
    }
    setError("");
    setResult(calculateDueDate({ lmpDate }));
  }

  const trimesterColors: Record<1 | 2 | 3, string> = {
    1: "bg-green-50 text-green-700",
    2: "bg-blue-50 text-blue-700",
    3: "bg-purple-50 text-purple-700",
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            마지막 생리 시작일 (LMP)
          </label>
          <input
            type="date"
            value={lmpDate}
            onChange={(e) => { setLmpDate(e.target.value); setError(""); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            <p className="text-sm font-medium text-blue-700 mb-1">출산예정일</p>
            <p className="text-2xl font-bold text-blue-900">{result.dueDateFormatted}</p>
            {result.daysUntilDue > 0 ? (
              <p className="text-sm text-blue-600 mt-1">D-{result.daysUntilDue}일</p>
            ) : (
              <p className="text-sm text-gray-500 mt-1">출산예정일이 지났습니다</p>
            )}
          </div>

          <div className={`rounded-xl p-3 text-center text-sm font-medium ${trimesterColors[result.trimester]}`}>
            {result.trimesterName}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">임신 주수</span>
              <span className="font-semibold">{result.gestationalWeeks}주</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">임신 일수</span>
              <span className="font-semibold">{result.gestationalDays}일</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">출산예정일까지</span>
              <span className="font-semibold">
                {result.daysUntilDue > 0 ? `${result.daysUntilDue}일 남음` : `${Math.abs(result.daysUntilDue)}일 지남`}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Naegele&apos;s rule (LMP + 280일) 기준. 실제 출산예정일은 산부인과 초음파 검사로 확인하세요.
          </p>
        </div>
      )}
    </div>
  );
}
