// src/lib/calculators/tojeong.ts
// 토정비결 (CALC-36) — 간략 버전 (결정적 해시 기반)

import { simpleHash } from '@/lib/utils/hash';

export type TojeongInput = {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: 'male' | 'female';
};

export type MonthlyFortune = {
  month: number;
  fortune: string;
  score: number;
  advice: string;
};

export type TojeongResult = {
  year: number;
  overallFortune: string;
  monthlyFortunes: MonthlyFortune[];
  luckyMonths: number[];
  warningMonths: number[];
};

const OVERALL_FORTUNES = [
  '올해는 준비한 것들이 결실을 맺는 풍요로운 해입니다. 인내한 노력이 빛을 발합니다.',
  '변화와 도전의 해입니다. 두려움을 이기고 새로운 길을 개척하면 큰 성과가 있습니다.',
  '인간관계가 풍성해지는 한 해입니다. 좋은 사람들과의 만남이 행운을 가져옵니다.',
  '재물운이 상승하는 해입니다. 투자보다 저축이 유리하며 안정적인 성장이 기대됩니다.',
  '건강에 특히 유의해야 할 해입니다. 몸을 잘 돌보면 하반기에 좋은 일들이 찾아옵니다.',
  '학문과 지식 탐구에 좋은 해입니다. 새로운 기술을 익히면 큰 발전이 있습니다.',
  '사업이나 직업에 변화가 생기는 해입니다. 신중한 결정이 미래를 좌우합니다.',
  '가정과 화목이 중심이 되는 해입니다. 가족을 위한 헌신이 행복의 근원이 됩니다.',
  '여행과 이동이 많은 해입니다. 새로운 환경이 시야를 넓혀주고 기회를 만들어줍니다.',
  '창의성이 빛나는 해입니다. 예술이나 창작 활동에 뛰어들면 큰 보람을 느낍니다.',
  '리더십을 발휘하는 해입니다. 주변의 신뢰를 얻고 중요한 역할을 맡게 됩니다.',
  '정서적 성장의 해입니다. 내면을 돌아보며 진정한 자아를 찾아가는 여정입니다.',
  '협력과 파트너십이 성공의 열쇠인 해입니다. 혼자보다 함께할 때 더 큰 결과를 냅니다.',
  '기다림의 해입니다. 서두르지 않고 때를 기다리면 좋은 기회가 찾아옵니다.',
  '사회적 인정을 받는 해입니다. 그동안의 노력이 이름을 알리는 계기가 됩니다.',
  '새로운 시작의 해입니다. 오래된 것을 정리하고 새로운 방향으로 힘차게 출발하세요.',
  '풍요와 감사의 해입니다. 주어진 것들에 감사하며 나눔을 실천하면 복이 쌓입니다.',
  '도전과 극복의 해입니다. 역경이 있더라도 포기하지 않으면 더 강해집니다.',
  '내실을 다지는 해입니다. 겉보다 내면의 성장에 집중하면 기초가 단단해집니다.',
  '행운이 곁에 있는 해입니다. 긍정적인 마음가짐이 좋은 기운을 불러옵니다.',
];

const MONTHLY_FORTUNES = [
  '새로운 인연이 시작되고 좋은 소식이 찾아오는 달입니다.',
  '재물에 좋은 기운이 있으니 작은 투자를 고려해볼 만합니다.',
  '건강 관리에 주의가 필요한 달입니다. 무리하지 마세요.',
  '대인관계에서 좋은 일이 생기고 협력이 잘 이루어집니다.',
  '적극적으로 나서면 원하는 결과를 얻을 수 있는 달입니다.',
  '가정과 휴식에 집중하면 에너지가 충전되는 달입니다.',
  '변화를 두려워하지 말고 새로운 시도를 해보세요.',
  '학업이나 자기 계발에 투자하기 좋은 달입니다.',
  '예상치 못한 행운이 찾아올 수 있으니 기대해도 좋습니다.',
  '중요한 결정은 신중하게, 서두르지 않는 것이 좋습니다.',
  '창의적인 아이디어가 빛을 발하는 달입니다.',
  '마무리와 정리에 집중하면 새해를 깔끔하게 맞이합니다.',
  '좋은 기회가 찾아오니 준비된 자세로 맞이하세요.',
  '소통이 잘 되는 달입니다. 말 한마디가 큰 힘이 됩니다.',
  '재정적 계획을 다시 점검하기 좋은 시기입니다.',
  '여행이나 새로운 경험이 활력을 불어넣어줍니다.',
];

const ADVICES = [
  '서두르지 말고 천천히 나아가세요.',
  '감사하는 마음이 행운을 부릅니다.',
  '주변 사람들과 소통을 늘려보세요.',
  '건강을 최우선으로 챙기세요.',
  '새로운 시작을 두려워하지 마세요.',
  '인내심을 갖고 기다리면 때가 옵니다.',
  '진심으로 대하면 반드시 통합니다.',
  '작은 것에 감사하는 하루를 만드세요.',
  '믿는 사람과 함께하면 더 강해집니다.',
  '자신을 믿고 당당하게 나아가세요.',
  '균형 잡힌 생활이 행복의 비결입니다.',
  '나눔을 실천하면 더 많이 돌아옵니다.',
];

export function calculateTojeong(input: TojeongInput): TojeongResult {
  const seed = `${input.birthYear}-${input.birthMonth}-${input.birthDay}-${input.gender}`;
  const baseHash = simpleHash(seed);

  const year = new Date().getFullYear();
  const overallFortune = OVERALL_FORTUNES[baseHash % OVERALL_FORTUNES.length];

  const monthlyFortunes: MonthlyFortune[] = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthHash = simpleHash(`${seed}:${year}:${month}`);
    const fortuneIdx = monthHash % MONTHLY_FORTUNES.length;
    const score = (monthHash % 4) + 1; // 1~4 (별점)
    const adviceIdx = simpleHash(`${seed}:${year}:${month}:advice`) % ADVICES.length;

    return {
      month,
      fortune: MONTHLY_FORTUNES[fortuneIdx],
      score: score < 1 ? 1 : score > 5 ? 5 : score,
      advice: ADVICES[adviceIdx],
    };
  });

  // 점수 높은 달 최대 3개
  const sorted = [...monthlyFortunes].sort((a, b) => b.score - a.score);
  const luckyMonths = sorted.slice(0, 3).map((f) => f.month).sort((a, b) => a - b);

  // 점수 낮은 달 최대 2개 (score <= 2)
  const warningMonths = monthlyFortunes
    .filter((f) => f.score <= 2)
    .map((f) => f.month)
    .slice(0, 2);

  return {
    year,
    overallFortune,
    monthlyFortunes,
    luckyMonths,
    warningMonths,
  };
}
