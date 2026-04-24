// src/lib/calculators/zodiacPersonality.ts
// 별자리 성격 분석 (CALC-44)

import { ZODIAC_SIGNS, ZODIAC_COMPAT_MATRIX, getZodiacSign } from '@/lib/data/zodiacData';

export type ZodiacPersonalityInput = {
  month: number;
  day: number;
};

export type ZodiacPersonalityResult = {
  sign: {
    nameKo: string;
    symbol: string;
    element: string;
    luckyColor: string;
    luckyNumber: number;
  };
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  compatibility: {
    best: string;
    worst: string;
  };
  career: string;
  advice: string;
};

// 별자리별 강점/약점/어울리는 직업/조언
const PERSONALITY_DATA: Record<string, {
  strengths: string[];
  weaknesses: string[];
  career: string;
  advice: string;
}> = {
  aries: {
    strengths: ['추진력이 뛰어납니다', '용감하고 도전적입니다', '열정이 넘칩니다'],
    weaknesses: ['충동적으로 행동하기 쉽습니다', '인내심이 부족할 수 있습니다', '고집이 셀 수 있습니다'],
    career: '군인, 기업가, 스포츠 선수, 소방관',
    advice: '빠른 행동력을 유지하되 상대방의 입장도 한번 더 생각해보세요.',
  },
  taurus: {
    strengths: ['끈기와 인내심이 강합니다', '신뢰할 수 있는 사람입니다', '실용적이고 현실적입니다'],
    weaknesses: ['고집이 강해 변화를 거부합니다', '물질에 집착할 수 있습니다', '게으름을 피울 때가 있습니다'],
    career: '금융인, 부동산 전문가, 요리사, 예술가',
    advice: '안정을 추구하되 때로는 변화가 성장의 기회임을 기억하세요.',
  },
  gemini: {
    strengths: ['뛰어난 소통 능력을 가졌습니다', '다재다능하고 적응력이 높습니다', '지적 호기심이 왕성합니다'],
    weaknesses: ['변덕스럽고 일관성이 부족합니다', '집중력이 떨어질 수 있습니다', '결정을 내리기 어려워합니다'],
    career: '저널리스트, 교사, 작가, 영업직',
    advice: '다양한 관심사를 즐기되 한 가지를 깊이 파고드는 시간도 가져보세요.',
  },
  cancer: {
    strengths: ['깊은 공감 능력이 있습니다', '직관력이 뛰어납니다', '가족을 소중히 여깁니다'],
    weaknesses: ['감정 기복이 있을 수 있습니다', '과거에 집착하기 쉽습니다', '지나치게 걱정하는 경향이 있습니다'],
    career: '심리상담사, 간호사, 사회복지사, 요리사',
    advice: '감정을 건강하게 표현하고 자신을 돌보는 시간을 충분히 가지세요.',
  },
  leo: {
    strengths: ['강한 카리스마를 가졌습니다', '창의성이 풍부합니다', '관대하고 따뜻합니다'],
    weaknesses: ['자존심이 강해 양보가 어렵습니다', '칭찬을 지나치게 원할 수 있습니다', '독단적 결정을 내리기 쉽습니다'],
    career: '배우, 정치인, CEO, 예술가',
    advice: '리더십을 발휘하되 팀원들의 의견도 충분히 반영해보세요.',
  },
  virgo: {
    strengths: ['분석력이 뛰어납니다', '완벽주의적 성향으로 높은 성과를 냅니다', '성실하고 꼼꼼합니다'],
    weaknesses: ['지나친 완벽주의로 스트레스를 받습니다', '비판적으로 보일 수 있습니다', '걱정이 많을 수 있습니다'],
    career: '의사, 회계사, 연구원, 편집자',
    advice: '완벽을 추구하되 스스로에게도 너그러운 기준을 적용해보세요.',
  },
  libra: {
    strengths: ['공정하고 균형 있는 판단을 합니다', '사교성이 뛰어납니다', '예술적 감각이 있습니다'],
    weaknesses: ['결정을 내리기 어려워합니다', '갈등을 지나치게 회피합니다', '타인의 의견에 흔들리기 쉽습니다'],
    career: '변호사, 외교관, 디자이너, HR 전문가',
    advice: '결단력을 키우고 자신의 의견을 더 당당하게 표현해보세요.',
  },
  scorpio: {
    strengths: ['강렬한 집중력을 가졌습니다', '직관력과 통찰력이 탁월합니다', '변화에 강합니다'],
    weaknesses: ['질투심이 강할 수 있습니다', '집착하는 경향이 있습니다', '복수심을 품을 수 있습니다'],
    career: '형사, 심리학자, 연구원, 외과의사',
    advice: '강한 집중력을 긍정적인 방향으로 활용하고 신뢰로운 관계를 쌓아보세요.',
  },
  sagittarius: {
    strengths: ['낙관적이고 모험적입니다', '철학적 사고를 합니다', '자유로운 영혼입니다'],
    weaknesses: ['무책임하게 보일 수 있습니다', '인내심이 부족합니다', '과도하게 솔직해서 상처를 줄 수 있습니다'],
    career: '여행가, 교수, 작가, 코미디언',
    advice: '자유를 즐기되 책임감을 함께 키워나가는 것이 중요합니다.',
  },
  capricorn: {
    strengths: ['강한 의지와 인내심이 있습니다', '목표 지향적입니다', '책임감이 강합니다'],
    weaknesses: ['너무 일에 집중해 삶의 균형을 잃습니다', '부정적인 면을 먼저 볼 수 있습니다', '고집스럽게 보일 수 있습니다'],
    career: '경영자, 공무원, 금융인, 건축가',
    advice: '성공을 향한 열정도 좋지만 삶의 작은 즐거움도 놓치지 마세요.',
  },
  aquarius: {
    strengths: ['독창적이고 혁신적입니다', '인도주의적 가치를 중시합니다', '지적 호기심이 넘칩니다'],
    weaknesses: ['감정 표현이 서툴 수 있습니다', '반항적으로 보일 수 있습니다', '고집이 강할 수 있습니다'],
    career: '과학자, IT 전문가, 사회운동가, 작가',
    advice: '혁신적인 아이디어를 현실에 적용하는 실행력을 함께 키워보세요.',
  },
  pisces: {
    strengths: ['풍부한 감수성과 공감 능력을 가졌습니다', '창의적이고 예술적입니다', '직관이 뛰어납니다'],
    weaknesses: ['현실 감각이 부족할 수 있습니다', '우유부단할 수 있습니다', '자기희생이 지나칠 수 있습니다'],
    career: '예술가, 음악가, 심리상담사, 종교인',
    advice: '꿈을 현실로 이루기 위한 실용적인 계획을 세우는 연습을 해보세요.',
  },
};

