// 나이 계산기
// 만나이: 민법 제158조 (생일이 지난 경우 연수 적용)
// 한국 나이 (세는나이): 출생 시 1세, 매년 1월 1일 +1
// 연나이: 현재 연도 - 출생 연도
// 출처: 법제처 만 나이 통일법 (2023.06.28 시행)

export type AgeInput = {
  birthDate: string;      // "YYYY-MM-DD"
  referenceDate?: string; // 기준일, 미입력 시 오늘
};

export type AgeResult = {
  birthDate: string;
  referenceDate: string;
  internationalAge: number;   // 만나이
  koreanAge: number;          // 한국 나이 (세는나이)
  yearAge: number;            // 연나이 (현재연도 - 출생연도)
  daysUntilNextBirthday: number; // 다음 생일까지 일수 (생일 당일이면 0)
  nextBirthdayDate: string;   // 다음 생일 날짜 "YYYY-MM-DD"
  isLeapBirthday: boolean;    // 2월 29일 생 여부
};

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function calculateAge(input: AgeInput): AgeResult {
  const { birthDate, referenceDate } = input;

  const birth = new Date(birthDate);
  const ref = referenceDate ? new Date(referenceDate) : new Date();

  // 시간 영향 제거 (날짜 단위 비교)
  birth.setHours(0, 0, 0, 0);
  ref.setHours(0, 0, 0, 0);

  const birthYear = birth.getFullYear();
  const birthMonth = birth.getMonth(); // 0-based
  const birthDay = birth.getDate();

  const refYear = ref.getFullYear();
  const refMonth = ref.getMonth();
  const refDay = ref.getDate();

  // 만나이: 생일이 지났으면 연차, 안 지났으면 -1
  const hasBirthdayPassed =
    refMonth > birthMonth || (refMonth === birthMonth && refDay >= birthDay);
  const internationalAge = refYear - birthYear - (hasBirthdayPassed ? 0 : 1);

  // 한국 나이 (세는나이): 현재 연도 - 출생 연도 + 1
  const koreanAge = refYear - birthYear + 1;

  // 연나이
  const yearAge = refYear - birthYear;

  // 다음 생일 계산 (2월 29일생은 평년에 3월 1일로 처리)
  const isLeapBirthday = birthMonth === 1 && birthDay === 29;

  function getNextBirthday(year: number): Date {
    if (isLeapBirthday) {
      // 윤년이면 2/29, 아니면 3/1
      const isLeapYear = (y: number) =>
        (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      return isLeapYear(year)
        ? new Date(year, 1, 29)
        : new Date(year, 2, 1);
    }
    return new Date(year, birthMonth, birthDay);
  }

  let nextBirthday = getNextBirthday(refYear);
  if (nextBirthday < ref) {
    nextBirthday = getNextBirthday(refYear + 1);
  }
  // 오늘이 생일이면 다음 생일은 내년
  const isTodayBirthday = nextBirthday.getTime() === ref.getTime();

  const daysUntilNextBirthday = isTodayBirthday
    ? 0
    : Math.round((nextBirthday.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24));

  const nextBirthdayDate = toLocalDateString(nextBirthday);

  return {
    birthDate,
    referenceDate: toLocalDateString(ref),
    internationalAge,
    koreanAge,
    yearAge,
    daysUntilNextBirthday,
    nextBirthdayDate,
    isLeapBirthday,
  };
}
