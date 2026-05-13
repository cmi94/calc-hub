// 한국 로또 6/45 당첨 확률 계산

// C(n, k) 조합 수
function comb(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

const TOTAL = comb(45, 6); // 8,145,060

export type LottoPrizeRank = 1 | 2 | 3 | 4 | 5;

export interface LottoRankInfo {
  rank: LottoPrizeRank;
  label: string;
  condition: string;
  matchCount: number;         // 당첨 경우의 수
  probability: number;        // 1게임당 확률
  oneIn: number;              // 1/N
}

export interface LottoProbabilityResult {
  ranks: LottoRankInfo[];
  tickets: number;
  anyPrizeProb: number;       // n게임 구매 시 5등 이상 당첨 확률
}

const RANK_DATA: Omit<LottoRankInfo, "probability" | "oneIn">[] = [
  {
    rank: 1,
    label: "1등",
    condition: "6개 일치",
    matchCount: comb(6, 6) * comb(39, 0), // 1
  },
  {
    rank: 2,
    label: "2등",
    condition: "5개 일치 + 보너스 번호",
    matchCount: comb(6, 5) * comb(1, 1) * comb(38, 0), // 6
  },
  {
    rank: 3,
    label: "3등",
    condition: "5개 일치",
    matchCount: comb(6, 5) * comb(38, 1), // 228
  },
  {
    rank: 4,
    label: "4등",
    condition: "4개 일치",
    matchCount: comb(6, 4) * comb(39, 2), // 11,115
  },
  {
    rank: 5,
    label: "5등",
    condition: "3개 일치",
    matchCount: comb(6, 3) * comb(39, 3), // 182,780
  },
];

const RANKS: LottoRankInfo[] = RANK_DATA.map((r) => ({
  ...r,
  probability: r.matchCount / TOTAL,
  oneIn: Math.round(TOTAL / r.matchCount),
}));

export function getLottoProbability(tickets: number): LottoProbabilityResult {
  const n = Math.max(1, Math.min(10000, Math.round(tickets)));
  // 5등 이상 당첨: P(any) = 1 - (1 - p5)^n
  const p5 = RANKS[4].probability + RANKS[3].probability + RANKS[2].probability + RANKS[1].probability + RANKS[0].probability;
  const anyPrizeProb = 1 - Math.pow(1 - p5, n);
  return { ranks: RANKS, tickets: n, anyPrizeProb };
}

export { TOTAL as LOTTO_TOTAL_COMBINATIONS };
