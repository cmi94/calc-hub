import { describe, it, expect } from "vitest";
import { calculateInheritanceTax } from "@/lib/calculators/inheritanceTax";

describe("calculateInheritanceTax", () => {
  it("TC-19-1: 5억 이하 + 자녀 1명 → 일괄공제(5억)으로 과세표준 0", () => {
    const result = calculateInheritanceTax({
      totalAssets: 500_000_000,
      debts: 0,
      hasSpouse: false,
      spouseInheritance: 0,
      childrenCount: 1,
    });
    // 순재산 5억, 일괄공제 5억 → 과세표준 0
    expect(result.taxableBase).toBe(0);
    expect(result.totalTax).toBe(0);
  });

  it("TC-19-2: 10억, 배우자 없음, 자녀 2명 → 과세표준 계산", () => {
    const result = calculateInheritanceTax({
      totalAssets: 1_000_000_000,
      debts: 0,
      hasSpouse: false,
      spouseInheritance: 0,
      childrenCount: 2,
    });
    // 순재산 10억, 기초2억+자녀2명1억=3억 vs 일괄5억 → 일괄공제 5억 적용
    // 과세표준 = 10억 - 5억 = 5억
    expect(result.lumpSumDeduction).toBe(500_000_000);
    expect(result.taxableBase).toBe(500_000_000);
    // 5억 세액: 10% * 1억 + 20% * 4억 = 10,000,000 + 80,000,000 = 90,000,000
    expect(result.calculatedTax).toBe(90_000_000);
  });

  it("TC-19-3: 배우자 있음 (상속액 미입력) → 최소 5억 공제", () => {
    const result = calculateInheritanceTax({
      totalAssets: 2_000_000_000,
      debts: 0,
      hasSpouse: true,
      spouseInheritance: 0,
      childrenCount: 0,
    });
    expect(result.spouseDeduction).toBe(500_000_000);
    // 적용공제 = max(5억, 2억+0) + 5억 = 10억
    expect(result.appliedDeduction).toBe(1_000_000_000);
    expect(result.taxableBase).toBe(1_000_000_000);
  });

  it("TC-19-4: 배우자 실제 상속액이 30억 초과 시 30억 상한", () => {
    const result = calculateInheritanceTax({
      totalAssets: 10_000_000_000,
      debts: 0,
      hasSpouse: true,
      spouseInheritance: 4_000_000_000,
      childrenCount: 0,
    });
    expect(result.spouseDeduction).toBe(3_000_000_000);
  });

  it("TC-19-5: 채무 공제 후 순재산", () => {
    const result = calculateInheritanceTax({
      totalAssets: 800_000_000,
      debts: 100_000_000,
      hasSpouse: false,
      spouseInheritance: 0,
      childrenCount: 0,
    });
    expect(result.netAssets).toBe(700_000_000);
  });

  it("TC-19-6: 신고세액공제 3% 적용", () => {
    const result = calculateInheritanceTax({
      totalAssets: 1_500_000_000,
      debts: 0,
      hasSpouse: false,
      spouseInheritance: 0,
      childrenCount: 0,
    });
    expect(result.discountCredit).toBe(Math.floor(result.calculatedTax * 0.03));
    expect(result.totalTax).toBe(result.calculatedTax - result.discountCredit);
  });
});
