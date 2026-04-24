import { describe, it, expect } from 'vitest';
import { calculateMbtiCompat } from '@/lib/calculators/mbtiCompatibility';

describe('mbtiCompatibility', () => {
  it('INTJ와 ENFP는 높은 궁합(88+)이어야 한다', () => {
    const result = calculateMbtiCompat({ type1: 'INTJ', type2: 'ENFP' });
    expect(result.score).toBeGreaterThanOrEqual(88);
    expect(result.grade).toBe('최고의 궁합');
  });

  it('INTJ와 INTJ는 유효한 결과를 반환해야 한다', () => {
    const result = calculateMbtiCompat({ type1: 'INTJ', type2: 'INTJ' });
    expect(result.score).toBeGreaterThan(0);
    expect(result.grade).toBeDefined();
    expect(result.relationshipType).toBe('거울 관계');
  });

  it('모든 16개 유형이 유효한 결과를 반환해야 한다', () => {
    const types = [
      'INTJ', 'INTP', 'ENTJ', 'ENTP',
      'INFJ', 'INFP', 'ENFJ', 'ENFP',
      'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
      'ISTP', 'ISFP', 'ESTP', 'ESFP',
    ];
    for (const t1 of types) {
      for (const t2 of types.slice(0, 3)) {
        const result = calculateMbtiCompat({ type1: t1, type2: t2 });
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(100);
      }
    }
  });

  it('strengths와 challenges는 각 2개여야 한다', () => {
    const result = calculateMbtiCompat({ type1: 'ENFP', type2: 'INTJ' });
    expect(result.strengths).toHaveLength(2);
    expect(result.challenges).toHaveLength(2);
  });

  it('유효하지 않은 유형은 보통 점수를 반환해야 한다', () => {
    const result = calculateMbtiCompat({ type1: 'XXXX', type2: 'YYYY' });
    expect(result.score).toBe(50);
  });

  it('점수는 0~100 범위이어야 한다', () => {
    const result = calculateMbtiCompat({ type1: 'ISTJ', type2: 'ENFP' });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
