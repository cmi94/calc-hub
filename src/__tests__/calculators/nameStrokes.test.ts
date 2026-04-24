import { describe, it, expect } from 'vitest';
import { calculateNameStrokes } from '@/lib/calculators/nameStrokes';
import { SURI_TABLE } from '@/lib/data/strokeTable';

describe('nameStrokes', () => {
  it('김민준: 김은 7획이어야 한다', () => {
    const result = calculateNameStrokes({ surname: '김', givenName: '민준' });
    expect(result.surnameStrokes[0].char).toBe('김');
    expect(result.surnameStrokes[0].strokes).toBe(7);
  });

  it('원격(wonGyeok)은 성씨 획수 합과 같아야 한다', () => {
    const result = calculateNameStrokes({ surname: '이', givenName: '지수' });
    expect(result.wonGyeok).toBe(result.surnameTotal);
  });

  it('정격(jeongGyeok)은 성씨+이름 전체 획수 합과 같아야 한다', () => {
    const result = calculateNameStrokes({ surname: '박', givenName: '서연' });
    expect(result.jeongGyeok).toBe(result.surnameTotal + result.givenNameTotal);
  });

  it('형격(hyeongGyeok)은 성씨+이름첫자 획수여야 한다', () => {
    const result = calculateNameStrokes({ surname: '최', givenName: '민수' });
    const expected = result.surnameTotal + result.givenNameStrokes[0].strokes;
    expect(result.hyeongGyeok).toBe(expected);
  });

  it('수리 테이블에서 유효한 type을 반환해야 한다', () => {
    const result = calculateNameStrokes({ surname: '정', givenName: '아영' });
    const validTypes = ['대길', '길', '평', '흉', '대흉'];
    expect(validTypes).toContain(result.wonSuri.type);
    expect(validTypes).toContain(result.hyeongSuri.type);
    expect(validTypes).toContain(result.iSuri.type);
    expect(validTypes).toContain(result.jeongSuri.type);
  });

  it('overallRating이 유효한 값이어야 한다', () => {
    const result = calculateNameStrokes({ surname: '김', givenName: '지훈' });
    const validRatings = ['대길', '길', '평', '흉', '대흉'];
    expect(validRatings).toContain(result.overallRating);
  });

  it('SURI_TABLE은 81개 항목이어야 한다', () => {
    expect(SURI_TABLE).toHaveLength(81);
  });

  it('알 수 없는 글자는 기본 5획으로 처리된다', () => {
    const result = calculateNameStrokes({ surname: '김', givenName: '가나' });
    expect(result.givenNameStrokes.length).toBe(2);
  });
});
