import { describe, it, expect } from 'vitest';
import { calculateZodiacCompat } from '@/lib/calculators/zodiacCompat';

describe('zodiacCompat', () => {
  it('점수는 0~100 범위 내에 있어야 한다', () => {
    const result = calculateZodiacCompat({
      person1Month: 3, person1Day: 21,
      person2Month: 6, person2Day: 21,
    });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('양자리(3/21)와 사수자리(11/22)는 불-불 조합으로 높은 점수여야 한다', () => {
    const result = calculateZodiacCompat({
      person1Month: 3, person1Day: 21,
      person2Month: 11, person2Day: 22,
    });
    expect(result.score).toBeGreaterThanOrEqual(75);
  });

  it('같은 생일이면 같은 별자리끼리의 궁합이 나온다', () => {
    const result = calculateZodiacCompat({
      person1Month: 5, person1Day: 10,
      person2Month: 5, person2Day: 15,
    });
    expect(result.person1Sign.nameKo).toBe(result.person2Sign.nameKo);
  });

  it('등급이 올바르게 매핑되어야 한다', () => {
    const highResult = calculateZodiacCompat({
      person1Month: 3, person1Day: 21,
      person2Month: 11, person2Day: 23,
    });
    const validGrades = ['천생연분', '찰떡궁합', '보통궁합', '노력이 필요해', '상극'];
    expect(validGrades).toContain(highResult.grade);
  });

  it('tips 배열이 2개여야 한다', () => {
    const result = calculateZodiacCompat({
      person1Month: 1, person1Day: 20,
      person2Month: 7, person2Day: 23,
    });
    expect(result.tips).toHaveLength(2);
  });

  it('날짜 기반으로 별자리가 올바르게 감지된다 (게자리 7/1)', () => {
    const result = calculateZodiacCompat({
      person1Month: 7, person1Day: 1,
      person2Month: 7, person2Day: 1,
    });
    expect(result.person1Sign.nameKo).toBe('게자리');
  });
});
