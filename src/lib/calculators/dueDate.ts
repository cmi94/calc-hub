// 출산예정일 계산기
// 공식: Naegele's rule — 마지막 생리 시작일(LMP) + 280일
// 출처: https://www.acog.org (미국산부인과학회)

export type DueDateInput = {
  lmpDate: string; // 마지막 생리 시작일 (YYYY-MM-DD)
  today?: string;  // 기준일 (기본: 오늘, YYYY-MM-DD)
};

export type DueDateResult = {
  lmpDate: string;
  dueDate: string;          // 출산예정일 (YYYY-MM-DD)
  dueDateFormatted: string; // "2026년 11월 15일"
  gestationalWeeks: number; // 현재 임신 주수 (0 이상)
  gestationalDays: number;  // 현재 임신 일수
  daysUntilDue: number;    // 출산예정일까지 남은 일수 (음수 가능)
  trimester: 1 | 2 | 3;   // 임신 3분기
  trimesterName: string;   // "임신 1분기" 등
};

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

function getTrimester(weeks: number): { trimester: 1 | 2 | 3; trimesterName: string } {
  if (weeks <= 13) return { trimester: 1, trimesterName: "임신 1분기" };
  if (weeks <= 27) return { trimester: 2, trimesterName: "임신 2분기" };
  return { trimester: 3, trimesterName: "임신 3분기" };
}

export function calculateDueDate(input: DueDateInput): DueDateResult {
  const { lmpDate, today } = input;

  const lmp = new Date(lmpDate);
  const todayDate = today ? new Date(today) : new Date();

  // 출산예정일 = LMP + 280일
  const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);

  // 현재 임신 일수 (오늘 - LMP, ms → days)
  const diffMs = todayDate.getTime() - lmp.getTime();
  const gestationalDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  // 임신 주수
  const gestationalWeeks = Math.max(0, Math.floor(gestationalDays / 7));

  // 출산예정일까지 남은 일수
  const dueDiffMs = due.getTime() - todayDate.getTime();
  const daysUntilDue = Math.ceil(dueDiffMs / (24 * 60 * 60 * 1000));

  const { trimester, trimesterName } = getTrimester(gestationalWeeks);

  return {
    lmpDate,
    dueDate: formatDate(due),
    dueDateFormatted: formatDateKorean(due),
    gestationalWeeks,
    gestationalDays: Math.max(0, gestationalDays),
    daysUntilDue,
    trimester,
    trimesterName,
  };
}
