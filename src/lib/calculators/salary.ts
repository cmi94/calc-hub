// 연봉 실수령액 계산기
// 2026년 기준 요율 적용
//
// 국민연금: https://www.nps.or.kr (기준소득월액 상한 617만원, 2025.7~)
// 건강보험: https://www.nhis.or.kr (직장가입자 보험료율 3.545%, 2024년 동결)
// 장기요양: https://www.nhis.or.kr (건강보험료의 12.95%, 2024년)
// 고용보험: https://www.moel.go.kr (근로자 부담 0.9%, 2023년~)
// 근로소득세: https://www.nts.go.kr (소득세법 별표2 간이세액표)

export type SalaryInput = {
  annualSalary: number;
  dependents: number; // 본인 포함 부양가족 수 (최소 1)
};

export type SalaryResult = {
  annualSalary: number;
  monthlySalary: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeduction: number;
  monthlyNetSalary: number;
  annualNetSalary: number;
};

// 국민연금: 4.5%, 기준소득월액 상한 6,170,000원 (2025.7~)
const NP_RATE = 0.045;
const NP_MONTHLY_CAP = 6_170_000;

// 건강보험: 3.545% (직장가입자 근로자 부담)
const HI_RATE = 0.03545;

// 장기요양보험: 건강보험료의 12.95%
const LTC_RATE = 0.1295;

// 고용보험: 0.9%
const EI_RATE = 0.009;

// 근로소득공제 계산 (소득세법 제47조)
function calcEmploymentDeduction(annualSalary: number): number {
  if (annualSalary <= 5_000_000) return annualSalary * 0.7;
  if (annualSalary <= 15_000_000) return 3_500_000 + (annualSalary - 5_000_000) * 0.4;
  if (annualSalary <= 45_000_000) return 7_500_000 + (annualSalary - 15_000_000) * 0.15;
  if (annualSalary <= 100_000_000) return 12_000_000 + (annualSalary - 45_000_000) * 0.05;
  return Math.min(14_750_000, 14_750_000); // 상한 14,750,000원
}

// 누진세율 적용 (소득세법 제55조)
function calcProgressiveTax(taxableIncome: number): number {
  if (taxableIncome <= 14_000_000) return taxableIncome * 0.06;
  if (taxableIncome <= 50_000_000) return 840_000 + (taxableIncome - 14_000_000) * 0.15;
  if (taxableIncome <= 88_000_000) return 6_240_000 + (taxableIncome - 50_000_000) * 0.24;
  if (taxableIncome <= 150_000_000) return 15_360_000 + (taxableIncome - 88_000_000) * 0.35;
  if (taxableIncome <= 300_000_000) return 37_060_000 + (taxableIncome - 150_000_000) * 0.38;
  if (taxableIncome <= 500_000_000) return 94_060_000 + (taxableIncome - 300_000_000) * 0.40;
  if (taxableIncome <= 1_000_000_000) return 174_060_000 + (taxableIncome - 500_000_000) * 0.42;
  return 384_060_000 + (taxableIncome - 1_000_000_000) * 0.45;
}

// 근로소득세액공제 (소득세법 제59조)
function calcEmploymentTaxCredit(calculatedTax: number, annualSalary: number): number {
  const credit = calculatedTax <= 1_300_000
    ? calculatedTax * 0.55
    : 715_000 + (calculatedTax - 1_300_000) * 0.3;

  let creditLimit: number;
  if (annualSalary <= 33_000_000) {
    creditLimit = 740_000;
  } else if (annualSalary <= 70_000_000) {
    creditLimit = Math.max(660_000, 740_000 - (annualSalary - 33_000_000) * (8 / 1000));
  } else {
    creditLimit = 500_000;
  }

  return Math.min(credit, creditLimit);
}

// 월 근로소득세 계산
function calcMonthlyIncomeTax(annualSalary: number, dependents: number): number {
  const employmentDeduction = calcEmploymentDeduction(annualSalary);
  const employmentIncome = annualSalary - employmentDeduction;

  // 인적공제: 본인 + 부양가족 각 150만원
  const personalDeduction = 1_500_000 * Math.max(1, dependents);

  // 4대보험 소득공제 (연간)
  const monthlyBase = annualSalary / 12;
  const npMonthly = Math.floor(Math.min(monthlyBase, NP_MONTHLY_CAP) * NP_RATE);
  const hiMonthly = Math.floor(monthlyBase * HI_RATE);
  const insuranceDeduction = (npMonthly + hiMonthly) * 12;

  const taxableIncome = Math.max(0, employmentIncome - personalDeduction - insuranceDeduction);
  const calculatedTax = calcProgressiveTax(taxableIncome);
  const taxCredit = calcEmploymentTaxCredit(calculatedTax, annualSalary);
  const annualTax = Math.max(0, calculatedTax - taxCredit);

  return Math.floor(annualTax / 12);
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { annualSalary, dependents } = input;
  const monthlySalary = Math.floor(annualSalary / 12);

  // 국민연금 (월 기준소득월액 상한 적용)
  const nationalPension = Math.floor(Math.min(monthlySalary, NP_MONTHLY_CAP) * NP_RATE);

  // 건강보험
  const healthInsurance = Math.floor(monthlySalary * HI_RATE);

  // 장기요양보험
  const longTermCare = Math.floor(healthInsurance * LTC_RATE);

  // 고용보험
  const employmentInsurance = Math.floor(monthlySalary * EI_RATE);

  // 근로소득세
  const incomeTax = calcMonthlyIncomeTax(annualSalary, dependents);

  // 지방소득세: 근로소득세의 10%
  const localIncomeTax = Math.floor(incomeTax * 0.1);

  const totalDeduction =
    nationalPension + healthInsurance + longTermCare +
    employmentInsurance + incomeTax + localIncomeTax;

  const monthlyNetSalary = monthlySalary - totalDeduction;
  const annualNetSalary = monthlyNetSalary * 12;

  return {
    annualSalary,
    monthlySalary,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeduction,
    monthlyNetSalary,
    annualNetSalary,
  };
}
