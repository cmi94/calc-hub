// 궁합 계산기 (이름 기반)
// 재미 목적 — 과학적 근거 없음
// 한글 자모 획수 기반 점수 계산 (재미용)
// 면책: 이 결과는 순수 오락 목적이며 실제 궁합과 무관합니다.

// 한글 자음 획수 (전통 성명학 기준 — 재미용)
const JAMO_STROKES: Record<string, number> = {
  ㄱ: 2, ㄴ: 2, ㄷ: 3, ㄹ: 5, ㅁ: 4, ㅂ: 4, ㅅ: 2, ㅇ: 1,
  ㅈ: 3, ㅊ: 4, ㅋ: 3, ㅌ: 4, ㅍ: 4, ㅎ: 3,
  ㄲ: 4, ㄸ: 6, ㅃ: 8, ㅆ: 4, ㅉ: 6,
};

// 한글 모음 획수
const VOWEL_STROKES: Record<string, number> = {
  ㅏ: 2, ㅐ: 3, ㅑ: 3, ㅒ: 4, ㅓ: 2, ㅔ: 3, ㅕ: 3, ㅖ: 4,
  ㅗ: 2, ㅘ: 4, ㅙ: 5, ㅚ: 3, ㅛ: 3, ㅜ: 2, ㅝ: 4, ㅞ: 5,
  ㅟ: 3, ㅠ: 3, ㅡ: 1, ㅢ: 2, ㅣ: 1,
};

// 한글 유니코드 분해
function decomposeHangul(char: string): { onset: string; nucleus: string; coda: string } | null {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return null;

  const ONSET = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const NUCLEUS = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
  const CODA = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

  const onsetIdx = Math.floor(code / (21 * 28));
  const nucleusIdx = Math.floor((code % (21 * 28)) / 28);
  const codaIdx = code % 28;

  return {
    onset: ONSET[onsetIdx],
    nucleus: NUCLEUS[nucleusIdx],
    coda: CODA[codaIdx],
  };
}

// 이름 획수 합산
function getNameStrokes(name: string): number {
  let total = 0;
  for (const char of name) {
    const decomposed = decomposeHangul(char);
    if (decomposed) {
      total += JAMO_STROKES[decomposed.onset] ?? 1;
      total += VOWEL_STROKES[decomposed.nucleus] ?? 1;
      if (decomposed.coda) total += JAMO_STROKES[decomposed.coda] ?? 1;
    } else {
      // 한글이 아닌 경우 기본 1획으로 처리
      total += 1;
    }
  }
  return total;
}

// 재미용 결정적 해시 (같은 이름 → 같은 결과)
function simpleHash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

const COMPATIBILITY_MESSAGES = [
  { min: 90, label: "천생연분", desc: "하늘이 맺어준 인연입니다. 두 분의 에너지가 완벽히 조화를 이룹니다." },
  { min: 80, label: "최고의 짝", desc: "서로를 이해하고 보완하는 환상의 조합입니다." },
  { min: 70, label: "잘 어울려요", desc: "좋은 파트너입니다. 함께할수록 더 빛나는 관계입니다." },
  { min: 60, label: "괜찮은 궁합", desc: "약간의 노력이 필요하지만 충분히 좋은 관계를 만들 수 있습니다." },
  { min: 50, label: "보통", desc: "서로의 차이를 이해하고 배려한다면 좋은 관계가 될 거예요." },
  { min: 40, label: "노력 필요", desc: "서로 다른 점이 많지만, 그것이 오히려 성장의 계기가 될 수 있습니다." },
  { min: 0,  label: "도전적 궁합", desc: "쉽지 않은 관계지만, 진심이 있다면 어떤 어려움도 극복할 수 있습니다." },
];

export type CompatibilityInput = {
  name1: string;
  name2: string;
};

export type CompatibilityResult = {
  name1: string;
  name2: string;
  score: number;         // 0~100
  label: string;
  description: string;
  strokes1: number;      // 이름1 획수 합계
  strokes2: number;      // 이름2 획수 합계
  lovePoints: number[];  // 애정 그래프용 포인트 (5개)
};

export function calculateCompatibility(input: CompatibilityInput): CompatibilityResult {
  const { name1, name2 } = input;

  const strokes1 = getNameStrokes(name1);
  const strokes2 = getNameStrokes(name2);

  // 결정적 점수 계산 (순서 무관: 두 이름을 정렬 후 해시)
  const combined = [name1, name2].sort().join("|");
  const hash = simpleHash(combined);
  const score = (hash % 61) + 40; // 40~100 범위

  const messageObj = COMPATIBILITY_MESSAGES.find((m) => score >= m.min)!;

  // 애정 그래프용 5개 포인트 (재미 요소)
  const lovePoints = Array.from({ length: 5 }, (_, i) => {
    const seed = simpleHash(combined + String(i));
    return (seed % 41) + 60; // 60~100
  });

  return {
    name1,
    name2,
    score,
    label: messageObj.label,
    description: messageObj.desc,
    strokes1,
    strokes2,
    lovePoints,
  };
}
