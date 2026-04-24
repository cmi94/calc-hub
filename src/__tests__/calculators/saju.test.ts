import { describe, it, expect } from 'vitest';
import { calculateSaju, type Element } from '@/lib/calculators/saju';

describe('saju', () => {
  it('시각 제공 시 4개 기둥이 모두 있어야 한다', () => {
    const result = calculateSaju({
      birthYear: 1990,
      birthMonth: 5,
      birthDay: 15,
      birthHour: 10,
      gender: 'male',
    });
    expect(result.yearPillar).toBeDefined();
    expect(result.monthPillar).toBeDefined();
    expect(result.dayPillar).toBeDefined();
    expect(result.hourPillar).toBeDefined();
  });

  it('시각 미제공 시 시주가 없어야 한다', () => {
    const result = calculateSaju({
      birthYear: 1990,
      birthMonth: 5,
      birthDay: 15,
      gender: 'female',
    });
    expect(result.hourPillar).toBeUndefined();
  });

  it('오행 카운트의 합은 기둥 수 × 2와 같아야 한다 (천간+지지)', () => {
    const result = calculateSaju({
      birthYear: 1990,
      birthMonth: 5,
      birthDay: 15,
      birthHour: 12,
      gender: 'male',
    });
    const total = Object.values(result.elementCounts).reduce((sum, v) => sum + v, 0);
    // 4기둥 × 2 (천간+지지) = 8
    expect(total).toBe(8);
  });

  it('시각 없는 경우 오행 합은 6이어야 한다', () => {
    const result = calculateSaju({
      birthYear: 1985,
      birthMonth: 3,
      birthDay: 10,
      gender: 'female',
    });
    const total = Object.values(result.elementCounts).reduce((sum, v) => sum + v, 0);
    expect(total).toBe(6);
  });

  it('dominantElement는 유효한 오행이어야 한다', () => {
    const result = calculateSaju({
      birthYear: 1992,
      birthMonth: 8,
      birthDay: 20,
      gender: 'male',
    });
    const validElements: Element[] = ['목', '화', '토', '금', '수'];
    expect(validElements).toContain(result.dominantElement);
  });

  it('각 기둥에 천간과 지지가 있어야 한다', () => {
    const result = calculateSaju({
      birthYear: 1998,
      birthMonth: 11,
      birthDay: 25,
      gender: 'female',
    });
    expect(result.yearPillar.heavenlyStem).toBeTruthy();
    expect(result.yearPillar.earthlyBranch).toBeTruthy();
    expect(result.dayPillar.heavenlyStem).toBeTruthy();
    expect(result.dayPillar.earthlyBranch).toBeTruthy();
  });

  it('운세와 분석 텍스트가 존재해야 한다', () => {
    const result = calculateSaju({
      birthYear: 2000,
      birthMonth: 1,
      birthDay: 1,
      gender: 'male',
    });
    expect(result.analysis).toBeTruthy();
    expect(result.fortuneThisYear).toBeTruthy();
    expect(result.luckyDirection).toBeTruthy();
    expect(result.luckyColor).toBeTruthy();
  });
});
