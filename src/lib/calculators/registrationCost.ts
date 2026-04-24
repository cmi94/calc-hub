// 등기비용 계산기 (소유권이전 등기)
// 출처: 지방세법 제23조, 제28조
// https://www.law.go.kr/법령/지방세법

export type RegistrationCostInput = {
  propertyPrice: number; // 취득가액 (원)
  isOnline: boolean;     // 온라인 신청 여부
};

export type RegistrationCostResult = {
  propertyPrice: number;
  registrationTax: number;           // 등록면허세
  localEducationTax: number;         // 지방교육세
  nationalHousingBondAmount: number; // 국민주택채권 매입액
  bondDiscountCost: number;          // 채권 할인 부담금 (실부담)
  registrationFee: number;           // 등기신청 수수료
  total: number;                     // 합계 (채권 할인 부담금 기준)
  bondRate: number;                  // 적용 채권매입률 (소수, e.g. 0.021)
};

// 국민주택채권 매입률 (지방세법 시행령 기준)
function getBondRate(price: number): number {
  if (price <= 100_000_000) return 0.010;           // 1억 이하
  if (price <= 160_000_000) return 0.013;           // 1억 초과~1.6억
  if (price <= 260_000_000) return 0.019;           // 1.6억 초과~2.6억
  if (price <= 600_000_000) return 0.021;           // 2.6억 초과~6억
  return 0.030;                                      // 6억 초과
}

export function calculateRegistrationCost(input: RegistrationCostInput): RegistrationCostResult {
  const { propertyPrice, isOnline } = input;

  // 1. 등록면허세 = 취득가액 × 0.2%
  const registrationTax = Math.round(propertyPrice * 0.002);

  // 2. 지방교육세 = 등록면허세 × 20%
  const localEducationTax = Math.round(registrationTax * 0.2);

  // 3. 국민주택채권 매입액
  const bondRate = getBondRate(propertyPrice);
  const nationalHousingBondAmount = Math.round(propertyPrice * bondRate);

  // 4. 채권 할인 부담금 (즉시 매도 시 약 1.5% 손실)
  const bondDiscountCost = Math.round(nationalHousingBondAmount * 0.015);

  // 5. 등기신청 수수료 (방문: 15,000원, 온라인: 3,000원)
  const registrationFee = isOnline ? 3_000 : 15_000;

  // 합계: 등록면허세 + 지방교육세 + 채권 할인 부담금 + 수수료
  const total = registrationTax + localEducationTax + bondDiscountCost + registrationFee;

  return {
    propertyPrice,
    registrationTax,
    localEducationTax,
    nationalHousingBondAmount,
    bondDiscountCost,
    registrationFee,
    total,
    bondRate,
  };
}
