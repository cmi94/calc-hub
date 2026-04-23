// 자동차세 계산기
// 지방세법 제127조 (과세표준 및 세율)
// 출처: 위택스 https://www.wetax.go.kr
//       지방세법 https://www.law.go.kr/법령/지방세법

export type CarType =
  | "passenger"    // 승용차 (비영업용)
  | "passenger-business" // 승용차 (영업용)
  | "van"          // 승합차 (비영업용)
  | "van-business" // 승합차 (영업용)
  | "truck"        // 화물차
  | "special";     // 특수차

export type CarTaxInput = {
  carType: CarType;
  displacement: number;  // 배기량 (cc), 전기차는 0
  vehicleAge: number;    // 차령 (년수, 1년차 = 1)
  isElectric?: boolean;  // 전기차 여부
};

export type CarTaxResult = {
  annualTax: number;         // 연간 자동차세
  educationTax: number;      // 지방교육세 (자동차세의 30%)
  totalTax: number;          // 자동차세 + 지방교육세
  baseRate: number;          // 기본 cc당 세액 (원/cc)
  baseTax: number;           // 차령 경감 전 세액
  reductionRate: number;     // 차령 경감율 (0~0.5)
  reductionAmount: number;   // 경감액
  firstHalf: number;         // 1기분 (1~6월분, 6월 납부)
  secondHalf: number;        // 2기분 (7~12월분, 12월 납부)
};

// 비영업용 승용차 cc당 세액 (지방세법 제127조 별표)
// 1000cc 이하: 80원/cc, 1600cc 이하: 140원/cc, 초과: 200원/cc
function getPassengerRate(cc: number): number {
  if (cc <= 1000) return 80;
  if (cc <= 1600) return 140;
  return 200;
}

// 영업용 승용차 (택시 등)
function getPassengerBusinessRate(cc: number): number {
  if (cc <= 1600) return 18;
  if (cc <= 2000) return 19;
  if (cc <= 2500) return 19;
  return 24;
}

// 비영업용 승합차 (인원수별 정액)
// 7인 이하: 65,000원, 11인 이하: 100,000원, 이상: 130,000원
// 여기서는 배기량 cc를 좌석수로 간주하지 않으므로 단순화
// 실제로는 좌석수 기준이지만 UI에서 선택하게 함
// → 단순화: 승합차는 배기량 무관 단일 세액 적용
function getVanTax(displacement: number): number {
  // 비영업용 승합차: 11인승 이하 100,000원, 초과 130,000원 (정액)
  // displacement를 좌석 정보 대용으로 사용 (0: 11인 이하, 1: 초과)
  return displacement <= 11 ? 100_000 : 130_000;
}

// 차령 경감율: 3년차부터 매년 5% 감, 최대 50%
// (지방세법 시행령 제125조)
export function getReductionRate(vehicleAge: number): number {
  if (vehicleAge <= 2) return 0;
  const years = vehicleAge - 2; // 3년차부터 카운트
  return Math.min(Math.round(years * 5) / 100, 0.50);
}

export function calculateCarTax(input: CarTaxInput): CarTaxResult {
  const { carType, displacement, vehicleAge, isElectric = false } = input;

  let baseTax: number;
  let baseRate: number = 0;

  if (isElectric) {
    // 전기차: 비영업용 승용차와 동일 방식으로 10만원 정액 (2026년 기준 지방세법 특례)
    // 출처: 지방세특례제한법 제67조의2
    baseTax = 100_000;
    baseRate = 0;
  } else if (carType === "passenger") {
    baseRate = getPassengerRate(displacement);
    baseTax = displacement * baseRate;
  } else if (carType === "passenger-business") {
    baseRate = getPassengerBusinessRate(displacement);
    baseTax = displacement * baseRate;
  } else if (carType === "van") {
    baseTax = getVanTax(displacement);
  } else if (carType === "van-business") {
    // 영업용 승합차: 25,000~40,000원 정액
    baseTax = displacement <= 11 ? 25_000 : 40_000;
  } else if (carType === "truck") {
    // 화물차: 6,600~28,500원 (적재량 기준, 여기서는 단순화)
    // 1ton 이하: 6,600원, 5ton 이하: 13,500원, 초과: 28,500원
    if (displacement <= 1) baseTax = 6_600;
    else if (displacement <= 5) baseTax = 13_500;
    else baseTax = 28_500;
  } else {
    // 특수차: 13,500원~
    baseTax = 13_500;
  }

  const reductionRate = getReductionRate(vehicleAge);
  const reductionAmount = Math.floor(baseTax * reductionRate);
  const annualTax = baseTax - reductionAmount;

  // 지방교육세: 자동차세의 30%
  const educationTax = Math.floor(annualTax * 0.3);
  const totalTax = annualTax + educationTax;

  const firstHalf = Math.round(totalTax / 2);
  const secondHalf = totalTax - firstHalf;

  return {
    annualTax,
    educationTax,
    totalTax,
    baseRate,
    baseTax,
    reductionRate,
    reductionAmount,
    firstHalf,
    secondHalf,
  };
}
