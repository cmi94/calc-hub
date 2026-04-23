import { describe, it, expect } from "vitest";
import { calculateCarTax, getReductionRate } from "@/lib/calculators/carTax";

describe("getReductionRate", () => {
  it("1년차 → 0%", () => expect(getReductionRate(1)).toBe(0));
  it("2년차 → 0%", () => expect(getReductionRate(2)).toBe(0));
  it("3년차 → 5%", () => expect(getReductionRate(3)).toBe(0.05));
  it("4년차 → 10%", () => expect(getReductionRate(4)).toBe(0.10));
  it("12년차 → 50% (상한)", () => expect(getReductionRate(12)).toBe(0.50));
  it("20년차 → 50% (상한 초과 안됨)", () => expect(getReductionRate(20)).toBe(0.50));
});

describe("calculateCarTax — 비영업용 승용차", () => {
  it("TC-20-1: 2000cc, 1년차 → 기본세 400,000 + 지방교육세 120,000 = 520,000", () => {
    const result = calculateCarTax({ carType: "passenger", displacement: 2000, vehicleAge: 1 });
    expect(result.baseTax).toBe(400_000); // 2000cc × 200원
    expect(result.reductionRate).toBe(0);
    expect(result.annualTax).toBe(400_000);
    expect(result.educationTax).toBe(120_000);
    expect(result.totalTax).toBe(520_000);
  });

  it("TC-20-2: 1000cc 이하, 800cc → 기본세 64,000", () => {
    const result = calculateCarTax({ carType: "passenger", displacement: 800, vehicleAge: 1 });
    expect(result.baseTax).toBe(64_000); // 800cc × 80원
  });

  it("TC-20-3: 1600cc, 5년차 → 15% 경감", () => {
    const result = calculateCarTax({ carType: "passenger", displacement: 1600, vehicleAge: 5 });
    const baseTax = 1600 * 140; // 224,000
    const reduction = Math.floor(baseTax * 0.15);
    expect(result.baseTax).toBe(baseTax);
    expect(result.reductionRate).toBe(0.15);
    expect(result.annualTax).toBe(baseTax - reduction);
  });

  it("TC-20-4: 전기차 → 정액 100,000원", () => {
    const result = calculateCarTax({ carType: "passenger", displacement: 0, vehicleAge: 1, isElectric: true });
    expect(result.baseTax).toBe(100_000);
    expect(result.annualTax).toBe(100_000);
  });
});
