"use client";

import { useState } from "react";
import { calculateAreaConverter } from "@/lib/calculators/areaConverter";

export default function AreaConverterCalculator() {
  const [pyeongInput, setPyeongInput] = useState("");
  const [sqmInput, setSqmInput] = useState("");
  const [sqft, setSqft] = useState<number | null>(null);

  function handlePyeongChange(val: string) {
    setPyeongInput(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      const result = calculateAreaConverter({ value: num, unit: "pyeong" });
      setSqmInput(String(result.sqm));
      setSqft(result.sqft);
    } else {
      setSqmInput("");
      setSqft(null);
    }
  }

  function handleSqmChange(val: string) {
    setSqmInput(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      const result = calculateAreaConverter({ value: num, unit: "sqm" });
      setPyeongInput(String(result.pyeong));
      setSqft(result.sqft);
    } else {
      setPyeongInput("");
      setSqft(null);
    }
  }

  const pyeongNum = parseFloat(pyeongInput);
  const sqmNum = parseFloat(sqmInput);

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <p className="text-sm text-gray-500">어느 쪽에 입력해도 자동으로 환산됩니다.</p>

        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">평 (坪)</label>
            <input
              type="number"
              value={pyeongInput}
              onChange={(e) => handlePyeongChange(e.target.value)}
              placeholder="예: 32"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">㎡ (제곱미터)</label>
            <input
              type="number"
              value={sqmInput}
              onChange={(e) => handleSqmChange(e.target.value)}
              placeholder="예: 105.78"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 실시간 환산 결과 */}
        {!isNaN(pyeongNum) && !isNaN(sqmNum) && pyeongInput && sqmInput && (
          <div className="bg-blue-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700 font-medium">평</span>
              <span className="font-bold text-blue-900">{pyeongNum.toLocaleString("ko-KR")} 평</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-700 font-medium">㎡ (제곱미터)</span>
              <span className="font-bold text-blue-900">{sqmNum.toLocaleString("ko-KR")} ㎡</span>
            </div>
            {sqft !== null && (
              <div className="flex justify-between text-sm border-t border-blue-200 pt-3">
                <span className="text-blue-700 font-medium">sqft (제곱피트)</span>
                <span className="font-bold text-blue-900">{sqft.toLocaleString("ko-KR")} ft²</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 참고 환산표 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">자주 쓰는 평수 환산표</h3>
        <div className="space-y-1.5 text-sm">
          {[10, 20, 25, 30, 33, 40, 50, 60, 85].map((p) => {
            const r = calculateAreaConverter({ value: p, unit: "pyeong" });
            return (
              <div key={p} className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-700">{p}평</span>
                <span className="text-gray-500">{r.sqm} ㎡</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">1평 = 3.30579 ㎡ 기준</p>
    </div>
  );
}
