import { describe, it, expect } from 'vitest';
import { calculateAnimalCompat } from '@/lib/calculators/animalCompat';

describe('animalCompat', () => {
  it('삼합 - 쥐(1996)와 용(2000)은 높은 점수(80+)를 가져야 한다', () => {
    const result = calculateAnimalCompat({ person1BirthYear: 1996, person2BirthYear: 2000 });
    expect(result.score).toBeGreaterThan(80);
    expect(result.compatType).toBe('삼합');
  });

  it('상충 - 쥐(1996)와 말(1990)은 낮은 점수(<40)를 가져야 한다', () => {
    const result = calculateAnimalCompat({ person1BirthYear: 1996, person2BirthYear: 1990 });
    expect(result.score).toBeLessThan(40);
    expect(result.compatType).toBe('상충');
  });

  it('같은 띠(쥐-쥐)는 70점이어야 한다', () => {
    const result = calculateAnimalCompat({ person1BirthYear: 1996, person2BirthYear: 2008 });
    expect(result.score).toBe(70);
  });

  it('육합 - 쥐(1996)와 소(1997)는 육합 관계', () => {
    const result = calculateAnimalCompat({ person1BirthYear: 1996, person2BirthYear: 1997 });
    expect(result.compatType).toBe('육합');
    expect(result.score).toBeGreaterThan(80);
  });

  it('결과에 필수 필드가 있어야 한다', () => {
    const result = calculateAnimalCompat({ person1BirthYear: 1985, person2BirthYear: 1990 });
    expect(result.person1Animal.nameKo).toBeDefined();
    expect(result.person2Animal.nameKo).toBeDefined();
    expect(result.grade).toBeDefined();
    expect(result.description).toBeDefined();
    expect(result.tips).toHaveLength(2);
  });

  it('점수는 0~100 범위 내에 있어야 한다', () => {
    const result = calculateAnimalCompat({ person1BirthYear: 1980, person2BirthYear: 1994 });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
