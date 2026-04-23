// 청약 가점 계산기
// 출처: 주택공급에 관한 규칙 제28조 (국토교통부)
//       https://www.law.go.kr/법령/주택공급에관한규칙
// 무주택기간(최대32) + 부양가족(최대35) + 청약통장(최대17) = 최대 84점

export type HousingSubscriptionScoreInput = {
  // 무주택기간 (년, 만나이 기준)
  noHouseYears: number;       // 0~15 (15년 이상 → 32점)
  // 부양가족수 (본인 제외)
  dependents: number;         // 0~6 (6명 이상 → 35점)
  // 청약통장 가입 기간 (년)
  subscriptionYears: number;  // 0~15 (15년 이상 → 17점)
};

export type HousingSubscriptionScoreResult = {
  noHouseScore: number;       // 무주택기간 점수 (0~32)
  dependentsScore: number;    // 부양가족 점수 (5~35)
  subscriptionScore: number;  // 청약통장 점수 (1~17)
  totalScore: number;         // 합계 (6~84)
};

/**
 * 무주택기간 점수표 (규칙 별표 1)
 * 1년 미만 → 2점, 이후 1년마다 +2점, 15년 이상 → 32점
 */
function getNoHouseScore(years: number): number {
  if (years < 1) return 2;
  return Math.min(2 + Math.floor(years) * 2, 32);
}

/**
 * 부양가족 점수표
 * 0명 → 5점, 1명 → 10점, ... 6명 이상 → 35점 (+5점/명)
 */
function getDependentsScore(count: number): number {
  return Math.min(5 + count * 5, 35);
}

/**
 * 청약통장 가입기간 점수표
 * 6개월 미만 → 1점, 이후 6개월마다 +1점, 15년 이상 → 17점
 */
function getSubscriptionScore(years: number): number {
  if (years < 0.5) return 1;
  return Math.min(1 + Math.floor(years / 0.5), 17);
}

export function calculateHousingSubscriptionScore(
  input: HousingSubscriptionScoreInput
): HousingSubscriptionScoreResult {
  const { noHouseYears, dependents, subscriptionYears } = input;

  const noHouseScore = getNoHouseScore(noHouseYears);
  const dependentsScore = getDependentsScore(dependents);
  const subscriptionScore = getSubscriptionScore(subscriptionYears);
  const totalScore = noHouseScore + dependentsScore + subscriptionScore;

  return { noHouseScore, dependentsScore, subscriptionScore, totalScore };
}
