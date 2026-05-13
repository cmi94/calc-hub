"use client";

import { useState } from "react";
import { getLottoProbability, LOTTO_TOTAL_COMBINATIONS } from "@/lib/calculators/lottoProbability";

function formatOneIn(n: number): string {
  if (n >= 1_000_000) return `약 ${(n / 1_000_000).toFixed(0)}백만분의 1`;
  if (n >= 10_000) return `약 ${Math.round(n / 10_000)}만분의 1`;
  return `약 ${n.toLocaleString()}분의 1`;
}

function formatPercent(p: number, digits = 6): string {
  const pct = p * 100;
  if (pct >= 0.001) return `${pct.toFixed(2)}%`;
  const exp = pct.toExponential(2);
  return `${exp}%`;
}

const RANK_COLORS = ["#e53e3e", "#dd6b20", "#38a169", "#3182ce", "#805ad5"] as const;

export default function LottoProbabilityCalculator() {
  const [tickets, setTickets] = useState("1");
  const [result, setResult] = useState(() => getLottoProbability(1));

  function handleChange(v: string) {
    const num = parseInt(v.replace(/\D/g, ""), 10);
    setTickets(v.replace(/\D/g, ""));
    if (!isNaN(num) && num >= 1) {
      setResult(getLottoProbability(num));
    }
  }

  const n = parseInt(tickets, 10) || 1;
  const { ranks } = result;

  return (
    <div className="space-y-6">
      {/* 게임 수 입력 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="mb-3 text-sm font-medium text-gray-700">구매 게임 수</p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={10000}
            value={tickets}
            onChange={(e) => handleChange(e.target.value)}
            className="w-32 rounded-lg border border-gray-300 px-4 py-2.5 text-right text-lg font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="게임 수"
          />
          <span className="text-sm text-gray-500">게임 (최대 10,000)</span>
        </div>
        {n > 1 && (
          <p className="mt-2 text-xs text-gray-400">
            {n.toLocaleString()}게임 구매 시 5등 이상 당첨 확률:{" "}
            <span className="font-semibold text-yellow-600">
              {formatPercent(result.anyPrizeProb, 4)}
            </span>
          </p>
        )}
      </div>

      {/* 등수별 확률표 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="mb-4 text-sm font-semibold text-gray-700">
          등수별 당첨 확률 (전체 조합 수: {LOTTO_TOTAL_COMBINATIONS.toLocaleString()}가지)
        </p>
        <div className="space-y-3">
          {ranks.map((r, i) => {
            const probN = 1 - Math.pow(1 - r.probability, n);
            return (
              <div
                key={r.rank}
                className="rounded-xl border border-gray-100 p-4"
                style={{ borderLeftWidth: 4, borderLeftColor: RANK_COLORS[i] }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: RANK_COLORS[i] }}
                    >
                      {r.label}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">{r.condition}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">1게임</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatOneIn(r.oneIn)}
                    </p>
                  </div>
                </div>
                {n > 1 && (
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{n.toLocaleString()}게임 구매 시</span>
                    <span className="font-semibold" style={{ color: RANK_COLORS[i] }}>
                      {formatPercent(probN)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 안내 */}
      <p className="rounded-xl bg-yellow-50 px-4 py-3 text-xs text-yellow-700">
        이 결과는 재미용이며, 실제 당첨을 보장하지 않습니다.
        매 게임은 독립 시행으로 과거 구매 이력과 무관합니다.
      </p>
    </div>
  );
}
