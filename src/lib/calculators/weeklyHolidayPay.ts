// 주휴수당 계산기
// 근로기준법 제55조 (휴일), 제18조 (단시간근로자)
// 출처: 고용노동부 https://www.moel.go.kr
//       근로기준법 https://www.law.go.kr/법령/근로기준법

export type WeeklyHolidayPayInput = {
  hourlyWage: number;       // 시급 (원)
  weeklyHours: number;      // 주간 소정근로시간
};

export type WeeklyHolidayPayResult = {
  hourlyWage: number;
  weeklyHours: number;
  holidayPayPerWeek: number;  // 주당 주휴수당
  holidayPayPerMonth: number; // 월 주휴수당 (× 4.345주)
  monthlyTotalWage: number;   // 월 총 임금 (근로분 + 주휴수당)
  isEligible: boolean;        // 주 15시간 이상 여부
};

// 최저시급 2026년 기준 (고용노동부 고시 기준, 확인 필요)
// 2025년 최저시급 10,030원 기준 — 2026년 미확정 시 동일 적용
export const MIN_HOURLY_WAGE_2026 = 10_030;

export function calculateWeeklyHolidayPay(input: WeeklyHolidayPayInput): WeeklyHolidayPayResult {
  const { hourlyWage, weeklyHours } = input;

  // 주 15시간 미만은 주휴수당 미적용 (근로기준법 제18조)
  const isEligible = weeklyHours >= 15;

  // 주휴수당 = (주간 소정근로시간 ÷ 40) × 8시간 × 시급
  // 주 40시간 이상 근무 시 8시간분 지급 (상한)
  const effectiveHours = Math.min(weeklyHours, 40);
  const holidayPayPerWeek = isEligible
    ? Math.floor((effectiveHours / 40) * 8 * hourlyWage)
    : 0;

  // 월 주휴수당: 1개월 평균 주수 4.345주 적용
  const holidayPayPerMonth = Math.floor(holidayPayPerWeek * 4.345);

  // 월 총 임금 = 주간 근로시간 × 4.345주 × 시급 + 월 주휴수당
  const monthlyTotalWage = Math.floor(weeklyHours * 4.345 * hourlyWage) + holidayPayPerMonth;

  return {
    hourlyWage,
    weeklyHours,
    holidayPayPerWeek,
    holidayPayPerMonth,
    monthlyTotalWage,
    isEligible,
  };
}
