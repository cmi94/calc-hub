// src/lib/utils/hangul.ts
// 한글 유틸리티

// 한글 유니코드 범위
const HANGUL_START = 0xac00; // '가'
const HANGUL_END = 0xd7a3;   // '힣'

// 초성 배열 (19개)
const CHO_SUNG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
  'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

// 중성 배열 (21개)
const JUNG_SUNG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ',
  'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
];

// 종성 배열 (28개, 첫 번째는 받침 없음)
const JONG_SUNG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ',
  'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ',
  'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

const CHO_COUNT = CHO_SUNG.length;   // 19
const JUNG_COUNT = JUNG_SUNG.length; // 21
const JONG_COUNT = JONG_SUNG.length; // 28

/**
 * 한글 문자를 초성·중성·종성으로 분해
 * 한글이 아닌 문자는 null 반환
 * @example decomposeHangul('한') → { cho: 'ㅎ', jung: 'ㅏ', jong: 'ㄴ' }
 * @example decomposeHangul('A') → null
 */
export function decomposeHangul(
  char: string,
): { cho: string; jung: string; jong: string } | null {
  const code = char.charCodeAt(0);
  if (code < HANGUL_START || code > HANGUL_END) return null;

  const offset = code - HANGUL_START;
  const jongIndex = offset % JONG_COUNT;
  const jungIndex = Math.floor(offset / JONG_COUNT) % JUNG_COUNT;
  const choIndex = Math.floor(offset / (JONG_COUNT * JUNG_COUNT));

  return {
    cho: CHO_SUNG[choIndex],
    jung: JUNG_SUNG[jungIndex],
    jong: JONG_SUNG[jongIndex],
  };
}

/**
 * 문자열에서 한글 초성만 추출
 * 한글이 아닌 문자는 그대로 유지
 * @example getInitials('연봉 실수령액') → 'ㅇㅂ ㅅㅅㄹㅇ'
 */
export function getInitials(str: string): string {
  return str
    .split('')
    .map((char) => {
      const decomposed = decomposeHangul(char);
      return decomposed ? decomposed.cho : char;
    })
    .join('');
}

/**
 * 텍스트가 쿼리와 매칭되는지 확인
 * - 쿼리가 텍스트의 부분 문자열인 경우 true
 * - 쿼리가 텍스트 초성 패턴과 매칭되는 경우 true
 * @example matchesInitials('연봉 실수령액', 'ㅇㅂ') → true
 * @example matchesInitials('연봉 실수령액', '연봉') → true
 * @example matchesInitials('연봉 실수령액', 'BMI') → false
 */
export function matchesInitials(text: string, query: string): boolean {
  if (!query) return true;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // 1. 직접 부분 문자열 매칭
  if (lowerText.includes(lowerQuery)) return true;

  // 2. 초성 패턴 매칭 — 쿼리가 순수 초성 자모로만 구성된 경우
  const isInitialsQuery = [...query].every((ch) => {
    return CHO_SUNG.includes(ch) || ch === ' ';
  });

  if (isInitialsQuery) {
    const textInitials = getInitials(text);
    return textInitials.includes(query);
  }

  return false;
}
