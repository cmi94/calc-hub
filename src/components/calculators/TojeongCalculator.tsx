"use client";

import { useState } from "react";
import { calculateTojeong, type TojeongResult, type TojeongInput } from "@/lib/calculators/tojeong";

const MONTHS_KO = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function StarRating({ score }: { score: number }) {
  const stars = Math.round(score / 20);
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < stars ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}>★</span>
      ))}
    </div>
  );
}

function monthBg(score: number): string {
  if (score >= 80) return "bg-green-50 border-green-200 text-green-800";
  if (score >= 60) return "bg-blue-50 border-blue-200 text-blue-800";
  if (score >= 40) return "bg-gray-50 border-gray-200 text-gray-700";
  return "bg-orange-50 border-orange-200 text-orange-800";
}

export default function TojeongCalculator() {
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<TojeongResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const year = Number(birthYear);
    if (!year || year < 1900 || year > 2010) {
      setError("출생연도를 올바르게 입력해주세요. (1900~2010)");
      return;
    }
    setError("");
    const input: TojeongInput = {
      birthYear: year,
      birthMonth: Number(birthMonth),
      birthDay: Number(birthDay),
      gender,
    };
    setResult(calculateTojeong(input));
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">출생연도</label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => { setBirthYear(e.target.value); setResult(null); setError(""); }}
              placeholder="예: 1990"
              min={1900}
              max={2010}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">월</label>
            <select
              value={birthMonth}
              onChange={(e) => { setBirthMonth(e.target.value); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {MONTHS_KO.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">일</label>
            <select
              value={birthDay}
              onChange={(e) => { setBirthDay(e.target.value); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}일</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
          <div className="flex gap-2">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => { setGender(g); setResult(null); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                  gender === g
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-amber-400"
                }`}
              >
                {g === "male" ? "남성" : "여성"}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          2026년 토정비결 보기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="bg-amber-50 rounded-xl p-5 text-center border border-amber-200">
            <p className="text-sm font-medium text-amber-700 mb-2">2026년 전체운</p>
            <StarRating score={Math.round(result.monthlyFortunes.reduce((s, m) => s + m.score, 0) / result.monthlyFortunes.length)} />
            <p className="text-base font-semibold text-gray-800 mt-3">{result.overallFortune}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">월별 운세</p>
            <div className="grid grid-cols-2 gap-2">
              {result.monthlyFortunes.map((mf, i) => (
                <div key={i} className={`rounded-xl p-3 border ${monthBg(mf.score)}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{MONTHS_KO[i]}</span>
                    <span className="text-xs">
                      {"★".repeat(Math.round(mf.score / 20))}{"☆".repeat(5 - Math.round(mf.score / 20))}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{mf.fortune}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400">
            토정비결은 전통 민속 운세로 재미 목적입니다. 과학적 근거가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
