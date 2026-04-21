// 중고차 취득세 계산기
// 지방세법 제7조 (납세의무), 제11조 (세율)
// 출처: 행정안전부 https://www.mois.go.kr
//       지방세법 https://www.law.go.kr/법령/지방세법
//       지방세법 시행령 제18조 (과세표준)

export type VehicleType =
  | "passenger"      // 비영업용 승용차
  | "van"            // 승합차
  | "truck"          // 화물차
  | "electric";      // 전기차 (취득세 감면)

export type UsedCarTaxInput = {
  price: number;          // 차량 시가표준액 또는 실거래가 (원)
  vehicleType: VehicleType;
};

export type UsedCarTaxResult = {
  taxBase: number;          // 과세표준
  acquisitionTax: number;   // 취득세
  localEduTax: number;      // 지방교육세 (취득세의 20%)
  totalTax: number;         // 총 납부세액
  taxRate: number;          // 적용 취득세율
};

// 취득세율 (지방세법 제11조)
// 비영업용 승용차: 7% (단, 중고차는 실거래가 기준 적용)
// 승합·화물: 5%
// 전기차: 취득세 140만원 한도 감면 (지방세특례제한법 제66조)
const TAX_RATES: Record<VehicleType, number> = {
  passenger: 0.07,
  van: 0.05,
  truck: 0.05,
  electric: 0.07,
};

// 지방교육세: 취득세의 20% (지방세법 제151조)
const LOCAL_EDU_TAX_RATE = 0.2;

// 전기차 취득세 감면 한도 (지방세특례제한법 제66조, ~2024년 기준)
const ELECTRIC_TAX_DEDUCTION_LIMIT = 1_400_000;

export function calculateUsedCarTax(input: UsedCarTaxInput): UsedCarTaxResult {
  const { price, vehicleType } = input;
  const taxRate = TAX_RATES[vehicleType];

  const taxBase = price;
  let acquisitionTax = Math.floor(taxBase * taxRate);

  // 전기차 취득세 감면
  if (vehicleType === "electric") {
    acquisitionTax = Math.max(0, acquisitionTax - ELECTRIC_TAX_DEDUCTION_LIMIT);
  }

  const localEduTax = Math.floor(acquisitionTax * LOCAL_EDU_TAX_RATE);
  const totalTax = acquisitionTax + localEduTax;

  return { taxBase, acquisitionTax, localEduTax, totalTax, taxRate };
}
