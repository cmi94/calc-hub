// src/lib/calculators/saju.ts
// 사주 오행 분석기 (CALC-40) — 간략 버전

export type SajuInput = {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour?: number;
  gender: 'male' | 'female';
};

export type Element = '목' | '화' | '토' | '금' | '수';

export type SajuPillar = {
  heavenlyStem: string;
  earthlyBranch: string;
  element: Element;
};

export type SajuResult = {
  yearPillar: SajuPillar;
  monthPillar: SajuPillar;
  dayPillar: SajuPillar;
  hourPillar?: SajuPillar;
  elementCounts: Record<Element, number>;
  dominantElement: Element;
  weakElement: Element;
  analysis: string;
  fortuneThisYear: string;
  luckyDirection: string;
  luckyColor: string;
};

// 천간 (10개) - 갑을병정무기경신임계
const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;
// 천간의 오행
const STEM_ELEMENTS: Element[] = ['목', '목', '화', '화', '토', '토', '금', '금', '수', '수'];

// 지지 (12개) - 자축인묘진사오미신유술해
const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;
// 지지의 오행
const BRANCH_ELEMENTS: Element[] = ['수', '토', '목', '목', '토', '화', '화', '토', '금', '금', '토', '수'];

// 60갑자 순서 (연간지): (year - 4) % 60으로 인덱스
// 천간: index % 10, 지지: index % 12
function getYearPillar(year: number): SajuPillar {
  const idx = ((year - 4) % 60 + 60) % 60;
  const stemIdx = idx % 10;
  const branchIdx = idx % 12;
  return {
    heavenlyStem: HEAVENLY_STEMS[stemIdx],
    earthlyBranch: EARTHLY_BRANCHES[branchIdx],
    element: STEM_ELEMENTS[stemIdx],
  };
}

// 월주: 연간의 천간과 생월에 따라 결정 (간략 공식)
function getMonthPillar(year: number, month: number): SajuPillar {
  const yearStemIdx = ((year - 4) % 60 + 60) % 60 % 10;
  // 월간 시작: 연간에 따라 결정
  const monthStemStart = (yearStemIdx % 5) * 2;
  const stemIdx = (monthStemStart + month - 1) % 10;
  const branchIdx = (month + 1) % 12; // 인(3월)부터 시작, 자(11월)~해(10월)
  return {
    heavenlyStem: HEAVENLY_STEMS[stemIdx],
    earthlyBranch: EARTHLY_BRANCHES[branchIdx],
    element: STEM_ELEMENTS[stemIdx],
  };
}

