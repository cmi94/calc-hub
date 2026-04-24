import { describe, it, expect } from 'vitest';
import { calculateLifeRemaining } from '@/lib/calculators/lifeRemaining';

describe('lifeRemaining', () => {
  it('살아온 날 + 남은 날 ≈ lifeExpectancy × 365 (±5일 오차 허용)', () => {
    const result = calculateLifeRemaining({
      birthDate: '1990-01-01',
      lifeExpectancy: 83,
    });
    const totalDays = Math.round(83 * 365.25);
    expect(Math.abs(result.livedDays + result.remainingDays - totalDays)).toBeLessThanOrEqual(5);
  });

  it('livedPercent + remainingPercent ≈ 100 (±1 허용)', () => {
    const result = calculateLifeRemaining({
      birthDate: '1985-06-15',
      lifeExpectancy: 83,
    });
    expect(Math.abs(result.livedPercent + result.remainingPercent - 100)).toBeLessThanOrEqual(1);
  });

  it('나이 계산이 정확해야 한다', () => {
    // 2026-04-24 기준으로 1990-04-24 출생자는 36세
    const result = calculateLifeRemaining({
      birthDate: '1990-04-24',
      lifeExpectancy: 83,
    });
    expect(result.ageYears).toBeGreaterThanOrEqual(35);
    expect(result.ageYears).toBeLessThanOrEqual(37);
  });

  it('remainingDays는 0 이상이어야 한다', () => {
    const result = calculateLifeRemaining({
      birthDate: '2000-01-01',
      lifeExpectancy: 83,
    });
    expect(result.remainingDays).toBeGreaterThanOrEqual(0);
  });

  it('lifeDeathDate는 YYYY-MM-DD 형식이어야 한다', () => {
    const result = calculateLifeRemaining({
      birthDate: '1995-03-10',
      lifeExpectancy: 83,
    });
    expect(result.lifeDeathDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('심박수, 수면, 식사 수 계산이 양수여야 한다', () => {
    const result = calculateLifeRemaining({
      birthDate: '1998-09-01',
      lifeExpectancy: 83,
    });
    expect(result.remainingHeartbeats).toBeGreaterThan(0);
    expect(result.remainingSleepHours).toBeGreaterThan(0);
    expect(result.remainingMeals).toBeGreaterThan(0);
  });
});
