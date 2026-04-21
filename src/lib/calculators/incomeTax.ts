// 종합소득세 간편 계산기 — 프리랜서·사업소득자 기준
// 소득세법 제14조 (과세표준), 제55조 (세율), 제70조 (확정신고)
// 출처: 국세청 https://www.nts.go.kr
//       소득세법 https://www.law.go.kr/법령/소득세법

export type ExpenseType =
  | "simple"   // 단순경비율 (소규모 사업자)
  | "standard" // 기준경비율 (일반 사업자)
  | "actual";  // 실제 경비 직접 입력

// 단순경비율: 업종별로 다르나 프리랜서(기타자영업) 기준 64.1% 적용
// 출처: 국세청 단순경비율 고시 (기준경비율고시, 업종코드 940909)
export const SIMPLE_EXPENSE_RATE = 0.641;

// 기준경비율: 프리랜서(기타자영업) 기준 15.7% 적용
// 출처: 국세청 기준경비율 고시 (업종코드 940909)
export const STANDARD_EXPENSE_RATE = 0.157;

export type IncomeTaxInput = {
  annualIncome: number;    // 연 소득 (원)
  expenseType: ExpenseType;
  actualExpense?: number;  // 실제 경비 (expenseType === 'actual' 일 때)
};

export type IncomeTaxResult = {
  annualIncome: number;
  expense: number;           // 필요경비
  businessIncome: number;    // 사업소득금액 (소득 - 경비)
  personalDeduction: number; // 기본공제 (본인 150만원)
  taxableIncome: number;     // 과세표준
  taxRate: number;           // 적용 세율
  calculatedTax: number;     // 산출세액
  localIncomeTax: number;    // 지방소득세 (산출세액 × 10%)
  totalTax: number;          // 총 세금 (소득세 + 지방소득세)
};

// 누진세율 (소득세법 제55조, 2026년 기준)
function calcProgressiveTax(taxableIncome: number): { tax: number; rate: number } {
  if (taxableIncome <= 14_000_000) return { tax: Math.floor(taxableIncome * 0.06), rate: 0.06 };
  if (taxableIncome <= 50_000_000) return { tax: Math.floor(840_000 + (taxableIncome - 14_000_000) * 0.15), rate: 0.15 };
  if (taxableIncome <= 88_000_000) return { tax: Math.floor(6_240_000 + (taxableIncome - 50_000_000) * 0.24), rate: 0.24 };
  if (taxableIncome <= 150_000_000) return { tax: Math.floor(15_360_000 + (taxableIncome - 88_000_000) * 0.35), rate: 0.35 };
  if (taxableIncome <= 300_000_000) return { tax: Math.floor(37_060_000 + (taxableIncome - 150_000_000) * 0.38), rate: 0.38 };
  if (taxableIncome <= 500_000_000) return { tax: Math.floor(94_060_000 + (taxableIncome - 300_000_000) * 0.40), rate: 0.40 };
  if (taxableIncome <= 1_000_000_000) return { tax: Math.floor(174_060_000 + (taxableIncome - 500_000_000) * 0.42), rate: 0.42 };
  return { tax: Math.floor(384_060_000 + (taxableIncome - 1_000_000_000) * 0.45), rate: 0.45 };
}

export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const { annualIncome, expenseType, actualExpense = 0 } = input;

  let expense: number;
  if (expenseType === "simple") {
    expense = Math.floor(annualIncome * SIMPLE_EXPENSE_RATE);
  } else if (expenseType === "standard") {
    expense = Math.floor(annualIncome * STANDARD_EXPENSE_RATE);
  } else {
    expense = Math.min(actualExpense, annualIncome);
  }

  const businessIncome = Math.max(0, annualIncome - expense);

  // 기본공제: 본인 150만원 (소득세법 제51조)
  const personalDeduction = 1_500_000;
  const taxableIncome = Math.max(0, businessIncome - personalDeduction);

  const { tax: calculatedTax, rate: taxRate } = calcProgressiveTax(taxableIncome);
  const localIncomeTax = Math.floor(calculatedTax * 0.1);
  const totalTax = calculatedTax + localIncomeTax;

  return {
    annualIncome,
    expense,
    businessIncome,
    personalDeduction,
    taxableIncome,
    taxRate,
    calculatedTax,
    localIncomeTax,
    totalTax,
  };
}
