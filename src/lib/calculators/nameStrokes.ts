// src/lib/calculators/nameStrokes.ts
// 이름 획수 풀이 (CALC-38) + 작명 점수 (CALC-48)

import { SURNAME_STROKES, CHAR_STROKES, SURI_TABLE, type SuriMeaning } from '@/lib/data/strokeTable';

export type NameStrokesInput = {
  surname: string;
  givenName: string;
};

export type StrokeDetail = {
  char: string;
  strokes: number;
};

export type NameStrokesResult = {
  surnameStrokes: StrokeDetail[];
  givenNameStrokes: StrokeDetail[];
  totalStrokes: number;
  surnameTotal: number;
  givenNameTotal: number;
  wonGyeok: number;
  hyeongGyeok: number;
  iGyeok: number;
  jeongGyeok: number;
  wonSuri: { number: number; type: string; meaning: string };
  hyeongSuri: { number: number; type: string; meaning: string };
  iSuri: { number: number; type: string; meaning: string };
  jeongSuri: { number: number; type: string; meaning: string };
  overallRating: '대길' | '길' | '평' | '흉' | '대흉';
};

const DEFAULT_STROKES = 5;

function getCharStrokes(char: string): number {
  // 성씨 테이블 먼저 확인
  if (SURNAME_STROKES[char] !== undefined) return SURNAME_STROKES[char];
  // 일반 획수 테이블 확인
  if (CHAR_STROKES[char] !== undefined) return CHAR_STROKES[char];
  return DEFAULT_STROKES;
}

function getSuriMeaning(num: number): { number: number; type: string; meaning: string } {
  // 81수리로 변환 (1~81)
  let n = num;
  while (n > 81) n -= 81;
  if (n === 0) n = 81;

  const suri = SURI_TABLE.find((s) => s.number === n);
  if (suri) {
    return { number: suri.number, type: suri.type, meaning: suri.meaning };
  }
  return { number: n, type: '평', meaning: '보통의 운세입니다.' };
}

function getOverallRating(
  won: SuriMeaning['type'],
  hyeong: SuriMeaning['type'],
  i: SuriMeaning['type'],
  jeong: SuriMeaning['type'],
): NameStrokesResult['overallRating'] {
  const ratings = [won, hyeong, i, jeong];
  const score = ratings.reduce((acc, r) => {
    if (r === '대길') return acc + 2;
    if (r === '길')   return acc + 1;
    if (r === '평')   return acc + 0;
    if (r === '흉')   return acc - 1;
    if (r === '대흉') return acc - 2;
    return acc;
  }, 0);

  if (score >= 5)  return '대길';
  if (score >= 2)  return '길';
  if (score >= -1) return '평';
  if (score >= -4) return '흉';
  return '대흉';
}

export function calculateNameStrokes(input: NameStrokesInput): NameStrokesResult {
  const surnameChars = input.surname.split('');
  const givenNameChars = input.givenName.split('');

  const surnameStrokes: StrokeDetail[] = surnameChars.map((char) => ({
    char,
    strokes: getCharStrokes(char),
  }));

  const givenNameStrokes: StrokeDetail[] = givenNameChars.map((char) => ({
    char,
    strokes: getCharStrokes(char),
  }));

  const surnameTotal = surnameStrokes.reduce((sum, d) => sum + d.strokes, 0);
  const givenNameTotal = givenNameStrokes.reduce((sum, d) => sum + d.strokes, 0);
  const totalStrokes = surnameTotal + givenNameTotal;

  // 4격 계산
  // 원격: 성씨 획수 합
  const wonGyeok = surnameTotal;

  // 형격: 성씨 + 이름 첫 글자 획수
  const firstGivenChar = givenNameStrokes[0]?.strokes ?? 0;
  const hyeongGyeok = surnameTotal + firstGivenChar;

  // 이격: 이름 전체 획수
  const iGyeok = givenNameTotal;

  // 정격: 성 + 이름 전체
  const jeongGyeok = totalStrokes;

  const wonSuri = getSuriMeaning(wonGyeok);
  const hyeongSuri = getSuriMeaning(hyeongGyeok);
  const iSuri = getSuriMeaning(iGyeok);
  const jeongSuri = getSuriMeaning(jeongGyeok);

  const overallRating = getOverallRating(
    wonSuri.type as SuriMeaning['type'],
    hyeongSuri.type as SuriMeaning['type'],
    iSuri.type as SuriMeaning['type'],
    jeongSuri.type as SuriMeaning['type'],
  );

  return {
    surnameStrokes,
    givenNameStrokes,
    totalStrokes,
    surnameTotal,
    givenNameTotal,
    wonGyeok,
    hyeongGyeok,
    iGyeok,
    jeongGyeok,
    wonSuri,
    hyeongSuri,
    iSuri,
    jeongSuri,
    overallRating,
  };
}

// CALC-48 작명 점수 계산기 (같은 로직, 다른 이름으로 export)
export function calculateNamingScore(input: NameStrokesInput): NameStrokesResult {
  return calculateNameStrokes(input);
}
