"use client";

import { useState } from "react";
import { drawTarot, type TarotResult, type TarotInput } from "@/lib/calculators/tarot";

type SpreadType = "one" | "three";

export default function TarotCalculator() {
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<SpreadType>("one");
  const [result, setResult] = useState<TarotResult | null>(null);

  function handleDraw() {
    const today = new Date().toISOString().split("T")[0];
    const input: TarotInput = { question: question.trim() || undefined, spreadType: spread, date: today };
    setResult(drawTarot(input));
  }

  const POSITION_LABELS = ["과거", "현재", "미래"];

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            오늘의 질문 <span className="text-xs text-gray-400">(선택)</span>
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => { setQuestion(e.target.value); setResult(null); }}
            placeholder="예: 오늘 하루 어떻게 보낼까요?"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">카드 스프레드</label>
          <div className="flex gap-2">
            {([["one", "1장 카드"], ["three", "3장 카드 (과거·현재·미래)"]] as [SpreadType, string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => { setSpread(val); setResult(null); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                  spread === val
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-purple-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDraw}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          카드 뽑기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          {question && (
            <p className="text-sm text-purple-700 font-medium bg-purple-50 rounded-lg px-4 py-2">
              Q. {question}
            </p>
          )}

          <div className={`grid gap-4 ${result.cards.length === 1 ? "grid-cols-1" : "grid-cols-3"}`}>
            {result.cards.map((card, i) => (
              <div key={i} className="bg-gradient-to-b from-purple-900 to-indigo-900 rounded-xl p-4 text-center text-white shadow-lg">
                {result.cards.length > 1 && (
                  <p className="text-xs text-purple-300 mb-2 font-medium">{POSITION_LABELS[i]}</p>
                )}
                <p className="text-2xl mb-2">{card.isReversed ? "🔄" : "✨"}</p>
                <p className="text-sm font-bold">{card.card.nameKo}</p>
                <p className="text-xs text-purple-300 mt-1">{card.card.arcana}</p>
                {card.isReversed && (
                  <span className="inline-block mt-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">역방향</span>
                )}
                <p className="text-xs text-purple-200 mt-3 leading-relaxed">{card.meaning}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <p className="text-sm font-semibold text-purple-800 mb-1">오늘의 메시지</p>
            <p className="text-sm text-purple-700 leading-relaxed">{result.overallMessage}</p>
          </div>

          <p className="text-xs text-gray-400">타로는 재미 목적입니다. 중요한 결정은 전문가와 상담하세요.</p>
        </div>
      )}
    </div>
  );
}
