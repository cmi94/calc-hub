// src/lib/calculators/animalCompat.ts
// 띠별 궁합 계산기 (CALC-41)

import { ANIMAL_SIGNS, ANIMAL_COMPAT_MATRIX, getAnimalSign } from '@/lib/data/animalZodiac';

export type AnimalCompatInput = {
  person1BirthYear: number;
  person2BirthYear: number;
};

export type AnimalCompatResult = {
  person1Animal: { nameKo: string; emoji: string };
  person2Animal: { nameKo: string; emoji: string };
  score: number;
  grade: '천생연분' | '찰떡궁합' | '보통궁합' | '노력이 필요해' | '상극';
  compatType: '삼합' | '육합' | '상충' | '일반';
  description: string;
  tips: string[];
};

// 삼합 그룹 (인덱스: 0=쥐,1=소,...,11=돼지)
const SAMHAP_GROUPS: number[][] = [
  [0, 4, 8],  // 쥐-용-원숭이
  [1, 5, 9],  // 소-뱀-닭
  [2, 6, 10], // 호랑이-말-개
  [3, 7, 11], // 토끼-양-돼지
];

// 육합 쌍
const YUKHAP_PAIRS: [number, number][] = [
  [0, 1],   // 쥐-소
  [2, 11],  // 호랑이-돼지
  [3, 10],  // 토끼-개
  [4, 9],   // 용-닭
  [5, 8],   // 뱀-원숭이
  [6, 7],   // 말-양
];

// 상충 쌍
const SANGCHUNG_PAIRS: [number, number][] = [
  [0, 6],   // 쥐-말
  [1, 7],   // 소-양
  [2, 8],   // 호랑이-원숭이
  [3, 9],   // 토끼-닭
  [4, 10],  // 용-개
  [5, 11],  // 뱀-돼지
];

function getCompatType(idx1: number, idx2: number): AnimalCompatResult['compatType'] {
  for (const group of SAMHAP_GROUPS) {
    if (group.includes(idx1) && group.includes(idx2)) return '삼합';
  }
  for (const pair of YUKHAP_PAIRS) {
    if ((pair[0] === idx1 && pair[1] === idx2) || (pair[0] === idx2 && pair[1] === idx1)) {
      return '육합';
    }
  }
  for (const pair of SANGCHUNG_PAIRS) {
    if ((pair[0] === idx1 && pair[1] === idx2) || (pair[0] === idx2 && pair[1] === idx1)) {
      return '상충';
    }
  }
  return '일반';
}

function getGrade(score: number): AnimalCompatResult['grade'] {
  if (score >= 90) return '천생연분';
  if (score >= 75) return '찰떡궁합';
  if (score >= 55) return '보통궁합';
  if (score >= 35) return '노력이 필요해';
  return '상극';
}

const COMPAT_TYPE_DESCRIPTIONS: Record<string, string> = {
  '삼합': '삼합(三合)의 관계로 천생연분에 가까운 좋은 궁합입니다.',
  '육합': '육합(六合)의 관계로 서로 잘 맞고 조화로운 궁합입니다.',
  '상충': '상충(相沖)의 관계로 서로 부딪히는 경우가 많을 수 있습니다.',
  '일반': '무난한 관계로 서로의 이해와 노력으로 좋은 관계를 만들 수 있습니다.',
};

const COMPAT_TIPS: Record<AnimalCompatResult['grade'], string[]> = {
  '천생연분': ['서로에 대한 감사함을 자주 표현해주세요.', '이 특별한 인연을 소중히 이어가세요.'],
  '찰떡궁합': ['서로의 강점이 시너지를 내도록 협력해보세요.', '함께 새로운 경험을 공유하며 추억을 쌓으세요.'],
  '보통궁합': ['서로의 다름을 이해하고 보완하는 관계를 만들어보세요.', '열린 대화로 서로를 더 잘 알아가는 시간을 가지세요.'],
  '노력이 필요해': ['상대방의 입장에서 생각해보는 연습이 도움이 됩니다.', '공통점을 찾아 함께 즐길 수 있는 활동을 해보세요.'],
  '상극': ['상충 관계를 알면 오히려 더 조심하고 배려할 수 있습니다.', '서로의 다른 에너지가 균형을 만들어줄 수 있습니다.'],
};

export function calculateAnimalCompat(input: AnimalCompatInput): AnimalCompatResult {
  const animal1 = getAnimalSign(input.person1BirthYear);
  const animal2 = getAnimalSign(input.person2BirthYear);

  const idx1 = ANIMAL_SIGNS.findIndex((a) => a.id === animal1.id);
  const idx2 = ANIMAL_SIGNS.findIndex((a) => a.id === animal2.id);

  const score = idx1 >= 0 && idx2 >= 0
    ? ANIMAL_COMPAT_MATRIX[idx1][idx2]
    : 50;

  const grade = getGrade(score);
  const compatType = getCompatType(idx1, idx2);

  return {
    person1Animal: { nameKo: animal1.nameKo, emoji: animal1.emoji },
    person2Animal: { nameKo: animal2.nameKo, emoji: animal2.emoji },
    score,
    grade,
    compatType,
    description: COMPAT_TYPE_DESCRIPTIONS[compatType],
    tips: COMPAT_TIPS[grade],
  };
}
