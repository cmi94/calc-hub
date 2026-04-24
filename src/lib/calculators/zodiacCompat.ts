// src/lib/calculators/zodiacCompat.ts
// 별자리 궁합 계산기 (CALC-35)

import { ZODIAC_SIGNS, ZODIAC_COMPAT_MATRIX, getZodiacSign } from '@/lib/data/zodiacData';

export type ZodiacCompatInput = {
  person1Month: number;
  person1Day: number;
  person2Month: number;
  person2Day: number;
};

export type ZodiacCompatResult = {
  person1Sign: { nameKo: string; symbol: string; element: string };
  person2Sign: { nameKo: string; symbol: string; element: string };
  score: number;
  grade: '천생연분' | '찰떡궁합' | '보통궁합' | '노력이 필요해' | '상극';
  description: string;
  tips: string[];
};

function getGrade(score: number): ZodiacCompatResult['grade'] {
  if (score >= 90) return '천생연분';
  if (score >= 75) return '찰떡궁합';
  if (score >= 55) return '보통궁합';
  if (score >= 35) return '노력이 필요해';
  return '상극';
}

const DESCRIPTIONS: Record<ZodiacCompatResult['grade'], string> = {
  '천생연분': '하늘이 맺어준 인연, 서로를 완벽하게 이해합니다.',
  '찰떡궁합': '함께할수록 더욱 빛나는 멋진 궁합입니다.',
  '보통궁합': '서로를 이해하며 좋은 관계를 만들어갈 수 있습니다.',
  '노력이 필요해': '차이를 인정하고 노력한다면 훌륭한 관계가 됩니다.',
  '상극': '서로의 다름을 이해하는 데 많은 노력이 필요합니다.',
};

const TIPS: Record<ZodiacCompatResult['grade'], string[]> = {
  '천생연분': [
    '서로에 대한 감사함을 자주 표현해주세요.',
    '이 특별한 인연을 소중히 가꾸어 나가세요.',
  ],
  '찰떡궁합': [
    '서로의 강점을 활용해 더 빛나는 관계를 만드세요.',
    '함께 새로운 경험을 공유하며 추억을 쌓아보세요.',
  ],
  '보통궁합': [
    '서로의 다른 점을 보완재로 생각해보세요.',
    '열린 대화로 서로를 더 깊이 알아가는 시간을 가지세요.',
  ],
  '노력이 필요해': [
    '상대방의 입장에서 생각하는 연습이 도움이 됩니다.',
    '공통 관심사를 찾아 함께 시간을 보내보세요.',
  ],
  '상극': [
    '서로의 차이를 존중하는 마음이 관계의 출발점입니다.',
    '단점보다 장점에 집중하며 대화를 나눠보세요.',
  ],
};

export function calculateZodiacCompat(input: ZodiacCompatInput): ZodiacCompatResult {
  const sign1 = getZodiacSign(input.person1Month, input.person1Day);
  const sign2 = getZodiacSign(input.person2Month, input.person2Day);

  const idx1 = ZODIAC_SIGNS.findIndex((s) => s.id === sign1.id);
  const idx2 = ZODIAC_SIGNS.findIndex((s) => s.id === sign2.id);

  const score = idx1 >= 0 && idx2 >= 0
    ? ZODIAC_COMPAT_MATRIX[idx1][idx2]
    : 50;

  const grade = getGrade(score);

  return {
    person1Sign: { nameKo: sign1.nameKo, symbol: sign1.symbol, element: sign1.element },
    person2Sign: { nameKo: sign2.nameKo, symbol: sign2.symbol, element: sign2.element },
    score,
    grade,
    description: DESCRIPTIONS[grade],
    tips: TIPS[grade],
  };
}
