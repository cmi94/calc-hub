// src/lib/calculators/mbtiChange.ts
// MBTI 변화 추적기 (CALC-47)

import { analyzeMbtiChange } from '@/lib/data/mbtiChangeAnalysis';

export type MbtiChangeInput = {
  oldType: string;
  newType: string;
};

export { analyzeMbtiChange as calculateMbtiChange };
export type { MbtiChangeResult } from '@/lib/data/mbtiChangeAnalysis';
