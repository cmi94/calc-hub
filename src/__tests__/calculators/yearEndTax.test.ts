import { describe, it, expect } from "vitest";
import { calculateYearEndTax, calcEmploymentIncomDeduction } from "@/lib/calculators/yearEndTax";

describe("calcEmploymentIncomDeduction", () => {
  it("500만 이하: 70%", () => {
    expect(calcEmploymentIncomDeduction(3_000_000)).toBe(2_100_000);
  });

  it("총급여 3000만 → 근로소득공제", () => {
    // 1500만초과~4500만: 750만 + (3000만-1500만)*15% = 750만 + 225만 = 975만
    expect(calcEmploymentIncomDeduction(30_000_000)).toBe(9_750_000);
  });

  it("총급여 5000만 → 공제 계산", () => {
    // 4500만 이하 구간: 750만 + (4500만-1500만)*15% = 750+450 = 1200만
    // 5000만: 1200만 + (5000만-4500만)*5% = 1200+25 = 1225만
    expect(calcEmploymentIncomDeduction(50_000_000)).toBe(12_250_000);
  });

  it("1억 초과 시 1475만으로 고정", () => {
    // 소득세법 제47조: 1억 초과 시 14,750,000원 (상한 2,000만 미적용 구간)
    expect(calcEmploymentIncomDeduction(1_000_000_000)).toBe(14_750_000);
  });
});

describe("calculateYearEndTax", () => {
  const baseInput = {
    totalSalary: 40_000_000,
    dependents: 1,
    dependentsUnder20: 0,
    nationalPensionPaid: 1_620_000,
    healthInsurancePaid: 1_418_000,
    employmentInsurancePaid: 324_000,
    creditCardUsage: 5_000_000,
    debitCardUsage: 3_000_000,
    medicalExpenses: 0,
    educationExpenses: 0,
    donationAmount: 0,
    alreadyWithheld: 500_000,
  };

  it("TC-18-1: 기본 계산 — refundOrAdditional 숫자 반환", () => {
    const result = calculateYearEndTax(baseInput);
    expect(typeof result.refundOrAdditional).toBe("number");
  });

  it("TC-18-2: 근로소득금액 = 총급여 - 근로소득공제", () => {
    const result = calculateYearEndTax(baseInput);
    expect(result.employmentIncome).toBe(result.totalSalary - result.employmentIncomeDeduction);
  });

  it("TC-18-3: 과세표준이 0 이상", () => {
    const result = calculateYearEndTax(baseInput);
    expect(result.taxableIncome).toBeGreaterThanOrEqual(0);
  });

  it("TC-18-4: 결정세액이 0 이상", () => {
    const result = calculateYearEndTax(baseInput);
    expect(result.determinedTax).toBeGreaterThanOrEqual(0);
  });

  it("TC-18-5: 기납부 > 결정세액이면 환급 (양수)", () => {
    const result = calculateYearEndTax({
      ...baseInput,
      alreadyWithheld: 10_000_000, // 많이 냄
    });
    expect(result.refundOrAdditional).toBeGreaterThan(0);
  });

  it("TC-18-6: 기납부 < 결정세액이면 추납 (음수)", () => {
    const result = calculateYearEndTax({
      ...baseInput,
      totalSalary: 200_000_000, // 고소득
      alreadyWithheld: 1_000, // 거의 안 냄
    });
    expect(result.refundOrAdditional).toBeLessThan(0);
  });

  it("TC-18-7: 의료비 3% 초과분 세액공제", () => {
    const result = calculateYearEndTax({
      ...baseInput,
      medicalExpenses: 5_000_000, // 총급여40M * 3% = 120만 → 380만 초과분 * 15%
    });
    expect(result.medicalCredit).toBeGreaterThan(0);
  });
});
