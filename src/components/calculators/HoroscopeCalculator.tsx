"use client";

import { useState } from "react";
import { getDailyHoroscope, getZodiacSign, type HoroscopeResult } from "@/lib/calculators/horoscope";

const ZODIAC_SIGNS_LIST = [
  { id: "aries",       nameKo: "양자리",    symbol: "♈" },
  { id: "taurus",      nameKo: "황소자리",  symbol: "♉" },
  { id: "gemini",      nameKo: "쌍둥이자리",symbol: "♊" },
  { id: "cancer",      nameKo: "게자리",    symbol: "♋" },
  { id: "leo",         nameKo: "사자자리",  symbol: "♌" },
  { id: "virgo",       nameKo: "처녀자리",  symbol: "♍" },
  { id: "libra",       nameKo: "천칭자리",  symbol: "♎" },
  { id: "scorpio",     nameKo: "전갈자리",  symbol: "♏" },
  { id: "sagittarius", nameKo: "사수자리",  symbol: "♐" },
  { id: "capricorn",   nameKo: "염소자리",  symbol: "♑" },
  { id: "aquarius",    nameKo: "물병자리",  symbol: "♒" },
  { id: "pisces",      nameKo: "물고기자리",symbol: "♓" },
];

const CATEGORY_LABELS: Record<string, string> = {
  overall: "전체운",
  love:    "애정운",
  work:    "직업운",
  money:   "재물운",
  health:  "건강운",
};

export default function HoroscopeCalculator() {
  const [inputMode, setInputMode] = useState<"date" | "sign">("sign");
  const [selectedSignId, setSelectedSignId] = useState("aries");
  const [month, setMonth] = useState("3");
  const [day, setDay] = useState("21");
  const [result, setResult] = useState<HoroscopeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    let signId = selectedSignId;
    if (inputMode === "date") {
      const m = Number(month);
      const d = Number(day);
      if (!m || !d) {
        setError("월과 일을 입력해주세요.");
        return;
      }
      const sign = getZodiacSign(m, d);
      signId = sign.id;
    }
    setError("");
    const today = new Date().toISOString().split("T")[0];
    setResult(getDailyHoroscope({ signId, date: today }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div className="flex gap-2">
          {(["sign", "date"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => { setInputMode(mode); setResult(null); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                inputMode === mode
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400"
              }`}
            >
              {mode === "sign" ? "별자리로 선택" : "생월일로 선택"}
            </button>
          ))}
        </div>

        {inputMode === "sign" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">별자리 선택</label>
            <div className="grid grid-cols-4 gap-2">
              {ZODIAC_SIGNS_LIST.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSignId(s.id); setResult(null); }}
                  className={`py-2 rounded-lg text-xs font-semibold border transition-colors flex flex-col items-center gap-0.5 ${
                    selectedSignId === s.id
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400"
                  }`}
                >
                  <span className="text-base">{s.symbol}</span>
                  <span>{s.nameKo.replace("자리", "")}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">월</label>
              <select
                value={month}
                onChange={(e) => { setMonth(e.target.value); setResult(null); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}월</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">일</label>
              <select
                value={day}
                onChange={(e) => { setDay(e.target.value); setResult(null); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}일</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          오늘의 운세 보기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="text-center">
            <p className="text-4xl mb-2">{result.sign.symbol}</p>
            <p className="text-xl font-bold text-gray-800">{result.sign.nameKo}</p>
          </div>

          <div className="space-y-3">
            {(["overall", "love", "work", "money", "health"] as const).map((key) => (
              <div key={key} className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-600 mb-1">{CATEGORY_LABELS[key]}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{result.messages[key]}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex-1 bg-pink-50 rounded-xl p-3 text-center border border-pink-100">
              <p className="text-xs text-pink-600 font-medium mb-1">행운의 색</p>
              <p className="font-semibold text-pink-800">{result.luckyColor}</p>
            </div>
            <div className="flex-1 bg-yellow-50 rounded-xl p-3 text-center border border-yellow-100">
              <p className="text-xs text-yellow-600 font-medium mb-1">행운의 숫자</p>
              <p className="font-bold text-2xl text-yellow-700">{result.luckyNumber}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400">별자리 운세는 재미 목적입니다. 과학적 근거가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
