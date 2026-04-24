import { describe, it, expect } from "vitest";
import { calculateCarInstallment } from "@/lib/calculators/carInstallment";

describe("calculateCarInstallment", () => {
  it("TC-25-1: 3000만원 차량, 20% 선수금, 6.5%, 36개월", () => {
    const result = calculateCarInstallment({
      vehiclePrice: 30_000_000,
      downPaymentPct: 20,
      annualRate: 6.5,
      termMonths: 36,
    });
    expect(result.downPayment).toBe(6_000_000);       // 3000만 × 20%
    expect(result.loanAmount).toBe(24_000_000);       // 3000만 - 600만
    // 월납입금 약 733,000원대
    expect(result.monthlyPayment).toBeGreaterThan(700_000);
    expect(result.monthlyPayment).toBeLessThan(780_000);
    expect(result.totalPayment).toBe(result.monthlyPayment * 36);
    expect(result.totalInterest).toBe(result.totalPayment - 24_000_000);
    expect(result.totalCost).toBe(result.downPayment + result.totalPayment);
  });

  it("TC-25-2: 선수금 0%, 무이자 할부 (0%) 36개월", () => {
    const result = calculateCarInstallment({
      vehiclePrice: 30_000_000,
      downPaymentPct: 0,
      annualRate: 0,
      termMonths: 36,
    });
    expect(result.loanAmount).toBe(30_000_000);
    expect(result.totalInterest).toBe(0);
    expect(result.monthlyPayment).toBe(833_333); // 3000만/36 반올림
  });

  it("TC-25-3: 선수금, 총납입금 = totalCost", () => {
    const result = calculateCarInstallment({
      vehiclePrice: 20_000_000,
      downPaymentPct: 30,
      annualRate: 5,
      termMonths: 24,
    });
    expect(result.totalCost).toBe(result.downPayment + result.totalPayment);
  });

  it("TC-25-4: 총이자 > 0 (유이자 할부)", () => {
    const result = calculateCarInstallment({
      vehiclePrice: 30_000_000,
      downPaymentPct: 20,
      annualRate: 6.5,
      termMonths: 36,
    });
    expect(result.totalInterest).toBeGreaterThan(0);
  });
});
