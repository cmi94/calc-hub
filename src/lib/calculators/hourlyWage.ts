// 시급 계산기
// 월 환산: 209시간 기준 (주 40시간 + 주휴 8시간 × 4.345주)
// 출처: 고용노동부 https://www.moel.go.kr
//       근로기준법 제55조 (주휴일), 최저임금법
// 2026년 최저시급: 10,320원 (고용노동부 고시 제2025-65호)

export const MIN_HOURLY_WAGE_2026 = 10_320;

// 월 환산 기준 시간: (주 40시간 + 주휴 8시간) × (365 / 7 / 12) ≈ 209시간
export const MONTHLY_HOURS = 209;

export type HourlyWageInput = {
  hourlyWage: number;   // 시급 (원)
  weeklyHours: number;  // 주간 소정근로시간
  includeHolidayPay: boolean; // 주휴수당 포함 여부
};

export type HourlyWageResult = {
  hourlyWage: number;
  weeklyHours: number;
  dailyWage: number;         // 일급 (8시간 기준)
  weeklyWage: number;        // 주급 (근로분 + 주휴수당)
  monthlyWage: number;       // 월급
  annualWage: number;        // 연봉
  holidayPayPerWeek: number; // 주당 주휴수당
  isAboveMinWage: boolean;   // 최저임금 이상 여부
  minWage: number;           // 2026 최저시급
};

export function calculateHourlyWage(input: HourlyWageInput): HourlyWageResult {
  const { hourlyWage, weeklyHours, includeHolidayPay } = input;

  // 일급: 시급 × 8시간
  const dailyWage = hourlyWage * 8;

  // 주휴수당: 주 15시간 이상 & includeHolidayPay=true
  const isEligibleForHoliday = weeklyHours >= 15 && includeHolidayPay;
  const effectiveHours = Math.min(weeklyHours, 40);
  const holidayPayPerWeek = isEligibleForHoliday
    ? Math.floor((effectiveHours / 40) * 8 * hourlyWage)
    : 0;

  // 주급: 근로분 + 주휴수당
  const weeklyWage = Math.floor(weeklyHours * hourlyWage) + holidayPayPerWeek;

  // 월급: 주간 근로 + 주휴수당, 1개월 = 4.345주
  const monthlyWage = Math.floor(weeklyWage * 4.345);

  // 연봉
  const annualWage = monthlyWage * 12;

  const isAboveMinWage = hourlyWage >= MIN_HOURLY_WAGE_2026;

  return {
    hourlyWage,
    weeklyHours,
    dailyWage,
    weeklyWage,
    monthlyWage,
    annualWage,
    holidayPayPerWeek,
    isAboveMinWage,
    minWage: MIN_HOURLY_WAGE_2026,
  };
}
