"use client";

import { useState } from "react";
import { calculateNameStrokes, type NameStrokesResult } from "@/lib/calculators/nameStrokes";

function ratingColor(rating: string): string {
  switch (rating) {
    case "대길": return "bg-yellow-400 text-yellow-900";
    case "길": return "bg-green-500 text-white";
    case "평": return "bg-gray-400 text-white";
    case "흉": return "bg-orange-500 text-white";
    case "대흉": return "bg-red-600 text-white";
    default: return "bg-gray-400 text-white";
  }
}

export default function NameStrokesCalculator() {
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [result, setResult] = useState<NameStrokesResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!surname.trim() || !givenName.trim()) {
      setError("성과 이름을 모두 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateNameStrokes({ surname: surname.trim(), givenName: givenName.trim() }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">성 (姓)</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => { setSurname(e.target.value); setResult(null); setError(""); }}
              placeholder="예: 김"
              maxLength={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름 (名)</label>
            <input
              type="text"
              value={givenName}
              onChange={(e) => { setGivenName(e.target.value); setResult(null); setError(""); }}
              placeholder="예: 민준"
              maxLength={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          획수 풀이 보기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{surname}{givenName}</p>
              <p className="text-sm text-gray-500 mt-0.5">총 획수: {result.totalStrokes}획</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${ratingColor(result.overallRating)}`}>
              {result.overallRating}
            </span>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">글자별 획수</p>
            <div className="flex gap-3">
              {[...result.surnameStrokes, ...result.givenNameStrokes].map((ch, i) => (
                <div key={i} className="flex-1 bg-indigo-50 rounded-xl p-3 text-center border border-indigo-100">
                  <p className="text-2xl font-bold text-indigo-700">{ch.char}</p>
                  <p className="text-xs text-indigo-500 mt-1">{ch.strokes}획</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">4격 수리</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "원격", strokes: result.wonGyeok, suri: result.wonSuri },
                { name: "형격", strokes: result.hyeongGyeok, suri: result.hyeongSuri },
                { name: "이격", strokes: result.iGyeok, suri: result.iSuri },
                { name: "정격", strokes: result.jeongGyeok, suri: result.jeongSuri },
              ].map((g, i) => (
                <div key={i} className={`rounded-xl p-3 border ${ratingColor(g.suri.type)}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold">{g.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ratingColor(g.suri.type)}`}>
                      {g.suri.type}
                    </span>
                  </div>
                  <p className="text-xs font-semibold">{g.strokes}수({g.suri.number}): {g.suri.type}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{g.suri.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400">이름 획수 풀이는 재미 목적입니다. 한자 획수에 따라 결과가 다를 수 있습니다.</p>
        </div>
      )}
    </div>
  );
}
