// src/lib/calculators/lifeRemaining.ts
// 인생 남은 시간 계산기 (CALC-42)

export type LifeRemainingInput = {
  birthDate: string;
  lifeExpectancy: number;
};

export type LifeRemainingResult = {
  ageYears: number;
  ageMonths: number;
  livedDays: number;
  remainingDays: number;
  remainingYears: number;
  remainingMonths: number;
  livedPercent: number;
  remainingPercent: number;
  lifeDeathDate: string;
  remainingHeartbeats: number;
  remainingSleepHours: number;
  remainingMeals: number;
};

export function calculateLifeRemaining(input: LifeRemainingInput): LifeRemainingResult {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const birth = new Date(input.birthDate);
  birth.setHours(0, 0, 0, 0);

  const lifeExpectancyDays = Math.round(input.lifeExpectancy * 365.25);

  // 살아온 날수
  const livedDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

  // 예상 사망일
  const deathDate = new Date(birth.getTime() + lifeExpectancyDays * 24 * 60 * 60 * 1000);
  const lifeDeathDate = deathDate.toISOString().split('T')[0];

  // 남은 날수
  const remainingDays = Math.max(0, lifeExpectancyDays - livedDays);

  // 나이 계산 (년, 추가 월)
  const ageYears = Math.floor(livedDays / 365.25);
  const ageMonths = Math.floor((livedDays % 365.25) / 30.44);

  // 남은 시간 (년, 추가 월)
  const remainingYears = Math.floor(remainingDays / 365.25);
  const remainingMonths = Math.floor((remainingDays % 365.25) / 30.44);

  // 퍼센트
  const livedPercent = Math.min(100, parseFloat(((livedDays / lifeExpectancyDays) * 100).toFixed(1)));
  const remainingPercent = parseFloat((100 - livedPercent).toFixed(1));

  // 재미있는 등가 계산
  const remainingHeartbeats = Math.round(remainingDays * 70 * 60 * 24); // 심박수 약 70회/분
  const remainingSleepHours = Math.round(remainingDays * 7); // 하루 7시간 수면
  const remainingMeals = Math.round(remainingDays * 3); // 하루 3끼

  return {
    ageYears,
    ageMonths,
    livedDays,
    remainingDays,
    remainingYears,
    remainingMonths,
    livedPercent,
    remainingPercent,
    lifeDeathDate,
    remainingHeartbeats,
    remainingSleepHours,
    remainingMeals,
  };
}
