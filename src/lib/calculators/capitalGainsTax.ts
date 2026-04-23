// 양도소득세 계산기 (주택)
// 소득세법 제94조 (양도소득의 범위), 제95조 (양도차익), 제96조 (취득가액)
// 제104조 (세율), 제95조의2 (장기보유특별공제)
// 출처: 국세청 https://www.nts.go.kr
//       소득세법 https://www.law.go.kr/법령/소득세법

export type HouseCount =
  | "one"       // 1주택
  | "two"       // 2주택
  | "three";    // 3주택 이상

export type CapitalGainsTaxInput = {
  transferPrice: number;      // 양도가액 (원)
  acquisitionPrice: number;   // 취득가액 (원)
  necessaryExpenses: number;  // 필요경비 (등기비용, 중개수수료 등)
  holdingYears: number;       // 보유기간 (년)
  residenceYears: number;     // 거주기간 (년, 1세대 1주택 비과세 및 공제 적용 시)
  houseCount: HouseCount;     // 보유 주택수
  isAdjustedArea: boolean;    // 조정대상지역 여부
};

export type CapitalGainsTaxResult = {
  transferPrice: number;
  acquisitionPrice: number;
  necessaryExpenses: number;
  capitalGain: number;              // 양도차익 (양도가 - 취득가 - 경비)
  longTermDeduction: number;        // 장기보유특별공제액
  longTermDeductionRate: number;    // 장기보유특별공제율
  basicDeduction: number;           // 기본공제 (250만원)
  taxableIncome: number;            // 과세표준
  taxRate: number;                  // 적용 세율
  calculatedTax: number;            // 산출세액
  localIncomeTax: number;           // 지방소득세 (10%)
  totalTax: number;                 // 총 세액
  isExempt: boolean;                // 1세대 1주택 비과세 여부
  exemptReason?: string;            // 비과세 사유
  warning?: string;                 // 주의 메시지
};

// 장기보유특별공제율 (소득세법 제95조)
// 1주택: 보유+거주기간 합산 (보유 연 4%, 거주 연 4%, 최대 80%)
// 다주택자(비과세 아닌 경우): 보유기간만 (연 2%, 최대 30%)
function getLongTermDeductionRate(
  holdingYears: number,
  residenceYears: number,
  houseCount: HouseCount,
  isExempt: boolean,
): number {
  if (holdingYears < 3) return 0;

  if (houseCount === "one" || isExempt) {
    // 1주택: 보유기간 연 4% + 거주기간 연 4%
    const holdingRate = Math.min(holdingYears, 10) * 0.04; // 최대 40%
    const residenceRate = Math.min(residenceYears, 10) * 0.04; // 최대 40%
    return Math.min(holdingRate + residenceRate, 0.80);
  } else {
    // 다주택자 조정지역: 공제 없음
    return 0;
  }
}

// 양도소득세 누진세율 (소득세법 제104조)
// 단기 보유(1년 미만): 70%, 1~2년: 60%, 2년 이상 일반세율
// 다주택자 조정지역 중과: 2주택 +20%p, 3주택 +30%p
function getTaxRate(
  taxableIncome: number,
  holdingYears: number,
  houseCount: HouseCount,
  isAdjustedArea: boolean,
): number {
  // 단기 양도
  if (holdingYears < 1) return 0.70;
  if (holdingYears < 2) return 0.60;

  // 일반 누진세율
  let baseRate: number;
  if (taxableIncome <= 14_000_000) baseRate = 0.06;
  else if (taxableIncome <= 50_000_000) baseRate = 0.15;
  else if (taxableIncome <= 88_000_000) baseRate = 0.24;
  else if (taxableIncome <= 150_000_000) baseRate = 0.35;
  else if (taxableIncome <= 300_000_000) baseRate = 0.38;
  else if (taxableIncome <= 500_000_000) baseRate = 0.40;
  else if (taxableIncome <= 1_000_000_000) baseRate = 0.42;
  else baseRate = 0.45;

  // 다주택자 조정지역 중과세율
  if (isAdjustedArea && houseCount === "two") {
    baseRate = Math.min(baseRate + 0.20, 0.75);
  } else if (isAdjustedArea && houseCount === "three") {
    baseRate = Math.min(baseRate + 0.30, 0.75);
  }

  return baseRate;
}

// 누진세율 기반 세액 계산
function calcProgressiveTax(taxableIncome: number, rate: number, holdingYears: number, houseCount: HouseCount, isAdjustedArea: boolean): number {
  // 단기 또는 중과세율 적용 시 단일세율
  if (holdingYears < 1 || holdingYears < 2) {
    return Math.floor(taxableIncome * rate);
  }
  if (isAdjustedArea && (houseCount === "two" || houseCount === "three")) {
    return Math.floor(taxableIncome * rate);
  }

  // 일반 누진세율 계산
  if (taxableIncome <= 14_000_000) return Math.floor(taxableIncome * 0.06);
  if (taxableIncome <= 50_000_000) return Math.floor(840_000 + (taxableIncome - 14_000_000) * 0.15);
  if (taxableIncome <= 88_000_000) return Math.floor(6_240_000 + (taxableIncome - 50_000_000) * 0.24);
  if (taxableIncome <= 150_000_000) return Math.floor(15_360_000 + (taxableIncome - 88_000_000) * 0.35);
  if (taxableIncome <= 300_000_000) return Math.floor(37_060_000 + (taxableIncome - 150_000_000) * 0.38);
  if (taxableIncome <= 500_000_000) return Math.floor(94_060_000 + (taxableIncome - 300_000_000) * 0.40);
  if (taxableIncome <= 1_000_000_000) return Math.floor(174_060_000 + (taxableIncome - 500_000_000) * 0.42);
  return Math.floor(384_060_000 + (taxableIncome - 1_000_000_000) * 0.45);
}

