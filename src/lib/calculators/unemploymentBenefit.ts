// 실업급여(구직급여) 계산기
// 출처: 고용보험법 제50조, 제51조
//       https://www.law.go.kr/법령/고용보험법
//       고용보험 홈페이지 https://www.ei.go.kr

// 구직급여일액 상한 (2026년 기준)
// 출처: 고용보험법 제46조 제2항, 고용노동부 고시
// 2024년 66,000원 → 2026년 최저임금 인상에 따라 70,000원으로 상향 추정 적용
// TODO: 2026년 정식 고시 확인 후 갱신 필요
export const DAILY_BENEFIT_MAX = 70_000;

// 구직급여일액 하한: 최저임금의 80% × 8시간
// 2026 최저시급 10,320원 × 8시간 × 0.8
export const DAILY_BENEFIT_MIN = Math.floor(10_320 * 8 * 0.8); // 66,048 → 상한과 동일, 실제 하한 적용

export type AgeGroup = "under50" | "50above";     // 50세 미만 / 50세 이상 및 장애인
export type InsurancePeriod =
  | "under1year"    // 1년 미만
  | "1to3"          // 1년 이상 3년 미만
  | "3to5"          // 3년 이상 5년 미만
  | "5to10"         // 5년 이상 10년 미만
  | "10above";      // 10년 이상

export type UnemploymentBenefitInput = {
  averageDailyWage: number;    // 이직 전 평균임금 (일액, 원)
  ageGroup: AgeGroup;
  insurancePeriod: InsurancePeriod;
};

export type UnemploymentBenefitResult = {
  dailyBenefit: number;        // 구직급여일액
  benefitDays: number;         // 소정급여일수
  totalBenefit: number;        // 총 수급액
  dailyBenefitMax: number;     // 상한액
  dailyBenefitMin: number;     // 하한액
};

/**
 * 소정급여일수 매트릭스 (고용보험법 제50조 별표)
 *                 1년미만  1~3년  3~5년  5~10년  10년이상
 * 50세 미만         120     150    180    210      240
 * 50세 이상/장애인  120     180    210    240      270
 */
const BENEFIT_DAYS: Record<AgeGroup, Record<InsurancePeriod, number>> = {
  under50: {
    under1year: 120,
    "1to3": 150,
    "3to5": 180,
    "5to10": 210,
    "10above": 240,
  },
  "50above": {
    under1year: 120,
    "1to3": 180,
    "3to5": 210,
    "5to10": 240,
    "10above": 270,
  },
};

export function calculateUnemploymentBenefit(
  input: UnemploymentBenefitInput
): UnemploymentBenefitResult {
  const { averageDailyWage, ageGroup, insurancePeriod } = input;

  // 구직급여일액 = 평균임금 × 60%
  const rawDailyBenefit = Math.floor(averageDailyWage * 0.6);

  // 상·하한 적용
  const dailyBenefit = Math.min(
    Math.max(rawDailyBenefit, DAILY_BENEFIT_MIN),
    DAILY_BENEFIT_MAX
  );

  const benefitDays = BENEFIT_DAYS[ageGroup][insurancePeriod];
  const totalBenefit = dailyBenefit * benefitDays;

  return {
    dailyBenefit,
    benefitDays,
    totalBenefit,
    dailyBenefitMax: DAILY_BENEFIT_MAX,
    dailyBenefitMin: DAILY_BENEFIT_MIN,
  };
}
