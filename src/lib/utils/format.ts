// src/lib/utils/format.ts
// 숫자/날짜/통화 포맷 유틸

/**
 * 숫자를 한국 원화 형식으로 포맷
 * @example formatKRW(1234) → "1,234원"
 */
export function formatKRW(n: number): string {
  return `${formatNumber(n)}원`;
}

/**
 * 숫자에 천 단위 구분자 추가
 * @example formatNumber(1234567) → "1,234,567"
 */
export function formatNumber(n: number): string {
  return Math.round(n).toLocaleString('ko-KR');
}

/**
 * 숫자를 퍼센트 형식으로 포맷
 * @example formatPercent(0.15) → "15.0%"
 * @example formatPercent(0.1234, 2) → "12.34%"
 */
export function formatPercent(r: number, digits = 1): string {
  return `${(r * 100).toFixed(digits)}%`;
}

/**
 * Date를 한국어 날짜 형식으로 포맷
 * @example formatDate(new Date('2026-04-23')) → "2026년 4월 23일"
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

/**
 * Date를 짧은 날짜 형식으로 포맷
 * @example formatDateShort(new Date('2026-04-23')) → "2026.04.23"
 */
export function formatDateShort(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * Date를 ISO 형식으로 포맷
 * @example formatDateISO(new Date('2026-04-23')) → "2026-04-23"
 */
export function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 날짜에 일수를 더함
 * @example addDays(new Date('2026-04-23'), 7) → 2026-04-30
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 두 날짜 사이 일수 계산 (b - a)
 * @example diffDays(new Date('2026-01-01'), new Date('2026-04-23')) → 112
 */
export function diffDays(a: Date, b: Date): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / MS_PER_DAY);
}
