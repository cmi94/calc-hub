// src/lib/calculators/mbtiBalance.ts
// MBTI 밸런스 게임 (CALC-46)

import { BALANCE_QUESTIONS, type BalanceQuestion } from '@/lib/data/mbtiBalanceQuestions';

export type MbtiBalanceAnswer = {
  questionId: number;
  choice: 'A' | 'B';
};

export type MbtiBalanceResult = {
  answers: MbtiBalanceAnswer[];
  dimensionScores: {
    EI: number;
    NS: number;
    TF: number;
    JP: number;
  };
  predictedType: string;
  analysis: string;
};

// 질문별 어떤 차원에 영향을 주는지 매핑
// 각 질문의 A/B 선택이 어떤 MBTI 축에 어떤 방향으로 영향을 주는지
const QUESTION_DIMENSION_MAP: Record<number, { dimension: 'EI' | 'NS' | 'TF' | 'JP'; aDirection: number; bDirection: number }> = {
  1:  { dimension: 'EI', aDirection: -1, bDirection: 1 },  // I vs E
  2:  { dimension: 'JP', aDirection: 1,  bDirection: -1 }, // P vs J
  3:  { dimension: 'NS', aDirection: 1,  bDirection: -1 }, // N vs S
  4:  { dimension: 'TF', aDirection: 1,  bDirection: -1 }, // F vs T ... wait
  5:  { dimension: 'TF', aDirection: -1, bDirection: 1 },  // F=neg, T=pos
  6:  { dimension: 'JP', aDirection: 1,  bDirection: -1 }, // P vs J
  7:  { dimension: 'NS', aDirection: 1,  bDirection: -1 }, // N vs S
  8:  { dimension: 'EI', aDirection: 1,  bDirection: -1 }, // E vs I
  9:  { dimension: 'EI', aDirection: 1,  bDirection: -1 }, // E vs I
  10: { dimension: 'EI', aDirection: -1, bDirection: 1 },  // I vs E
  11: { dimension: 'NS', aDirection: 1,  bDirection: -1 }, // N vs S
  12: { dimension: 'NS', aDirection: 1,  bDirection: -1 }, // N vs S
  13: { dimension: 'EI', aDirection: -1, bDirection: 1 },  // I=neg vs E=pos
  14: { dimension: 'JP', aDirection: -1, bDirection: 1 },  // J vs P
  15: { dimension: 'TF', aDirection: -1, bDirection: 1 },  // F=neg vs T=pos
  16: { dimension: 'NS', aDirection: 1,  bDirection: -1 }, // N vs S
  17: { dimension: 'EI', aDirection: -1, bDirection: 1 },  // I=neg vs E=pos
  18: { dimension: 'JP', aDirection: 1,  bDirection: -1 }, // P vs J
  19: { dimension: 'NS', aDirection: 1,  bDirection: -1 }, // N vs S
  20: { dimension: 'TF', aDirection: -1, bDirection: 1 },  // F=neg vs T=pos
};

export function analyzeMbtiBalance(answers: MbtiBalanceAnswer[]): MbtiBalanceResult {
  const scores = { EI: 0, NS: 0, TF: 0, JP: 0 };
  const counts = { EI: 0, NS: 0, TF: 0, JP: 0 };

  for (const answer of answers) {
    const mapping = QUESTION_DIMENSION_MAP[answer.questionId];
    if (!mapping) continue;
    const { dimension, aDirection, bDirection } = mapping;
    const direction = answer.choice === 'A' ? aDirection : bDirection;
    scores[dimension] += direction;
    counts[dimension]++;
  }

  // 정규화: -100 ~ 100 범위
  const dimensionScores = {
    EI: counts.EI > 0 ? Math.round((scores.EI / counts.EI) * 100) : 0,
    NS: counts.NS > 0 ? Math.round((scores.NS / counts.NS) * 100) : 0,
    TF: counts.TF > 0 ? Math.round((scores.TF / counts.TF) * 100) : 0,
    JP: counts.JP > 0 ? Math.round((scores.JP / counts.JP) * 100) : 0,
  };

  // 예측 MBTI 유형
  const e_or_i = dimensionScores.EI >= 0 ? 'E' : 'I';
  const n_or_s = dimensionScores.NS >= 0 ? 'N' : 'S';
  const t_or_f = dimensionScores.TF >= 0 ? 'T' : 'F';
  const j_or_p = dimensionScores.JP >= 0 ? 'J' : 'P';
  const predictedType = `${e_or_i}${n_or_s}${t_or_f}${j_or_p}`;

  const analysis = `밸런스 게임 결과, 당신의 MBTI 성향은 ${predictedType}에 가깝습니다.
E/I 지수: ${dimensionScores.EI > 0 ? `외향(E) +${dimensionScores.EI}` : `내향(I) ${dimensionScores.EI}`},
N/S 지수: ${dimensionScores.NS > 0 ? `직관(N) +${dimensionScores.NS}` : `감각(S) ${dimensionScores.NS}`},
T/F 지수: ${dimensionScores.TF > 0 ? `사고(T) +${dimensionScores.TF}` : `감정(F) ${dimensionScores.TF}`},
J/P 지수: ${dimensionScores.JP > 0 ? `판단(J) +${dimensionScores.JP}` : `인식(P) ${dimensionScores.JP}`}.`;

  return {
    answers,
    dimensionScores,
    predictedType,
    analysis,
  };
}

export { BALANCE_QUESTIONS };
export type { BalanceQuestion };
