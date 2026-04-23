// 상속세 계산기
// 상속세 및 증여세법 제18조 (기초공제), 제19조 (배우자공제), 제20조 (인적공제)
// 제24조 (일괄공제), 제26조 (세율)
// 출처: 국세청 https://www.nts.go.kr
//       상속세및증여세법 https://www.law.go.kr/법령/상속세및증여세법

export type InheritanceTaxInput = {
  totalAssets: number;          // 상속 재산 총액 (원)
  debts: number;                // 채무·장례비용 등 공제 (원)
  hasSpouse: boolean;           // 배우자 상속 여부
  spouseInheritance: number;    // 배우자 실제 상속액 (0 = 없음)
  childrenCount: number;        // 자녀 수
  // 기타 인적공제 (미성년자, 장애인, 연로자 등 별도 입력 생략 — 간편 계산)
};

export type InheritanceTaxResult = {
  totalAssets: number;
  debts: number;
  netAssets: number;            // 순재산 (총재산 - 채무)
  basicDeduction: number;       // 기초공제 (2억)
  personalDeduction: number;    // 인적공제 합계
  spouseDeduction: number;      // 배우자공제
  lumpSumDeduction: number;     // 일괄공제 (5억)
  appliedDeduction: number;     // 실제 적용 공제 (일괄 vs 개별 중 큰 것)
  taxableBase: number;          // 과세표준
  taxRate: number;              // 적용 최고 세율
  calculatedTax: number;        // 산출세액
  discountCredit: number;       // 신고세액공제 (3%)
  totalTax: number;             // 납부세액
};

// 누진세율 (상속세및증여세법 제26조)
function calcProgressiveTax(taxableBase: number): { tax: number; rate: number } {
  if (taxableBase <= 100_000_000) return { tax: Math.floor(taxableBase * 0.10), rate: 0.10 };
  if (taxableBase <= 500_000_000) return { tax: Math.floor(10_000_000 + (taxableBase - 100_000_000) * 0.20), rate: 0.20 };
  if (taxableBase <= 1_000_000_000) return { tax: Math.floor(90_000_000 + (taxableBase - 500_000_000) * 0.30), rate: 0.30 };
  if (taxableBase <= 3_000_000_000) return { tax: Math.floor(240_000_000 + (taxableBase - 1_000_000_000) * 0.40), rate: 0.40 };
  return { tax: Math.floor(1_040_000_000 + (taxableBase - 3_000_000_000) * 0.50), rate: 0.50 };
}

export function calculateInheritanceTax(input: InheritanceTaxInput): InheritanceTaxResult {
  const {
    totalAssets,
    debts,
    hasSpouse,
    spouseInheritance,
    childrenCount,
  } = input;

  const netAssets = Math.max(0, totalAssets - debts);

  // 기초공제: 2억 (상속세및증여세법 제18조)
  const basicDeduction = 200_000_000;

  // 인적공제 (상속세및증여세법 제20조)
  // 자녀 1인당 5,000만원
  const childDeduction = childrenCount * 50_000_000;
  const personalDeduction = childDeduction;

  // 배우자공제 (상속세및증여세법 제19조)
  // 실제 상속액과 법정 한도(30억) 중 작은 값, 최소 5억 보장
  let spouseDeduction = 0;
  if (hasSpouse) {
    if (spouseInheritance > 0) {
      spouseDeduction = Math.min(spouseInheritance, 3_000_000_000);
    } else {
      // 배우자 상속액 미입력 시 최소 5억 보장
      spouseDeduction = 500_000_000;
    }
  }

  // 일괄공제: 5억 (기초공제 + 인적공제 합계가 5억 미만이면 일괄공제 5억 적용)
  const lumpSumDeduction = 500_000_000;
  const individualTotal = basicDeduction + personalDeduction;

  // 실제 적용: 일괄공제(5억) vs 개별공제 합계 중 큰 것
  const appliedDeduction = Math.max(lumpSumDeduction, individualTotal) + spouseDeduction;

  const taxableBase = Math.max(0, netAssets - appliedDeduction);

  const { tax: calculatedTax, rate: taxRate } = calcProgressiveTax(taxableBase);

  // 신고세액공제: 3% (법정 신고기한 내 신고 시)
  const discountCredit = Math.floor(calculatedTax * 0.03);
  const totalTax = Math.max(0, calculatedTax - discountCredit);

  return {
    totalAssets, debts, netAssets,
    basicDeduction, personalDeduction, spouseDeduction,
    lumpSumDeduction,
    appliedDeduction,
    taxableBase,
    taxRate,
    calculatedTax,
    discountCredit,
    totalTax,
  };
}
