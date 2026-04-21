import { describe, it, expect } from "vitest";
import { calculateIncomeTax, SIMPLE_EXPENSE_RATE, STANDARD_EXPENSE_RATE } from "@/lib/calculators/incomeTax";

describe("calculateIncomeTax", () => {
  it("단순경비율 적용 시 필요경비 = 소득 × 64.1%", () => {
    const result = calculateIncomeTax({ annualIncome: 30_000_000, expenseType: "simple" });
    expect(result.expense).toBe(Math.floor(30_000_000 * SIMPLE_EXPENSE_RATE));
  });

  it("기준경비율 적용 시 필요경비 = 소득 × 15.7%", () => {
    const result = calculateIncomeTax({ annualIncome: 30_000_000, expenseType: "standard" });
    expect(result.expense).toBe(Math.floor(30_000_000 * STANDARD_EXPENSE_RATE));
  });

  it("실제 경비 직접 입력 시 해당 금액 반영", () => {
    const result = calculateIncomeTax({ annualIncome: 30_000_000, expenseType: "actual", actualExpense: 10_000_000 });
    expect(result.expense).toBe(10_000_000);
  });

  it("총 세금 = 소득세 + 지방소득세", () => {
    const result = calculateIncomeTax({ annualIncome: 50_000_000, expenseType: "simple" });
    expect(result.totalTax).toBe(result.calculatedTax + result.localIncomeTax);
  });

  it("지방소득세 = 소득세 × 10%", () => {
    const result = calculateIncomeTax({ annualIncome: 50_000_000, expenseType: "simple" });
    expect(result.localIncomeTax).toBe(Math.floor(result.calculatedTax * 0.1));
  });

  it("소득이 높을수록 세금이 많다", () => {
    const low = calculateIncomeTax({ annualIncome: 30_000_000, expenseType: "simple" });
    const high = calculateIncomeTax({ annualIncome: 80_000_000, expenseType: "simple" });
    expect(high.totalTax).toBeGreaterThan(low.totalTax);
  });

  it("실제 경비가 소득을 초과하면 사업소득금액은 0", () => {
    const result = calculateIncomeTax({ annualIncome: 10_000_000, expenseType: "actual", actualExpense: 20_000_000 });
    expect(result.businessIncome).toBe(0);
    expect(result.calculatedTax).toBe(0);
  });
});
