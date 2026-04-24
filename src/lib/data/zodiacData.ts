// src/lib/data/zodiacData.ts
// 별자리 데이터 (12종) + 궁합 매트릭스

export type ZodiacSign = {
  id: string;
  name: string;
  nameKo: string;
  symbol: string;
  element: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  traits: string[];
  luckyColor: string;
  luckyNumber: number;
};

// index: 0=양자리, 1=황소자리, 2=쌍둥이자리, 3=게자리, 4=사자자리, 5=처녀자리
//        6=천칭자리, 7=전갈자리, 8=사수자리, 9=염소자리, 10=물병자리, 11=물고기자리
export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    nameKo: '양자리',
    symbol: '♈',
    element: '불',
    startMonth: 3, startDay: 21,
    endMonth: 4, endDay: 19,
    traits: ['열정적', '용감한', '충동적', '리더십'],
    luckyColor: '빨간색',
    luckyNumber: 9,
  },
  {
    id: 'taurus',
    name: 'Taurus',
    nameKo: '황소자리',
    symbol: '♉',
    element: '땅',
    startMonth: 4, startDay: 20,
    endMonth: 5, endDay: 20,
    traits: ['안정적', '인내심', '고집스러운', '감각적'],
    luckyColor: '초록색',
    luckyNumber: 6,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    nameKo: '쌍둥이자리',
    symbol: '♊',
    element: '공기',
    startMonth: 5, startDay: 21,
    endMonth: 6, endDay: 20,
    traits: ['호기심', '적응력', '변덕스러운', '사교적'],
    luckyColor: '노란색',
    luckyNumber: 5,
  },
  {
    id: 'cancer',
    name: 'Cancer',
    nameKo: '게자리',
    symbol: '♋',
    element: '물',
    startMonth: 6, startDay: 21,
    endMonth: 7, endDay: 22,
    traits: ['감성적', '보호적', '직관적', '가정적'],
    luckyColor: '은색',
    luckyNumber: 2,
  },
  {
    id: 'leo',
    name: 'Leo',
    nameKo: '사자자리',
    symbol: '♌',
    element: '불',
    startMonth: 7, startDay: 23,
    endMonth: 8, endDay: 22,
    traits: ['카리스마', '관대함', '자존심', '창의적'],
    luckyColor: '황금색',
    luckyNumber: 1,
  },
  {
    id: 'virgo',
    name: 'Virgo',
    nameKo: '처녀자리',
    symbol: '♍',
    element: '땅',
    startMonth: 8, startDay: 23,
    endMonth: 9, endDay: 22,
    traits: ['분석적', '완벽주의', '세심한', '실용적'],
    luckyColor: '갈색',
    luckyNumber: 6,
  },
  {
    id: 'libra',
    name: 'Libra',
    nameKo: '천칭자리',
    symbol: '♎',
    element: '공기',
    startMonth: 9, startDay: 23,
    endMonth: 10, endDay: 22,
    traits: ['균형감', '공정한', '사교적', '우유부단'],
    luckyColor: '분홍색',
    luckyNumber: 6,
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    nameKo: '전갈자리',
    symbol: '♏',
    element: '물',
    startMonth: 10, startDay: 23,
    endMonth: 11, endDay: 21,
    traits: ['강렬함', '직관적', '신비로운', '집요한'],
    luckyColor: '검은색',
    luckyNumber: 8,
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    nameKo: '사수자리',
    symbol: '♐',
    element: '불',
    startMonth: 11, startDay: 22,
    endMonth: 12, endDay: 21,
    traits: ['자유로운', '낙관적', '모험적', '철학적'],
    luckyColor: '보라색',
    luckyNumber: 3,
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    nameKo: '염소자리',
    symbol: '♑',
    element: '땅',
    startMonth: 12, startDay: 22,
    endMonth: 1, endDay: 19,
    traits: ['야망적', '책임감', '전통적', '절제력'],
    luckyColor: '흰색',
    luckyNumber: 10,
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    nameKo: '물병자리',
    symbol: '♒',
    element: '공기',
    startMonth: 1, startDay: 20,
    endMonth: 2, endDay: 18,
    traits: ['독창적', '인도주의', '반항적', '지적'],
    luckyColor: '하늘색',
    luckyNumber: 4,
  },
  {
    id: 'pisces',
    name: 'Pisces',
    nameKo: '물고기자리',
    symbol: '♓',
    element: '물',
    startMonth: 2, startDay: 19,
    endMonth: 3, endDay: 20,
    traits: ['공감능력', '예술적', '몽상적', '자기희생'],
    luckyColor: '연보라색',
    luckyNumber: 7,
  },
];

// 12×12 궁합 매트릭스 (대칭 보장)
// 행/열: 0=양자리, 1=황소자리, 2=쌍둥이자리, 3=게자리, 4=사자자리, 5=처녀자리
//        6=천칭자리, 7=전갈자리, 8=사수자리, 9=염소자리, 10=물병자리, 11=물고기자리
// 원소별 기본: 불-불=82, 불-공기=78, 불-땅=55, 불-물=48
//             땅-땅=83, 땅-물=72, 땅-공기=58
//             공기-공기=77, 공기-물=62
//             물-물=85
export const ZODIAC_COMPAT_MATRIX: number[][] = [
  // 양자리(불)
  [75, 52, 85, 50, 84, 57, 75, 48, 88, 55, 78, 46],
  // 황소자리(땅)
  [52, 78, 58, 72, 54, 85, 60, 75, 50, 86, 55, 76],
  // 쌍둥이자리(공기)
  [85, 58, 72, 60, 80, 56, 82, 52, 76, 52, 78, 58],
  // 게자리(물)
  [50, 72, 60, 82, 55, 70, 58, 90, 48, 68, 60, 86],
  // 사자자리(불)
  [84, 54, 80, 55, 75, 55, 78, 50, 84, 52, 76, 48],
  // 처녀자리(땅)
  [57, 85, 56, 70, 55, 78, 62, 72, 52, 84, 58, 74],
  // 천칭자리(공기)
  [75, 60, 82, 58, 78, 62, 74, 52, 78, 55, 80, 62],
  // 전갈자리(물)
  [48, 75, 52, 90, 50, 72, 52, 80, 46, 70, 56, 85],
  // 사수자리(불)
  [88, 50, 76, 48, 84, 52, 78, 46, 76, 55, 80, 50],
  // 염소자리(땅)
  [55, 86, 52, 68, 52, 84, 55, 70, 55, 80, 58, 72],
  // 물병자리(공기)
  [78, 55, 78, 60, 76, 58, 80, 56, 80, 58, 74, 62],
  // 물고기자리(물)
  [46, 76, 58, 86, 48, 74, 62, 85, 50, 72, 62, 82],
];

export function getZodiacSign(month: number, day: number): ZodiacSign {
  for (const sign of ZODIAC_SIGNS) {
    const { startMonth, startDay, endMonth, endDay } = sign;
    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) return sign;
    } else if (startMonth < endMonth) {
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)
      ) return sign;
    } else {
      // 연도 걸치는 경우 (염소자리: 12/22 ~ 1/19)
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        month > startMonth ||
        month < endMonth
      ) return sign;
    }
  }
  // 기본값 (물고기자리 끝 ~ 양자리 전)
  return ZODIAC_SIGNS[0];
}
