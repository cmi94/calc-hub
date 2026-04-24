// src/lib/calculators/horoscope.ts
// 오늘의 별자리 운세 (CALC-43)

import { HOROSCOPE_MESSAGES } from '@/lib/data/horoscopeMessages';
import { ZODIAC_SIGNS, getZodiacSign } from '@/lib/data/zodiacData';
import { simpleHash } from '@/lib/utils/hash';

export type HoroscopeInput = {
  signId: string;
  date: string;
};

export type HoroscopeResult = {
  sign: { nameKo: string; symbol: string };
  date: string;
  messages: {
    overall: string;
    love: string;
    work: string;
    money: string;
    health: string;
  };
  luckyColor: string;
  luckyNumber: number;
};

function pickMessage(signId: string, category: string, date: string): string {
  const entry = HOROSCOPE_MESSAGES.find(
    (h) => h.signId === signId && h.category === category
  );
  if (!entry || entry.messages.length === 0) {
    return '오늘 하루도 좋은 일이 가득하길 바랍니다.';
  }
  const seed = `${signId}:${category}:${date}`;
  const index = simpleHash(seed) % entry.messages.length;
  return entry.messages[index];
}

export function getDailyHoroscope(input: HoroscopeInput): HoroscopeResult {
  const sign = ZODIAC_SIGNS.find((s) => s.id === input.signId);

  if (!sign) {
    return {
      sign: { nameKo: '알 수 없음', symbol: '?' },
      date: input.date,
      messages: {
        overall: '올바른 별자리를 선택해주세요.',
        love: '올바른 별자리를 선택해주세요.',
        work: '올바른 별자리를 선택해주세요.',
        money: '올바른 별자리를 선택해주세요.',
        health: '올바른 별자리를 선택해주세요.',
      },
      luckyColor: '흰색',
      luckyNumber: 1,
    };
  }

  return {
    sign: { nameKo: sign.nameKo, symbol: sign.symbol },
    date: input.date,
    messages: {
      overall: pickMessage(input.signId, 'overall', input.date),
      love:    pickMessage(input.signId, 'love',    input.date),
      work:    pickMessage(input.signId, 'work',    input.date),
      money:   pickMessage(input.signId, 'money',   input.date),
      health:  pickMessage(input.signId, 'health',  input.date),
    },
    luckyColor: sign.luckyColor,
    luckyNumber: sign.luckyNumber,
  };
}

export { getZodiacSign };
