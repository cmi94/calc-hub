import { describe, it, expect } from "vitest";
import { calculateSalary } from "@/lib/calculators/salary";

describe("calculateSalary", () => {
  it("연봉 3,000만원 — 기본 공제 항목이 모두 양수여야 한다", () => {
    const result = calculateSalary({ annualSalary: 30_000_000, dependents: 1 });
    expect(result.nationalPension).toBeGreaterThan(0);
    expect(result.healthInsurance).toBeGreaterThan(0);
    expect(result.longTermCare).toBeGreaterThan(0);
    expect(result.employmentInsurance).toBeGreaterThan(0);
    expect(result.monthlyNetSalary).toBeGreaterThan(0);
  });

  it("연봉 3,000만원 — 월 실수령액이 월급여보다 작아야 한다", () => {
    const result = calculateSalary({ annualSalary: 30_000_000, dependents: 1 });
    expect(result.monthlyNetSalary).toBeLessThan(result.monthlySalary);
  });

  it("연봉 3,000만원 — 총 공제액 = 월급여 - 월 실수령액", () => {
    const result = calculateSalary({ annualSalary: 30_000_000, dependents: 1 });
    expect(result.totalDeduction).toBe(result.monthlySalary - result.monthlyNetSalary);
  });

  it("연봉 5,000만원 — 월 국민연금이 상한(617만원×4.5%=277,650원)을 초과하지 않아야 한다", () => {
    const result = calculateSalary({ annualSalary: 500_000_000, dependents: 1 });
    expect(result.nationalPension).toBeLessThanOrEqual(Math.floor(6_170_000 * 0.045));
  });

  it("연봉이 높을수록 실수령액도 높아야 한다", () => {
    const low = calculateSalary({ annualSalary: 30_000_000, dependents: 1 });
    const high = calculateSalary({ annualSalary: 50_000_000, dependents: 1 });
    expect(high.monthlyNetSalary).toBeGreaterThan(low.monthlyNetSalary);
  });

  it("부양가족이 많을수록 소득세가 낮아야 한다", () => {
    const single = calculateSalary({ annualSalary: 40_000_000, dependents: 1 });
    const family = calculateSalary({ annualSalary: 40_000_000, dependents: 4 });
    expect(family.incomeTax).toBeLessThanOrEqual(single.incomeTax);
  });

  it("연봉 2,400만원(최저임금 근사) — 월 실수령액이 0 초과여야 한다", () => {
    const result = calculateSalary({ annualSalary: 24_000_000, dependents: 1 });
    expect(result.monthlyNetSalary).toBeGreaterThan(0);
  });

  it("연간 실수령액 = 월 실수령액 × 12", () => {
    const result = calculateSalary({ annualSalary: 60_000_000, dependents: 1 });
    expect(result.annualNetSalary).toBe(result.monthlyNetSalary * 12);
  });
});