export function calculateCapitalGainsTax(input: CapitalGainsTaxInput): CapitalGainsTaxResult {
  const {
    transferPrice,
    acquisitionPrice,
    necessaryExpenses,
    holdingYears,
    residenceYears,
    houseCount,
    isAdjustedArea,
  } = input;

  const capitalGain = Math.max(0, transferPrice - acquisitionPrice - necessaryExpenses);

  // 1세대 1주택 비과세 판정 (소득세법 제89조)
  // 2년 이상 보유 + (조정지역은 2년 이상 거주) + 12억 이하 (2021.12.8 이후 12억 기준)
  let isExempt = false;
  let exemptReason: string | undefined;
  let warning: string | undefined;

  if (houseCount === "one") {
    const meetsHoldingReq = holdingYears >= 2;
    const meetsResidenceReq = !isAdjustedArea || residenceYears >= 2;
    const withinPriceLimit = transferPrice <= 1_200_000_000;

    if (meetsHoldingReq && meetsResidenceReq && withinPriceLimit) {
      isExempt = true;
      exemptReason = "1세대 1주택 비과세 (보유 2년+, 12억 이하)";
    } else if (meetsHoldingReq && meetsResidenceReq && !withinPriceLimit) {
      // 12억 초과분만 과세 (고가주택)
      warning = "12억 초과 고가주택 — 12억 초과분에 대해서만 과세됩니다.";
      const taxableRatio = (transferPrice - 1_200_000_000) / transferPrice;
      // 과세 대상 양도차익 = 전체 양도차익 × (양도가액 - 12억) / 양도가액
      const taxableCapitalGain = Math.floor(capitalGain * taxableRatio);

      const longTermRate = getLongTermDeductionRate(holdingYears, residenceYears, houseCount, true);
      const longTermDeduction = Math.floor(taxableCapitalGain * longTermRate);
      const basicDeduction = 2_500_000;
      const taxableIncome = Math.max(0, taxableCapitalGain - longTermDeduction - basicDeduction);
      const taxRate = getTaxRate(taxableIncome, holdingYears, houseCount, isAdjustedArea);
      const calculatedTax = calcProgressiveTax(taxableIncome, taxRate, holdingYears, houseCount, isAdjustedArea);
      const localIncomeTax = Math.floor(calculatedTax * 0.1);

      return {
        transferPrice, acquisitionPrice, necessaryExpenses,
        capitalGain: taxableCapitalGain,
        longTermDeduction, longTermDeductionRate: longTermRate,
        basicDeduction, taxableIncome, taxRate,
        calculatedTax, localIncomeTax, totalTax: calculatedTax + localIncomeTax,
        isExempt: false, warning,
      };
    }
  }

  if (isExempt) {
    return {
      transferPrice, acquisitionPrice, necessaryExpenses,
      capitalGain, longTermDeduction: 0, longTermDeductionRate: 0,
      basicDeduction: 0, taxableIncome: 0, taxRate: 0,
      calculatedTax: 0, localIncomeTax: 0, totalTax: 0,
      isExempt, exemptReason,
    };
  }

  const longTermDeductionRate = getLongTermDeductionRate(holdingYears, residenceYears, houseCount, isExempt);
  const longTermDeduction = Math.floor(capitalGain * longTermDeductionRate);
  const basicDeduction = 2_500_000; // 연 250만원 기본공제
  const taxableIncome = Math.max(0, capitalGain - longTermDeduction - basicDeduction);
  const taxRate = getTaxRate(taxableIncome, holdingYears, houseCount, isAdjustedArea);
  const calculatedTax = calcProgressiveTax(taxableIncome, taxRate, holdingYears, houseCount, isAdjustedArea);
  const localIncomeTax = Math.floor(calculatedTax * 0.1);
  const totalTax = calculatedTax + localIncomeTax;

  if (isAdjustedArea && houseCount !== "one") {
    warning = "조정대상지역 다주택자 중과세율 적용. 2026년 현재 중과세율 한시 배제 여부를 국세청에서 확인하세요.";
  }

  return {
    transferPrice, acquisitionPrice, necessaryExpenses,
    capitalGain, longTermDeduction, longTermDeductionRate,
    basicDeduction, taxableIncome, taxRate,
    calculatedTax, localIncomeTax, totalTax,
    isExempt, warning,
  };
}