// 일주: 기준일(2000-01-01 = 갑신일)부터 일수 계산
function getDayPillar(year: number, month: number, day: number): SajuPillar {
  const base = new Date(2000, 0, 1);
  const target = new Date(year, month - 1, day);
  const diffDays = Math.floor((target.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
  // 2000-01-01 = 갑신(천간:갑=0, 지지:신=8)
  const baseGap = 0 * 12 + 8; // 갑신의 60갑자 인덱스는 (0*6+8%10으로 계산하면 복잡)
  // 단순화: 2000년 1월 1일은 60갑자 중 17번째(갑신일)
  const BASE_DAY_IDX = 17;
  const idx = ((BASE_DAY_IDX + diffDays) % 60 + 60) % 60;
  const stemIdx = idx % 10;
  const branchIdx = idx % 12;
  return {
    heavenlyStem: HEAVENLY_STEMS[stemIdx],
    earthlyBranch: EARTHLY_BRANCHES[branchIdx],
    element: STEM_ELEMENTS[stemIdx],
  };
}

// 시주: 일간과 시각에 따라 결정
function getHourPillar(dayPillar: SajuPillar, hour: number): SajuPillar {
  const dayStemIdx = HEAVENLY_STEMS.indexOf(dayPillar.heavenlyStem as typeof HEAVENLY_STEMS[number]);
  // 시지: 자(23-1)=0, 축(1-3)=1, ..., 해(21-23)=11
  const branchIdx = Math.floor(((hour + 1) % 24) / 2) % 12;
  // 시간 천간 시작점: 일간에 따라
  const hourStemStart = (dayStemIdx % 5) * 2;
  const stemIdx = (hourStemStart + branchIdx) % 10;
  return {
    heavenlyStem: HEAVENLY_STEMS[stemIdx],
    earthlyBranch: EARTHLY_BRANCHES[branchIdx],
    element: STEM_ELEMENTS[stemIdx],
  };
}

const ELEMENT_ANALYSES: Record<Element, string> = {
  목: '목(木) 기운이 강해 성장과 발전의 에너지가 넘칩니다. 창의성과 추진력이 장점입니다.',
  화: '화(火) 기운이 강해 열정적이고 활동적인 성향입니다. 표현력과 사교성이 뛰어납니다.',
  토: '토(土) 기운이 강해 안정적이고 신뢰할 수 있는 성격입니다. 중재 능력이 탁월합니다.',
  금: '금(金) 기운이 강해 결단력과 의지력이 강합니다. 원칙을 중시하고 강직합니다.',
  수: '수(水) 기운이 강해 지혜롭고 유연한 성격입니다. 적응력과 직관력이 뛰어납니다.',
};

const ELEMENT_FORTUNES: Record<Element, string> = {
  목: '목(木) 오행의 기운이 2026년 좋은 성장과 새로운 시작을 가져옵니다.',
  화: '화(火) 오행의 열정적 기운이 2026년 활발한 활동과 인정을 가져옵니다.',
  토: '토(土) 오행의 안정적 기운이 2026년 착실한 발전과 신뢰를 쌓아줍니다.',
  금: '금(金) 오행의 강인한 기운이 2026년 결실과 성취를 가져옵니다.',
  수: '수(水) 오행의 지혜로운 기운이 2026년 새로운 기회와 통찰을 가져옵니다.',
};

const ELEMENT_DIRECTIONS: Record<Element, string> = {
  목: '동쪽',
  화: '남쪽',
  토: '중앙',
  금: '서쪽',
  수: '북쪽',
};

const ELEMENT_COLORS: Record<Element, string> = {
  목: '초록색',
  화: '빨간색',
  토: '황토색',
  금: '흰색',
  수: '검은색',
};

export function calculateSaju(input: SajuInput): SajuResult {
  const yearPillar = getYearPillar(input.birthYear);
  const monthPillar = getMonthPillar(input.birthYear, input.birthMonth);
  const dayPillar = getDayPillar(input.birthYear, input.birthMonth, input.birthDay);
  const hourPillar = input.birthHour !== undefined
    ? getHourPillar(dayPillar, input.birthHour)
    : undefined;

  // 오행 카운트
  const elementCounts: Record<Element, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };

  const pillars = [yearPillar, monthPillar, dayPillar];
  if (hourPillar) pillars.push(hourPillar);

  for (const pillar of pillars) {
    elementCounts[pillar.element]++;
    // 지지의 오행도 카운트
    const branchIdx = EARTHLY_BRANCHES.indexOf(pillar.earthlyBranch as typeof EARTHLY_BRANCHES[number]);
    if (branchIdx >= 0) {
      const branchElement = BRANCH_ELEMENTS[branchIdx];
      elementCounts[branchElement]++;
    }
  }

  // 지배 오행 (가장 많은)
  const dominantElement = (Object.keys(elementCounts) as Element[]).reduce(
    (max, el) => elementCounts[el] > elementCounts[max] ? el : max,
    '목' as Element,
  );

  // 약한 오행 (가장 적은)
  const weakElement = (Object.keys(elementCounts) as Element[]).reduce(
    (min, el) => elementCounts[el] < elementCounts[min] ? el : min,
    '목' as Element,
  );

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    elementCounts,
    dominantElement,
    weakElement,
    analysis: ELEMENT_ANALYSES[dominantElement],
    fortuneThisYear: ELEMENT_FORTUNES[dominantElement],
    luckyDirection: ELEMENT_DIRECTIONS[dominantElement],
    luckyColor: ELEMENT_COLORS[dominantElement],
  };
}
