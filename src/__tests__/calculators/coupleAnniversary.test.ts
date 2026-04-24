import { describe, it, expect } from 'vitest';
import { calculateCoupleAnniversary } from '@/lib/calculators/coupleAnniversary';

describe('coupleAnniversary', () => {
  it('100일 기념일은 시작일로부터 99일 후여야 한다', () => {
    const result = calculateCoupleAnniversary({
      startDate: '2023-01-01',
      referenceDate: '2026-04-24',
    });
    const hundredDay = result.anniversaries.find((a) => a.label === '100일');
    expect(hundredDay).toBeDefined();
    // 2023-01-01 + 99일 = 2023-04-09
    expect(hundredDay!.date).toBe('2023-04-09');
    expect(hundredDay!.daysFromStart).toBe(100);
  });

  it('1주년은 시작일로부터 365일 후여야 한다', () => {
    const result = calculateCoupleAnniversary({
      startDate: '2023-01-01',
      referenceDate: '2026-04-24',
    });
    const oneYear = result.anniversaries.find((a) => a.label === '1주년');
    expect(oneYear).toBeDefined();
    // 2023-01-01 + 365일 = 2023-12-31
    expect(oneYear!.date).toBe('2023-12-31');
    expect(oneYear!.daysFromStart).toBe(366);
  });

  it('currentDays는 양수여야 한다', () => {
    const result = calculateCoupleAnniversary({
      startDate: '2020-01-01',
      referenceDate: '2026-04-24',
    });
    expect(result.currentDays).toBeGreaterThan(0);
  });

  it('지난 기념일은 isPast가 true여야 한다', () => {
    const result = calculateCoupleAnniversary({
      startDate: '2020-01-01',
      referenceDate: '2026-04-24',
    });
    const hundredDay = result.anniversaries.find((a) => a.label === '100일');
    expect(hundredDay!.isPast).toBe(true);
  });

  it('미래 기념일은 daysUntil이 정의되어야 한다', () => {
    // 최근 시작한 커플
    const result = calculateCoupleAnniversary({
      startDate: '2026-04-01',
      referenceDate: '2026-04-24',
    });
    const future = result.anniversaries.find((a) => !a.isPast);
    if (future) {
      expect(future.daysUntil).toBeDefined();
      expect(future.daysUntil).toBeGreaterThanOrEqual(0);
    }
  });

  it('anniversaries는 15개여야 한다', () => {
    const result = calculateCoupleAnniversary({
      startDate: '2020-01-01',
      referenceDate: '2026-04-24',
    });
    expect(result.anniversaries).toHaveLength(15);
  });
});
