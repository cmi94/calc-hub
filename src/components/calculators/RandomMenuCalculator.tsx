"use client";

import { useState } from "react";
import { recommendRandomMenu, MENU_CATEGORIES, type MenuCategory, type RandomMenuResult } from "@/lib/calculators/randomMenu";

export default function RandomMenuCalculator() {
  const [category, setCategory] = useState<MenuCategory>("random");
  const [result, setResult] = useState<RandomMenuResult | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  function handleRecommend() {
    setIsSpinning(true);
    setTimeout(() => {
      setResult(recommendRandomMenu(category));
      setIsSpinning(false);
    }, 300);
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* 카테고리 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">음식 카테고리</label>
          <div className="grid grid-cols-4 gap-2">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setResult(null); }}
                className={`flex flex-col items-center py-2 px-1 rounded-xl border text-xs transition-colors ${
                  category === cat.id
                    ? "bg-orange-50 border-orange-400 text-orange-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                <span className="text-xl mb-0.5">{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleRecommend}
          disabled={isSpinning}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isSpinning ? "추천 중..." : result ? "다시 추천" : "메뉴 추천받기"}
        </button>
      </div>

      {result && !isSpinning && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          {/* 메뉴 강조 */}
          <div className="bg-orange-50 rounded-xl p-6 text-center">
            <p className="text-4xl mb-3">{result.categoryEmoji}</p>
            <p className="text-3xl font-bold text-orange-700">{result.menu}</p>
            <p className="text-sm text-gray-500 mt-2">{result.categoryLabel}</p>
          </div>

          {/* 추천 멘트 */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-gray-700 font-medium">{result.suggestion}</p>
          </div>

          {/* 다시 추천 */}
          <button
            onClick={handleRecommend}
            className="w-full border border-orange-400 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-lg transition-colors"
          >
            다른 메뉴 추천받기
          </button>
        </div>
      )}
    </div>
  );
}
