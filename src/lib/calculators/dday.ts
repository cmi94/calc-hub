// D-day / 날짜 계산기
// 두 날짜 사이의 일수, 주, 월, 년 단위 계산

export type DdayInput = {
  startDate: string;      // "YYYY-MM-DD" 기준일 (이전 날짜)
  endDate: string;        // "YYYY-MM-DD" 목표일 (이후 날짜)
};

export type DdayResult = {
  startDate: string;
  endDate: string;
  totalDays: number;    // 두 날짜 사이 일수 (절댓값)
  isPast: boolean;      // endDate가 오늘보다 과거인지
  dday: number;         // D-day 표기용: 양수=미래, 음수=과거, 0=당일
  weeks: number;        // 총 주 (소수 없음, Math.floor)
  months: number;       // 총 월 (소수 없음)
  years: number;        // 총 년 (소수 없음)
  breakdown: {
    years: number;
    months: number;
    days: number;
  };
};

function toMidnight(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

export function calculateDday(input: DdayInput): DdayResult {
  const { startDate, endDate } = input;

  const start = toMidnight(startDate);
  const end = toMidnight(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.round(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
  const dday = Math.round((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isPast = end < today;

  const weeks = Math.floor(totalDays / 7);
  const months = Math.floor(totalDays / 30.4375); // 평균 월일수
  const years = Math.floor(totalDays / 365.25);   // 평균 연일수

  // 년·월·일 분리 (달력 기준)
  let bYear = start.getFullYear();
  let bMonth = start.getMonth();
  let bDay = start.getDate();

  const eYear = end.getFullYear();
  const eMonth = end.getMonth();
  const eDay = end.getDate();

  // 시작이 종료보다 늦은 경우에도 처리 (절대값)
  const [fromDate, toDate] = diffMs >= 0 ? [start, end] : [end, start];
  let fy = fromDate.getFullYear(), fm = fromDate.getMonth(), fd = fromDate.getDate();
  let ty = toDate.getFullYear(), tm = toDate.getMonth(), td = toDate.getDate();

  let breakYears = ty - fy;
  let breakMonths = tm - fm;
  let breakDays = td - fd;

  if (breakDays < 0) {
    breakMonths -= 1;
    const prevMonth = new Date(ty, tm, 0);
    breakDays += prevMonth.getDate();
  }
  if (breakMonths < 0) {
    breakYears -= 1;
    breakMonths += 12;
  }

  return {
    startDate,
    endDate,
    totalDays,
    isPast,
    dday,
    weeks,
    months,
    years,
    breakdown: {
      years: breakYears,
      months: breakMonths,
      days: breakDays,
    },
  };
}

// 오늘 기준 D-day 계산 (목표일 하나만 입력)
export function calculateDdayFromToday(targetDate: string): DdayResult {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return calculateDday({ startDate: todayStr, endDate: targetDate });
}