export function getZodiacPersonality(input: ZodiacPersonalityInput): ZodiacPersonalityResult {
  const sign = getZodiacSign(input.month, input.day);
  const data = PERSONALITY_DATA[sign.id];

  // 가장 궁합이 좋은/나쁜 별자리 찾기
  const signIndex = ZODIAC_SIGNS.findIndex((s) => s.id === sign.id);
  let bestIdx = 0;
  let worstIdx = 0;
  let bestScore = -1;
  let worstScore = 101;

  if (signIndex >= 0) {
    ZODIAC_COMPAT_MATRIX[signIndex].forEach((score, idx) => {
      if (idx === signIndex) return;
      if (score > bestScore) { bestScore = score; bestIdx = idx; }
      if (score < worstScore) { worstScore = score; worstIdx = idx; }
    });
  }

  const bestSign = ZODIAC_SIGNS[bestIdx]?.nameKo ?? '알 수 없음';
  const worstSign = ZODIAC_SIGNS[worstIdx]?.nameKo ?? '알 수 없음';

  return {
    sign: {
      nameKo: sign.nameKo,
      symbol: sign.symbol,
      element: sign.element,
      luckyColor: sign.luckyColor,
      luckyNumber: sign.luckyNumber,
    },
    traits: sign.traits,
    strengths: data?.strengths ?? ['분석 중입니다.'],
    weaknesses: data?.weaknesses ?? ['분석 중입니다.'],
    compatibility: {
      best: bestSign,
      worst: worstSign,
    },
    career: data?.career ?? '다양한 분야에서 활약할 수 있습니다.',
    advice: data?.advice ?? '오늘도 최선을 다해보세요.',
  };
}
