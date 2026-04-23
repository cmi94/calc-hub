"use client";

import { useState } from "react";
import { generateLotto, getBallColor, type LottoResult } from "@/lib/calculators/lotto";

function Ball({ number }: { number: number }) {
  return (
    <span
      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
      style={{ backgroundColor: getBallColor(number) }}
    >
      {number}
    </span>
  );
}

export default function LottoCalculator() {
  const [setCount, setSetCount] = useState(5);
  const [fixedInput, setFixedInput] = useState("");
  const [excludeInput, setExcludeInput] = useState("");
  const [result, setResult] = useState<LottoResult | null>(null);
  const [error, setError] = useState("");

  function parseNumbers(raw: string): number[] {
    return raw
      .split(/[,\s]+/)
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 45);
  }

  function handleGenerate() {
    const fixed = fixedInput ? parseNumbers(fixedInput) : [];
    const exclude = excludeInput ? parseNumbers(excludeInput) : [];

    const fixedUnique = [...new Set(fixed)];
    const excludeUnique = [...new Set(exclude)];

    if (fixedUnique.length > 5) {
      setError("고정 번호는 최대 5개까지 설정할 수 있습니다.");
      return;
    }
    if (fixedUnique.some((n) => excludeUnique.includes(n))) {
      setError("고정 번호와 제외 번호가 겹칩니다.");
      return;
    }

    setError("");
    setResult(generateLotto({ setCount, fixedNumbers: fixedUnique, excludeNumbers: excludeUnique }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* 게임 수 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            게임 수: <span className="text-blue-600 font-semibold">{setCount}게임</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <button
                key={n}
                onClick={() => setSetCount(n)}
                className={`w-9 h-9 rounded-lg border text-sm font-medium transition-colors ${
                  setCount === n
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-600 hover:border-blue-400"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* 고정 번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            고정 번호 <span className="text-xs text-gray-400">(최대 5개, 쉼표 또는 공백 구분)</span>
          </label>
          <input
            type="text"
            value={fixedInput}
            onChange={(e) => setFixedInput(e.target.value)}
            placeholder="예: 7, 14, 21"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 제외 번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            제외 번호 <span className="text-xs text-gray-400">(쉼표 또는 공백 구분)</span>
          </label>
          <input
            type="text"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            placeholder="예: 1, 2, 3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          번호 생성하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className="space-y-3">
            {result.sets.map((set, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-6 text-right">{String.fromCharCode(65 + i)}</span>
                <div className="flex gap-1.5 flex-wrap">
                  {set.numbers.map((n) => (
                    <Ball key={n} number={n} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 공 색상 범례 */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
            {[
              { range: "1~10", color: "#FFC107", label: "노랑" },
              { range: "11~20", color: "#2196F3", label: "파랑" },
              { range: "21~30", color: "#F44336", label: "빨강" },
              { range: "31~40", color: "#9E9E9E", label: "회색" },
              { range: "41~45", color: "#4CAF50", label: "초록" },
            ].map((c) => (
              <div key={c.range} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: c.color }} />
                <span>{c.range}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            className="w-full text-sm text-blue-600 hover:text-blue-700 py-2 border border-blue-200 rounded-lg transition-colors"
          >
            다시 뽑기
          </button>

          <p className="text-xs text-gray-400 text-center">
            재미용 번호 생성기입니다. 당첨을 보장하지 않습니다.
          </p>
        </div>
      )}
    </div>
  );
}
