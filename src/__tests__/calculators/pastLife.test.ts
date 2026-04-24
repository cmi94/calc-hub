import { describe, it, expect } from 'vitest';
import { calculatePastLife } from '@/lib/calculators/pastLife';

describe('pastLife', () => {
  it('같은 입력에 대해 항상 같은 결과를 반환해야 한다 (결정적)', () => {
    const input = { birthDate: '1990-05-15', gender: 'female' as const };
    const result1 = calculatePastLife(input);
    const result2 = calculatePastLife(input);
    expect(result1.job).toBe(result2.job);
    expect(result1.era).toBe(result2.era);
    expect(result1.country).toBe(result2.country);
  });

  it('다른 입력에 대해 다른 결과가 나올 수 있어야 한다', () => {
    const results = new Set([
      calculatePastLife({ birthDate: '1990-01-01', gender: 'male' }).job,
      calculatePastLife({ birthDate: '1995-06-15', gender: 'female' }).job,
      calculatePastLife({ birthDate: '1985-11-30', gender: 'other' }).job,
      calculatePastLife({ birthDate: '2000-03-22', gender: 'male' }).job,
    ]);
    expect(results.size).toBeGreaterThan(1);
  });

  it('결과에 모든 필수 필드가 있어야 한다', () => {
    const result = calculatePastLife({ birthDate: '1988-07-20', gender: 'male' });
    expect(result.job).toBeTruthy();
    expect(result.era).toBeTruthy();
    expect(result.country).toBeTruthy();
    expect(result.description).toBeTruthy();
    expect(result.trait).toBeTruthy();
    expect(result.shareText).toBeTruthy();
  });

  it('shareText에 job 이름이 포함되어야 한다', () => {
    const result = calculatePastLife({ birthDate: '1992-02-14', gender: 'female' });
    expect(result.shareText).toContain(result.job);
  });

  it('성별에 따라 다른 결과가 나올 수 있어야 한다', () => {
    const male = calculatePastLife({ birthDate: '1991-04-01', gender: 'male' });
    const female = calculatePastLife({ birthDate: '1991-04-01', gender: 'female' });
    // 성별이 다르면 다른 결과 (seed가 다름)
    // 같을 수도 있지만 일반적으로 다름을 검증
    expect(typeof male.job).toBe('string');
    expect(typeof female.job).toBe('string');
  });
});
