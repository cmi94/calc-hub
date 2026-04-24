// src/lib/calculators/pastLife.ts
// 전생 직업 계산기 (CALC-39)

import { PAST_LIFE_POOL } from '@/lib/data/pastLifePool';
import { simpleHash } from '@/lib/utils/hash';

export type PastLifeInput = {
  birthDate: string;
  gender: 'male' | 'female' | 'other';
};

export type PastLifeResult = {
  job: string;
  era: string;
  country: string;
  description: string;
  trait: string;
  shareText: string;
};

export function calculatePastLife(input: PastLifeInput): PastLifeResult {
  const seed = input.birthDate + input.gender;
  const hash = simpleHash(seed);
  const index = hash % PAST_LIFE_POOL.length;
  const selected = PAST_LIFE_POOL[index];

  const shareText = `나의 전생은 ${selected.era} ${selected.country}의 ${selected.name}! ${selected.trait}`;

  return {
    job: selected.name,
    era: selected.era,
    country: selected.country,
    description: selected.description,
    trait: selected.trait,
    shareText,
  };
}
