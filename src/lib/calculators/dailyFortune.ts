// 오늘의 한마디 (재미용)
// 생년월일 + 오늘 날짜 기반 결정론적 생성 (같은 날은 같은 결과)
// 주의: 이 계산기는 오락 목적이며 실제 운세와 무관합니다.

export type DailyFortuneInput = {
  birthDate: string;      // "YYYY-MM-DD"
  referenceDate?: string; // 기준일, 미입력 시 오늘
};

export type DailyFortuneResult = {
  referenceDate: string;
  luckyScore: number;       // 1~100
  message: string;          // 응원 메시지
  luckyNumbers: number[];   // 행운의 숫자 3개 (1~45)
  luckyColor: string;       // 행운의 색
  luckyColorHex: string;    // 색상 코드
};

const MESSAGES = [
  "오늘은 새로운 기회가 찾아올 것 같은 하루입니다. 작은 도전도 좋습니다.",
  "꾸준한 노력이 빛을 발하는 날입니다. 지금 하는 일을 믿어보세요.",
  "주변 사람과의 소통이 좋은 결과를 가져옵니다. 먼저 연락해보는 건 어떨까요?",
  "오늘은 계획을 세우기 좋은 날입니다. 차분하게 정리해보세요.",
  "의외의 곳에서 좋은 소식이 올 수 있습니다. 열린 마음을 유지하세요.",
  "잠시 쉬어가는 것도 앞으로 나아가는 방법입니다. 오늘은 여유를 가져보세요.",
  "작은 것에 감사하는 마음이 큰 행복을 불러옵니다.",
  "오늘의 선택이 내일을 만듭니다. 신중하되 과감하게!",
  "집중력이 높아지는 날입니다. 중요한 일을 마무리하기 좋습니다.",
  "긍정적인 에너지가 넘치는 하루입니다. 웃음을 잊지 마세요.",
  "인내심을 갖고 기다리면 좋은 결과가 옵니다. 조급해하지 마세요.",
  "창의적인 아이디어가 떠오르기 좋은 날입니다. 메모해두세요.",
  "건강을 챙기는 것이 최고의 투자입니다. 오늘은 몸을 좀 움직여보세요.",
  "신뢰가 쌓이는 날입니다. 약속을 잘 지키면 좋은 인연이 됩니다.",
  "오늘 배운 것이 미래의 자산이 됩니다. 배움에 투자하세요.",
];

const COLORS: { name: string; hex: string }[] = [
  { name: "파란색", hex: "#3B82F6" },
  { name: "초록색", hex: "#10B981" },
  { name: "노란색", hex: "#F59E0B" },
  { name: "보라색", hex: "#8B5CF6" },
  { name: "빨간색", hex: "#EF4444" },
  { name: "하늘색", hex: "#06B6D4" },
  { name: "분홍색", hex: "#EC4899" },
  { name: "주황색", hex: "#F97316" },
];

/** 단순 해시 (결정론적 난수 seed) */
function simpleHash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
  }
  return Math.abs(h >>> 0);
}

/** seed 기반 의사 난수 0 이상 1 미만 */
function seededRand(seed: number, index: number): number {
  const n = simpleHash(`${seed}-${index}`);
  return (n % 100_000) / 100_000;
}

export function calculateDailyFortune(input: DailyFortuneInput): DailyFortuneResult {
  const { birthDate } = input;

  const today = input.referenceDate
    ? new Date(input.referenceDate)
    : new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  const referenceDate = `${y}-${m}-${d}`;

  const seed = simpleHash(`${birthDate}|${referenceDate}`);

  const luckyScore = (seed % 80) + 20; // 20~99 범위로 너무 낮은 점수 방지

  const msgIndex = Math.floor(seededRand(seed, 1) * MESSAGES.length);
  const message = MESSAGES[msgIndex];

  // 행운의 숫자 3개 (1~45, 중복 없음)
  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  const luckyNumbers: number[] = [];
  let remaining = [...pool];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(seededRand(seed, 10 + i) * remaining.length);
    luckyNumbers.push(remaining[idx]);
    remaining.splice(idx, 1);
  }
  luckyNumbers.sort((a, b) => a - b);

  const colorIndex = Math.floor(seededRand(seed, 20) * COLORS.length);
  const { name: luckyColor, hex: luckyColorHex } = COLORS[colorIndex];

  return { referenceDate, luckyScore, message, luckyNumbers, luckyColor, luckyColorHex };
}
