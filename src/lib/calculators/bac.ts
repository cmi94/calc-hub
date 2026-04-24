// 음주 측정 (BAC) 계산기 — Widmark 공식
// 출처: 도로교통법 제44조 (단속기준 0.03%)
// https://www.law.go.kr/법령/도로교통법

export type DrinkItem = {
  volumeMl: number;    // 용량 (mL)
  alcoholPct: number;  // 도수 (%, 예: 5)
  count: number;       // 잔 수
};

export type BacInput = {
  gender: "male" | "female";
  weightKg: number;       // 체중 (kg)
  drinks: DrinkItem[];    // 음료 목록
  hoursElapsed: number;   // 경과 시간 (h)
};

export type BacResult = {
  totalAlcoholGrams: number; // 총 알코올 섭취량 (g)
  peakBac: number;           // 최고 BAC (%)
  currentBac: number;        // 경과 후 현재 BAC (%)
  soberInHours: number;      // 완전 해소까지 남은 시간 (h, 소수점 1자리)
  isDrivingSafe: boolean;    // 단속기준(0.03%) 미만 여부
  isDrivingLegal: boolean;   // 면허취소(0.08%) 미만 여부
  warning: string;           // 상태 메시지
};

// 분배계수: 남성 0.7, 여성 0.6 (Widmark r 상수)
const DISTRIBUTION_FACTOR: Record<"male" | "female", number> = {
  male: 0.7,
  female: 0.6,
};

// 알코올 밀도 (g/mL)
const ALCOHOL_DENSITY = 0.789;

// 시간당 알코올 대사율 (BAC %/h)
const METABOLISM_RATE = 0.015;

function getWarning(bac: number): string {
  if (bac === 0) return "음주 없음 또는 완전 해소";
  if (bac < 0.03) return "단속기준 미만 (단, 개인차가 있으므로 운전 자제)";
  if (bac < 0.08) return "음주운전 단속 대상 (면허 정지)";
  return "면허취소 기준 초과";
}

export function calculateBac(input: BacInput): BacResult {
  const { gender, weightKg, drinks, hoursElapsed } = input;

  // 총 알코올 섭취량 (g)
  // 알코올량(g) = 용량(mL) × 도수(%) / 100 × 밀도(g/mL) × 잔수
  const totalAlcoholGrams = drinks.reduce((sum, drink) => {
    return sum + drink.volumeMl * (drink.alcoholPct / 100) * ALCOHOL_DENSITY * drink.count;
  }, 0);

  // 최고 BAC (%) = 알코올(g) / (체중(kg) × r × 10)
  // 공식 출처: Widmark formula — BAC(g/100mL) = 알코올(g) / (체중(kg) × r × 10)
  const r = DISTRIBUTION_FACTOR[gender];
  const peakBacPct = totalAlcoholGrams / (weightKg * r * 10);

  // 경과 후 현재 BAC
  const currentBacRaw = peakBacPct - METABOLISM_RATE * hoursElapsed;
  const currentBac = Math.max(0, Math.round(currentBacRaw * 1000) / 1000);
  const peakBacRounded = Math.round(peakBacPct * 1000) / 1000;

  // 완전 해소까지 남은 시간
  const soberInHoursRaw = currentBac > 0 ? currentBac / METABOLISM_RATE : 0;
  const soberInHours = Math.round(soberInHoursRaw * 10) / 10;

  const isDrivingSafe = currentBac < 0.03;
  const isDrivingLegal = currentBac < 0.08;
  const warning = getWarning(currentBac);

  return {
    totalAlcoholGrams: Math.round(totalAlcoholGrams * 10) / 10,
    peakBac: peakBacRounded,
    currentBac,
    soberInHours,
    isDrivingSafe,
    isDrivingLegal,
    warning,
  };
}
