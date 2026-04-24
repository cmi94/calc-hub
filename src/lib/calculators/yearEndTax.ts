// 연말정산 환급액 간편 계산기
// 소득세법 제47조 (근로소득공제), 제50조 (기본공제), 제55조 (세율), 제59조의4 (세액공제)
// 출처: 국세청 https://www.nts.go.kr
//       소득세법 https://www.law.go.kr/법령/소득세법

// ========== 근로소득공제 (소득세법 제47조) ==========
// 500만 이하: 70% | 1500만 이하: 350만 + 500만 초과분 × 40%
// 4500만 이하: 750만 + 1500만 초과분 × 15%
// 1억 이하: 1200만 + 4500만 초과분 × 5%
// 초과: 1475만 (상한 2000만)
export function calcEmploymentIncomDeduction(totalSalary: number): number {
  let deduction: number;
  if (totalSalary <= 5_000_000) {
    deduction = totalSalary * 0.70;
  } else if (totalSalary <= 15_000_000) {
    deduction = 3_500_000 + (totalSalary - 5_000_000) * 0.40;
  } else if (totalSalary <= 45_000_000) {
    deduction = 7_500_000 + (totalSalary - 15_000_000) * 0.15;
  } else if (totalSalary <= 100_000_000) {
    deduction = 12_000_000 + (totalSalary - 45_000_000) * 0.05;
  } else {
    deduction = 14_750_000;
  }
  // 상한 2,000만원
  return Math.min(Math.floor(deduction), 20_000_000);
}

export type YearEndTaxInput = {
  totalSalary: number;              // 총급여액 (원)
  dependents: number;               // 부양가족수 (본인 포함, 최소 1)
  dependentsUnder20: number;        // 자녀 중 20세 이하 인원
  nationalPensionPaid: number;      // 납부 국민연금 (원)
  healthInsurancePaid: number;      // 납부 건강보험료 (원)
  employmentInsurancePaid: number;  // 납부 고용보험료 (원)
  creditCardUsage: number;          // 신용카드 사용액 (원)
  debitCardUsage: number;           // 체크카드·현금영수증 사용액 (원)
  medicalExpenses: number;          // 의료비 지출액 (원)
  educationExpenses: number;        // 교육비 지출액 (원)
  donationAmount: number;           // 기부금 (원)
  alreadyWithheld: number;          // 기납부(원천징수) 세액 (원)
};

export type YearEndTaxResult = {
  totalSalary: number;
  employmentIncomeDeduction: number;  // 근로소득공제
  employmentIncome: number;           // 근로소득금액
  personalDeductionTotal: number;     // 인적공제 합계
  socialInsuranceDeduction: number;   // 4대보험료 공제
  creditCardDeduction: number;        // 신용카드 공제
  taxableIncome: number;              // 과세표준
  calculatedTax: number;              // 산출세액
  taxCredit: number;                  // 근로소득세액공제
  childTaxCredit: number;             // 자녀세액공제
  medicalCredit: number;              // 의료비 세액공제
  educationCredit: number;            // 교육비 세액공제
  donationCredit: number;             // 기부금 세액공제
  totalTaxCredit: number;             // 세액공제 합계
  determinedTax: number;              // 결정세액
  localIncomeTax: number;             // 지방소득세
  totalDetermined: number;            // 결정세액 + 지방소득세
  alreadyWithheld: number;            // 기납부세액
  refundOrAdditional: number;         // 환급(+) 또는 추납(-) 세액
};

// 누진세율 (소득세법 제55조)
function calcProgressiveTax(taxableIncome: number): number {
  if (taxableIncome <= 14_000_000) return Math.floor(taxableIncome * 0.06);
  if (taxableIncome <= 50_000_000) return Math.floor(840_000 + (taxableIncome - 14_000_000) * 0.15);
  if (taxableIncome <= 88_000_000) return Math.floor(6_240_000 + (taxableIncome - 50_000_000) * 0.24);
  if (taxableIncome <= 150_000_000) return Math.floor(15_360_000 + (taxableIncome - 88_000_000) * 0.35);
  if (taxableIncome <= 300_000_000) return Math.floor(37_060_000 + (taxableIncome - 150_000_000) * 0.38);
  if (taxableIncome <= 500_000_000) return Math.floor(94_060_000 + (taxableIncome - 300_000_000) * 0.40);
  if (taxableIncome <= 1_000_000_000) return Math.floor(174_060_000 + (taxableIncome - 500_000_000) * 0.42);
  return Math.floor(384_060_000 + (taxableIncome - 1_000_000_000) * 0.45);
}

// 근로소득세액공제 (소득세법 제59조)
// 산출세액 130만 이하: 55%, 초과분: 30%
// 총급여 3300만 이하: 74만, 7000만 이하: min(74만, 66만 - (총급여-3300만)*0.008), 초과: 50만
function calcEmploymentTaxCredit(calculatedTax: number, totalSalary: number): number {
  let credit: number;
  if (calculatedTax <= 1_300_000) {
    credit = Math.floor(calculatedTax * 0.55);
  } else {
    credit = Math.floor(715_000 + (calculatedTax - 1_300_000) * 0.30);
  }

  let maxCredit: number;
  if (totalSalary <= 33_000_000) {
    maxCredit = 740_000;
  } else if (totalSalary <= 70_000_000) {
    maxCredit = Math.max(Math.floor(740_000 - (totalSalary - 33_000_000) * 0.008), 660_000);
  } else {
    maxCredit = 500_000;
  }

  return Math.min(credit, maxCredit);
}

