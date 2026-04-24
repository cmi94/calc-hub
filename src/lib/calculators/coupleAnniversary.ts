// src/lib/calculators/coupleAnniversary.ts
// 커플 기념일 계산기 (CALC-34)

export type CoupleAnniversaryInput = {
  startDate: string;
  referenceDate?: string;
};

export type Anniversary = {
  label: string;
  date: string;
  daysFromStart: number;
  isPast: boolean;
  daysUntil?: number;
};

export type CoupleAnniversaryResult = {
  startDate: string;
  currentDays: number;
  currentYears: number;
  currentMonths: number;
  anniversaries: Anniversary[];
};

const MILESTONES: { label: string; days: number }[] = [
  { label: '100일',  days: 99  },
  { label: '200일',  days: 199 },
  { label: '300일',  days: 299 },
  { label: '1주년',  days: 365 },
  { label: '500일',  days: 499 },
  { label: '2주년',  days: 730 },
  { label: '1000일', days: 999 },
  { label: '3주년',  days: 1095 },
  { label: '4주년',  days: 1460 },
  { label: '5주년',  days: 1825 },
  { label: '6주년',  days: 2190 },
  { label: '7주년',  days: 2555 },
  { label: '8주년',  days: 2920 },
  { label: '9주년',  days: 3285 },
  { label: '10주년', days: 3650 },
];

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function daysBetween(from: string, to: string): number {
  const a = new Date(from);
  const b = new Date(to);
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculateCoupleAnniversary(input: CoupleAnniversaryInput): CoupleAnniversaryResult {
  const today = input.referenceDate ?? new Date().toISOString().split('T')[0];
  const start = input.startDate;

  const currentDays = daysBetween(start, today) + 1; // 사귄 날 포함
  const currentYears = Math.floor(currentDays / 365);
  const currentMonths = Math.floor((currentDays % 365) / 30);

  const anniversaries: Anniversary[] = MILESTONES.map(({ label, days }) => {
    const annivDate = addDays(start, days);
    const isPast = annivDate <= today;
    const daysUntil = isPast ? undefined : daysBetween(today, annivDate);

    return {
      label,
      date: annivDate,
      daysFromStart: days + 1,
      isPast,
      daysUntil,
    };
  });

  return {
    startDate: start,
    currentDays,
    currentYears,
    currentMonths,
    anniversaries,
  };
}
