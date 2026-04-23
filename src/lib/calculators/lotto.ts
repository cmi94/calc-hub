// 로또 번호 생성기
// 1~45에서 6개 번호를 랜덤 추출, 오름차순 정렬

export type LottoInput = {
  setCount: number;          // 게임 수 (1~10)
  fixedNumbers?: number[];   // 고정 번호 (0~5개, 1~45)
  excludeNumbers?: number[]; // 제외 번호
};

export type LottoSet = {
  numbers: number[]; // 6개, 오름차순
};

export type LottoResult = {
  sets: LottoSet[];
};

/** 번호 공 색상 (로또 공식 색상) */
export function getBallColor(n: number): string {
  if (n <= 10) return "#FFC107"; // 노랑
  if (n <= 20) return "#2196F3"; // 파랑
  if (n <= 30) return "#F44336"; // 빨강
  if (n <= 40) return "#9E9E9E"; // 회색
  return "#4CAF50";              // 초록
}

export function getBallTextColor(n: number): string {
  if (n >= 31 && n <= 40) return "#fff"; // 회색 배경에 흰 글자
  return "#fff";
}

function generateSet(
  fixedNumbers: number[],
  excludeNumbers: number[]
): LottoSet {
  // 풀: 1~45에서 제외 번호 제거
  const pool = Array.from({ length: 45 }, (_, i) => i + 1).filter(
    (n) => !excludeNumbers.includes(n) && !fixedNumbers.includes(n)
  );

  // 고정 번호 유효성 (풀에 없는 고정 번호 제거)
  const validFixed = fixedNumbers.filter((n) => n >= 1 && n <= 45 && !excludeNumbers.includes(n));

  const need = 6 - validFixed.length;
  if (need < 0 || pool.length < need) {
    // 풀이 부족한 경우 가능한 만큼만 추출
    return { numbers: [...validFixed, ...pool.slice(0, Math.max(0, 6 - validFixed.length))].sort((a, b) => a - b) };
  }

  // Fisher-Yates shuffle로 need개 추출
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > shuffled.length - 1 - need; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const picked = shuffled.slice(shuffled.length - need);

  return {
    numbers: [...validFixed, ...picked].sort((a, b) => a - b),
  };
}

export function generateLotto(input: LottoInput): LottoResult {
  const {
    setCount,
    fixedNumbers = [],
    excludeNumbers = [],
  } = input;

  const count = Math.max(1, Math.min(10, setCount));

  const sets: LottoSet[] = Array.from({ length: count }, () =>
    generateSet(fixedNumbers, excludeNumbers)
  );

  return { sets };
}
