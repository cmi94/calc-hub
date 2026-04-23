"use client";

import { useState } from "react";
import { calculateAge, type AgeResult } from "@/lib/calculators/age";

export default function AgeCalculator() {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [birthDate, setBirthDate] = useState("");
  const [referenceDate, setReferenceDate] = useState(todayStr);
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!birthDate) {
      setError("생년월일을 입력해주세요.");
      return;
    }
    const birth = new Date(birthDate);
    const ref = new Date(referenceDate);
    if (isNaN(birth.getTime())) {
      setError("올바른 생년월일을 입력해주세요.");
      return;
    }
    if (birth > ref) {
      setError("생년월일이 기준일보다 이후일 수 없습니다.");
      return;
    }
    setError("");
    setResult(calculateAge({ birthDate, referenceDate }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => { setBirthDate(e.target.value); setResult(null); }}
            max={todayStr}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">기준일</label>
          <input
            type="date"
            value={referenceDate}
            onChange={(e) => { setReferenceDate(e.target.value); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">기본값: 오늘</p>
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
          {/* 만나이 강조 */}
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">만나이</p>
            <p className="text-4xl font-bold text-blue-700">{result.internationalAge}세</p>
            {result.isLeapBirthday && (
              <p className="text-xs text-blue-400 mt-1">2월 29일생 (평년 3월 1일 기준)</p>
            )}
          </div>

          {/* 나이 종류별 */}
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">만나이 <span className="text-xs text-gray-400">(법적 기준)</span></span>
              <span className="font-semibold">{result.internationalAge}세</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">한국 나이 <span className="text-xs text-gray-400">(세는나이)</span></span>
              <span className="font-semibold">{result.koreanAge}세</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">연나이 <span className="text-xs text-gray-400">({result.referenceDate.slice(0, 4)}년 - 출생연도)</span></span>
              <span className="font-semibold">{result.yearAge}세</span>
            </div>
          </div>

          {/* 다음 생일 */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm">
            {result.daysUntilNextBirthday === 0 ? (
              <p className="text-center font-semibold text-blue-600">오늘이 생일입니다!</p>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">다음 생일 ({result.nextBirthdayDate})</span>
                <span className="font-semibold text-gray-800">{result.daysUntilNextBirthday.toLocaleString()}일 후</span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400">
            2023년 6월 만나이 통일법 시행 이후 법적·공식적 나이는 만나이 기준입니다.
          </p>
        </div>
      )}
    </div>
  );
}
