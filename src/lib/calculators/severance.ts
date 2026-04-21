// 퇴직금 계산기
// 근로자퇴직급여보장법 제8조, 근로기준법 제34조
// 출처: 고용노동부 https://www.moel.go.kr
//       근로자퇴직급여보장법 https://www.law.go.kr/법령/근로자퇴직급여보장법

export type SeveranceInput = {
  startDate: string;   // 입사일 (YYYY-MM-DD)
  endDate: string;     // 퇴사일 (YYYY-MM-DD)
  lastThreeMonthsPay: number; // 최근 3개월 세전 급여 합계 (원)
  lastThreeMonthsDays: number; // 최근 3개월 역일수 (기본 90일 또는 실제 일수)
};

export type SeveranceResult = {
  workDays: number;         // 재직일수
  workYears: number;        // 재직연수 (소수점)
  averageDailyWage: number; // 평균임금 (일)
  severancePay: number;     // 퇴직금
  isEligible: boolean;      // 수급 자격 여부 (1년 이상 + 주 15시간 이상)
};

export function calculateSeverance(input: SeveranceInput): SeveranceResult {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);

  // 재직일수 = 퇴사일 - 입사일 (당일 포함)
  const workDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const workYears = workDays / 365;

  // 1년 미만이면 퇴직금 없음
  const isEligible = workDays >= 365;

  // 평균임금 = 최근 3개월 급여 합계 ÷ 최근 3개월 역일수
  const averageDailyWage = Math.floor(input.lastThreeMonthsPay / input.lastThreeMonthsDays);

  // 퇴직금 = 평균임금 × 30일 × (재직일수 ÷ 365)
  const severancePay = isEligible
    ? Math.floor(averageDailyWage * 30 * (workDays / 365))
    : 0;

  return { workDays, workYears, averageDailyWage, severancePay, isEligible };
}