export function calculateYearEndTax(input: YearEndTaxInput): YearEndTaxResult {
  const {
    totalSalary,
    dependents,
    dependentsUnder20,
    nationalPensionPaid,
    healthInsurancePaid,
    employmentInsurancePaid,
    creditCardUsage,
    debitCardUsage,
    medicalExpenses,
    educationExpenses,
    donationAmount,
    alreadyWithheld,
  } = input;

  // 1. 근로소득공제
  const employmentIncomeDeduction = calcEmploymentIncomDeduction(totalSalary);
  const employmentIncome = totalSalary - employmentIncomeDeduction;

  // 2. 종합소득공제

  // 기본공제: 1인당 150만원
  const personalDeductionTotal = Math.min(dependents, 20) * 1_500_000;

  // 4대보험 공제 (실제 납부액)
  const socialInsuranceDeduction = nationalPensionPaid + healthInsurancePaid + employmentInsurancePaid;

  // 신용카드 공제 (소득세법 제126조의2)
  // 총급여의 25% 초과분에 대해 신용카드 15%, 체크카드 30% 공제
  const creditCardThreshold = Math.floor(totalSalary * 0.25);
  const totalCardUsage = creditCardUsage + debitCardUsage;
  let creditCardDeduction = 0;
  if (totalCardUsage > creditCardThreshold) {
    const excessAmount = totalCardUsage - creditCardThreshold;
    // 신용카드와 체크카드 비율로 배분 (단순화: 먼저 신용카드 공제율 15%, 체크카드 30%)
    if (creditCardUsage >= creditCardThreshold) {
      // 초과분 중 체크카드분
      const debitExcess = Math.min(debitCardUsage, excessAmount);
      const creditExcess = excessAmount - debitExcess;
      // 각 공제율 구간을 개별 floor 후 합산 (부동소수점 오차 방지)
      creditCardDeduction = Math.floor(debitExcess * 0.30) + Math.floor(creditExcess * 0.15);
    } else {
      // 체크카드 먼저 채우고 나머지 신용카드
      creditCardDeduction = Math.floor(excessAmount * 0.30);
    }
    // 상한: 연300만 (총급여 7천만 이하), 250만 (7천~1.2억), 200만 (1.2억 초과)
    const cardMaxCredit = totalSalary <= 70_000_000 ? 3_000_000 :
                          totalSalary <= 120_000_000 ? 2_500_000 : 2_000_000;
    creditCardDeduction = Math.min(creditCardDeduction, cardMaxCredit);
  }

  // 과세표준
  const taxableIncome = Math.max(0,
    employmentIncome - personalDeductionTotal - socialInsuranceDeduction - creditCardDeduction
  );

  // 3. 산출세액
  const calculatedTax = calcProgressiveTax(taxableIncome);

  // 4. 세액공제

  // 근로소득세액공제
  const taxCredit = calcEmploymentTaxCredit(calculatedTax, totalSalary);

  // 자녀세액공제: 1명 15만, 2명 30만, 3명 이상 30만 + 추가 30만
  let childTaxCredit = 0;
  if (dependentsUnder20 === 1) childTaxCredit = 150_000;
  else if (dependentsUnder20 === 2) childTaxCredit = 300_000;
  else if (dependentsUnder20 >= 3) childTaxCredit = 300_000 + (dependentsUnder20 - 2) * 300_000;

  // 의료비 세액공제: 총급여의 3% 초과분 × 15% (난임·중증 제외, 단순화)
  const medicalThreshold = Math.floor(totalSalary * 0.03);
  const medicalCredit = medicalExpenses > medicalThreshold
    ? Math.floor((medicalExpenses - medicalThreshold) * 0.15)
    : 0;

  // 교육비 세액공제: 지출액 × 15% (대학생 상한 900만, 초중고 300만, 여기서는 단순 15%)
  const educationCredit = Math.floor(educationExpenses * 0.15);

  // 기부금 세액공제: 1천만 이하 15%, 초과 30% (단순화: 15%)
  const donationCredit = Math.floor(donationAmount * 0.15);

  const totalTaxCredit = taxCredit + childTaxCredit + medicalCredit + educationCredit + donationCredit;

  // 5. 결정세액
  const determinedTax = Math.max(0, calculatedTax - totalTaxCredit);
  const localIncomeTax = Math.floor(determinedTax * 0.1);
  const totalDetermined = determinedTax + localIncomeTax;

  // 6. 환급 또는 추납
  // 양수: 환급, 음수: 추납
  const refundOrAdditional = alreadyWithheld - totalDetermined;

  return {
    totalSalary,
    employmentIncomeDeduction,
    employmentIncome,
    personalDeductionTotal,
    socialInsuranceDeduction,
    creditCardDeduction,
    taxableIncome,
    calculatedTax,
    taxCredit,
    childTaxCredit,
    medicalCredit,
    educationCredit,
    donationCredit,
    totalTaxCredit,
    determinedTax,
    localIncomeTax,
    totalDetermined,
    alreadyWithheld,
    refundOrAdditional,
  };
}
