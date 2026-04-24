// 전역일 계산기
// 출처: 병역법 제19조 (2026년 기준 복무기간)
// https://www.law.go.kr/법령/병역법

export const SERVICE_PERIODS: Record<string, { months: number; label: string }> = {
  army: { months: 18, label: "육군·해병대" },
  navy: { months: 20, label: "해군" },
  airforce: { months: 21, label: "공군" },
  social: { months: 21, label: "사회복무요원" },
  industrial: { months: 23, label: "산업기능요원" },
  research: { months: 36, label: "전문연구요원" },
};

export type MilitaryDischargeInput = {
  enlistmentDate: string; // 입대일 (YYYY-MM-DD)
  branchKey: string;      // "army" | "navy" | "airforce" | "social" | "industrial" | "research"
  today?: string;
};

export type MilitaryDischargeResult = {
  enlistmentDate: string;
  dischargeDate: string;        // 전역일 (YYYY-MM-DD)
  dischargeDateFormatted: string;
  serviceDays: number;          // 총복무일수
  daysServed: number;           // 복무한 일수 (오늘 기준)
  daysRemaining: number;        // 남은 일수
  progressPct: number;          // 진행률 (0~100, 1자리 소수)
  isCompleted: boolean;         // 전역 완료 여부
  branchLabel: string;          // "육군·해병대"
};

// 달력 기준 월 추가 (말일 자동 조정)
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const originalDay = date.getDate();
  result.setMonth(result.getMonth() + months);

  // 월 말일 초과 시 해당 월의 마지막 날로 조정
  if (result.getDate() !== originalDay) {
    result.setDate(0); // 이전 달의 마지막 날
  }
  return result;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateKorean(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}년 ${m}월 ${d}일`;
}

export function calculateMilitaryDischarge(input: MilitaryDischargeInput): MilitaryDischargeResult {
  const { enlistmentDate, branchKey, today } = input;

  const enlistment = new Date(enlistmentDate);
  const todayDate = today ? new Date(today) : new Date();
  const branch = SERVICE_PERIODS[branchKey] ?? SERVICE_PERIODS.army;

  // 전역일 = 입대일 + N개월
  const discharge = addMonths(enlistment, branch.months);

  // 총복무일수
  const serviceDays = Math.round((discharge.getTime() - enlistment.getTime()) / (24 * 60 * 60 * 1000));

  // 복무한 일수
  const daysServedRaw = Math.round((todayDate.getTime() - enlistment.getTime()) / (24 * 60 * 60 * 1000));
  const daysServed = Math.max(0, Math.min(daysServedRaw, serviceDays));

  // 남은 일수
  const daysRemaining = Math.max(0, serviceDays - daysServedRaw);

  // 진행률
  const rawProgress = (daysServedRaw / serviceDays) * 100;
  const progressPct = Math.round(Math.min(100, Math.max(0, rawProgress)) * 10) / 10;

  // 전역 완료 여부
  const isCompleted = todayDate >= discharge;

  return {
    enlistmentDate,
    dischargeDate: formatDate(discharge),
    dischargeDateFormatted: formatDateKorean(discharge),
    serviceDays,
    daysServed,
    daysRemaining,
    progressPct,
    isCompleted,
    branchLabel: branch.label,
  };
}
