import { describe, it, expect } from "vitest";
import { calculateCapitalGainsTax } from "@/lib/calculators/capitalGainsTax";

describe("calculateCapitalGainsTax", () => {
  it("TC-17-1: 1주택, 2년 보유, 비조정, 12억 이하 → 비과세", () => {
    const result = calculateCapitalGainsTax({
      transferPrice: 800_000_000,
      acquisitionPrice: 500_000_000,
      necessaryExpenses: 5_000_000,
      holdingYears: 3,
      residenceYears: 2,
      houseCount: "one",
      isAdjustedArea: false,
    });
    expect(result.isExempt).toBe(true);
    expect(result.totalTax).toBe(0);
  });

  it("TC-17-2: 1주택, 1년 미만 보유 → 70% 세율 적용", () => {
    const result = calculateCapitalGainsTax({
      transferPrice: 600_000_000,
      acquisitionPrice: 500_000_000,
      necessaryExpenses: 0,
      holdingYears: 0.5,
      residenceYears: 0,
      houseCount: "one",
      isAdjustedArea: false,
    });
    expect(result.isExempt).toBe(false);
    expect(result.taxRate).toBe(0.70);
  });

  it("TC-17-3: 양도차익 계산", () => {
    const result = calculateCapitalGainsTax({
      transferPrice: 500_000_000,
      acquisitionPrice: 300_000_000,
      necessaryExpenses: 5_000_000,
      holdingYears: 5,
      residenceYears: 0,
      houseCount: "two",
      isAdjustedArea: false,
    });
    // 양도차익 = 500,000,000 - 300,000,000 - 5,000,000 = 195,000,000
    expect(result.capitalGain).toBe(195_000_000);
  });

  it("TC-17-4: 장기보유특별공제 — 1주택 5년 보유·거주 → 40%", () => {
    const result = calculateCapitalGainsTax({
      transferPrice: 1_500_000_000, // 12억 초과
      acquisitionPrice: 800_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      residenceYears: 5,
      houseCount: "one",
      isAdjustedArea: false,
    });
    // 고가주택 처리 — longTermDeductionRate = 5*0.04 + 5*0.04 = 0.40
    expect(result.longTermDeductionRate).toBe(0.40);
    expect(result.isExempt).toBe(false);
    expect(result.warning).toContain("12억 초과");
  });

  it("TC-17-5: 다주택자 3년 미만 → 장기보유공제 없음", () => {
    const result = calculateCapitalGainsTax({
      transferPrice: 400_000_000,
      acquisitionPrice: 300_000_000,
      necessaryExpenses: 0,
      holdingYears: 2,
      residenceYears: 0,
      houseCount: "two",
      isAdjustedArea: false,
    });
    expect(result.longTermDeductionRate).toBe(0);
  });

  it("TC-17-6: 양도차익이 0 이하이면 세금 0", () => {
    const result = calculateCapitalGainsTax({
      transferPrice: 300_000_000,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 0,
      holdingYears: 3,
      residenceYears: 0,
      houseCount: "two",
      isAdjustedArea: false,
    });
    expect(result.capitalGain).toBe(0);
    expect(result.totalTax).toBe(0);
  });
});
