// 부동산 취득세 계산기 (주택)
// 출처: 지방세법 제11조 https://www.law.go.kr/법령/지방세법
//       지방세법 시행령 제28조의2 (6억~9억 구간 세율 산식)
//       위택스 https://www.wetax.go.kr

export type HouseCount = "1" | "2" | "3plus" | "corporate";

export type PropertyAcquisitionTaxInput = {
  propertyPrice: number;  // 취득가액 (원)
  houseCount: HouseCount; // 취득 후 주택수 (1주택/2주택/3주택이상/법인)
  isAdjusted: boolean;    // 조정대상지역 여부
  area: number;           // 전용면적 (㎡), 농어촌특별세 기준
};

export type PropertyAcquisitionTaxResult = {
  propertyPrice: number;
  taxRate: number;           // 취득세율 (소수)
  acquisitionTax: number;    // 취득세 (원)
  localEducationTax: number; // 지방교육세 = 취득세 × 10%
  ruralSpecialTax: number;   // 농어촌특별세 = 전용 85㎡ 초과 시 취득세 × 20%
  totalTax: number;          // 합계 (취득세 + 지방교육세 + 농어촌특별세)
};

/**
 * 주택 취득세율 산출
 * 지방세법 제11조 제1항 제8호
 *
 * 1주택 / 비조정 2주택:
 *   6억 이하      → 1%
 *   6억 초과~9억  → (취득가액 × 2 / 3억 - 3) / 100  (시행령 제28조의2)
 *   9억 초과      → 3%
 *
 * 조정대상지역 2주택 → 8%
 * 비조정 3주택 이상  → 8%
 * 조정대상지역 3주택 이상 / 법인 → 12%
 */
function getHousingTaxRate(
  price: number,
  houseCount: HouseCount,
  isAdjusted: boolean
): number {
  if (houseCount === "corporate") return 0.12;

  if (houseCount === "3plus") {
    return isAdjusted ? 0.12 : 0.08;
  }

  if (houseCount === "2" && isAdjusted) {
    return 0.08;
  }

  // 1주택 또는 비조정 2주택: 취득가액 기준 누진세율
  if (price <= 600_000_000) return 0.01;
  if (price <= 900_000_000) {
    // 지방세법 시행령 제28조의2: 세율(%) = 취득가액(억) × 2/3 - 3
    return (price * 2) / 300_000_000 / 100 - 0.03;
  }
  return 0.03;
}

export function calculatePropertyAcquisitionTax(
  input: PropertyAcquisitionTaxInput
): PropertyAcquisitionTaxResult {
  const { propertyPrice, houseCount, isAdjusted, area } = input;

  const taxRate = getHousingTaxRate(propertyPrice, houseCount, isAdjusted);
  const acquisitionTax = Math.floor(propertyPrice * taxRate);

  // 지방교육세: 취득세의 10% (지방세법 제151조)
  const localEducationTax = Math.floor(acquisitionTax * 0.1);

  // 농어촌특별세: 전용면적 85㎡ 초과 시 취득세의 20% (농어촌특별세법 제5조)
  const ruralSpecialTax = area > 85 ? Math.floor(acquisitionTax * 0.2) : 0;

  const totalTax = acquisitionTax + localEducationTax + ruralSpecialTax;

  return {
    propertyPrice,
    taxRate,
    acquisitionTax,
    localEducationTax,
    ruralSpecialTax,
    totalTax,
  };
}
