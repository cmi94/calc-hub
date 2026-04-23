// 전기요금 계산기 (가정용 저압, 누진제)
// 출처: 한국전력공사 https://home.kepco.co.kr/kepco/FE/F/htmlView/FEFEHOM00301.do
// 전기요금표 기준: 2024년 기준 (한전 요금표 조회 기준)
// 주택용 저압 전력 (가정용)

// 2024년 한전 주택용 저압 전력 요금 기준
// 기본요금: 200kWh 이하 910원, 201~400kWh 1,600원, 400kWh 초과 7,300원
// 전력량요금: 200kWh 이하 120.0원/kWh, 201~400kWh 214.6원/kWh, 400kWh 초과 307.3원/kWh
// 부가가치세: 10%
// 전력산업기반기금: 3.7%
// TV수신료: 2,500원 (선택적, 계산기에서는 별도 표시)
// 출처: https://home.kepco.co.kr/kepco/FE/F/htmlView/FEFEHOM00301.do

export type ElectricityInput = {
  monthlyKwh: number;    // 월 사용량 (kWh)
  includesTvFee?: boolean; // TV 수신료 포함 여부 (기본 false)
};

export type ElectricityResult = {
  monthlyKwh: number;
  basicCharge: number;         // 기본요금
  usageCharge: number;         // 전력량요금
  subtotal: number;            // 소계 (기본 + 전력량)
  vat: number;                 // 부가가치세 (10%)
  powerFundLevy: number;       // 전력산업기반기금 (3.7%)
  tvFee: number;               // TV 수신료
  totalBill: number;           // 최종 청구액
  tier: 1 | 2 | 3;            // 적용 구간
  avgUnitPrice: number;        // 평균 단가 (원/kWh)
};

// 기본요금 (원)
function getBasicCharge(kwh: number): number {
  if (kwh <= 200) return 910;
  if (kwh <= 400) return 1_600;
  return 7_300;
}

// 전력량요금 (원) - 누진 구간 합산
function getUsageCharge(kwh: number): number {
  if (kwh <= 200) {
    return Math.floor(kwh * 120.0);
  } else if (kwh <= 400) {
    return Math.floor(200 * 120.0 + (kwh - 200) * 214.6);
  } else {
    return Math.floor(200 * 120.0 + 200 * 214.6 + (kwh - 400) * 307.3);
  }
}

function getTier(kwh: number): 1 | 2 | 3 {
  if (kwh <= 200) return 1;
  if (kwh <= 400) return 2;
  return 3;
}

export function calculateElectricityBill(input: ElectricityInput): ElectricityResult {
  const { monthlyKwh, includesTvFee = false } = input;

  const basicCharge = getBasicCharge(monthlyKwh);
  const usageCharge = getUsageCharge(monthlyKwh);
  const subtotal = basicCharge + usageCharge;

  const vat = Math.floor(subtotal * 0.1);
  const powerFundLevy = Math.floor(subtotal * 0.037);
  const tvFee = includesTvFee ? 2_500 : 0;

  const totalBill = subtotal + vat + powerFundLevy + tvFee;
  const tier = getTier(monthlyKwh);
  const avgUnitPrice = monthlyKwh > 0 ? Math.round(totalBill / monthlyKwh) : 0;

  return {
    monthlyKwh,
    basicCharge,
    usageCharge,
    subtotal,
    vat,
    powerFundLevy,
    tvFee,
    totalBill,
    tier,
    avgUnitPrice,
  };
}
