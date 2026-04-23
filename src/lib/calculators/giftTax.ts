// 증여세 계산기
// 출처: 상속세 및 증여세법 제26조 (세율), 제53조 (증여재산공제)
//       https://www.law.go.kr/법령/상속세및증여세법

export type DonorRelation =
  | "spouse"         // 배우자
  | "lineal-ascend"  // 직계존속 (부모·조부모 등)
  | "lineal-descend" // 직계비속 (자녀·손자 등)
  | "other-relative" // 기타 친족 (형제자매, 6촌 이내 혈족 등)
  | "other";         // 타인

export type GiftTaxInput = {
  giftAmount: number;       // 증여금액 (원)
  relation: DonorRelation;
  isMinor: boolean;         // 미성년자 여부 (직계비속 공제 차등)
  priorGifts?: number;      // 10년 이내 동일인으로부터 이전 증여액 (합산 과세)
};

export type GiftTaxResult = {
  giftAmount: number;
  deduction: number;          // 증여재산공제
  taxableAmount: number;      // 과세표준
  taxBeforeCredit: number;    // 산출세액
  taxCredit: number;          // 신고세액공제 (3%)
  finalTax: number;           // 최종 납부 세액
  effectiveRate: number;      // 실효세율
};

/**
 * 증여재산공제 한도 (10년 합산)
 * 배우자: 6억, 직계존속: 5천만 (미성년자 자녀에게 주는 경우 동일)
 * 직계비속: 5천만, 미성년 직계비속: 2천만
 * 기타 친족: 1천만, 타인: 0
 */
function getDeduction(relation: DonorRelation, isMinor: boolean): number {
  switch (relation) {
    case "spouse":         return 600_000_000;
    case "lineal-ascend":  return 50_000_000;
    case "lineal-descend": return isMinor ? 20_000_000 : 50_000_000;
    case "other-relative": return 10_000_000;
    case "other":          return 0;
  }
}

/**
 * 증여세 누진세율 (상속세 및 증여세법 제26조)
 * 과세표준          세율   누진공제
 * ~1억              10%   0
 * ~5억              20%   1,000만
 * ~10억             30%   6,000만
 * ~30억             40%   1억6,000만
 * 30억 초과         50%   4억6,000만
 */
function calculateProgressiveTax(taxable: number): number {
  if (taxable <= 0) return 0;
  if (taxable <= 100_000_000)  return Math.floor(taxable * 0.10);
  if (taxable <= 500_000_000)  return Math.floor(taxable * 0.20 - 10_000_000);
  if (taxable <= 1_000_000_000) return Math.floor(taxable * 0.30 - 60_000_000);
  if (taxable <= 3_000_000_000) return Math.floor(taxable * 0.40 - 160_000_000);
  return Math.floor(taxable * 0.50 - 460_000_000);
}

export function calculateGiftTax(input: GiftTaxInput): GiftTaxResult {
  const { giftAmount, relation, isMinor, priorGifts = 0 } = input;

  const deductionLimit = getDeduction(relation, isMinor);

  // 10년 합산 기준 공제 적용
  const totalGifts = giftAmount + priorGifts;
  const usedDeduction = Math.min(priorGifts, deductionLimit);
  const remainingDeduction = Math.max(deductionLimit - usedDeduction, 0);
  const deduction = Math.min(giftAmount, remainingDeduction);

  const taxableAmount = Math.max(totalGifts - deductionLimit, 0);
  const priorTaxable = Math.max(priorGifts - deductionLimit, 0);
  const currentTaxable = taxableAmount - priorTaxable;

  // 합산 후 세액 - 이전 기납부세액 방식으로 계산
  const totalTax = calculateProgressiveTax(taxableAmount);
  const priorTax = calculateProgressiveTax(priorTaxable);
  const taxBeforeCredit = Math.max(totalTax - priorTax, 0);

  // 신고세액공제 3% (기한 내 신고 시)
  const taxCredit = Math.floor(taxBeforeCredit * 0.03);
  const finalTax = taxBeforeCredit - taxCredit;

  const effectiveRate = giftAmount > 0 ? finalTax / giftAmount : 0;

  return {
    giftAmount,
    deduction,
    taxableAmount: currentTaxable,
    taxBeforeCredit,
    taxCredit,
    finalTax,
    effectiveRate,
  };
}
