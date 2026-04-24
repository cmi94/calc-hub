import { describe, it, expect } from "vitest";
import { calculateRegistrationCost } from "@/lib/calculators/registrationCost";

describe("calculateRegistrationCost", () => {
  it("TC-24-1: 1억 취득가액 — 채권매입률 1.0%", () => {
    const result = calculateRegistrationCost({ propertyPrice: 100_000_000, isOnline: false });
    expect(result.registrationTax).toBe(200_000);        // 1억 × 0.2%
    expect(result.localEducationTax).toBe(40_000);        // 20만 × 20%
    expect(result.bondRate).toBe(0.010);
    expect(result.nationalHousingBondAmount).toBe(1_000_000); // 1억 × 1%
    expect(result.bondDiscountCost).toBe(15_000);         // 100만 × 1.5%
    expect(result.registrationFee).toBe(15_000);          // 방문
    expect(result.total).toBe(200_000 + 40_000 + 15_000 + 15_000);
  });

  it("TC-24-2: 3억 취득가액 — 채권매입률 2.1%", () => {
    const result = calculateRegistrationCost({ propertyPrice: 300_000_000, isOnline: false });
    expect(result.registrationTax).toBe(600_000);         // 3억 × 0.2%
    expect(result.localEducationTax).toBe(120_000);       // 60만 × 20%
    expect(result.bondRate).toBe(0.021);
    expect(result.nationalHousingBondAmount).toBe(6_300_000); // 3억 × 2.1%
    expect(result.bondDiscountCost).toBe(94_500);         // 630만 × 1.5%
    expect(result.registrationFee).toBe(15_000);
  });

  it("TC-24-3: 7억 취득가액 — 채권매입률 3.0%", () => {
    const result = calculateRegistrationCost({ propertyPrice: 700_000_000, isOnline: false });
    expect(result.bondRate).toBe(0.030);
    expect(result.registrationTax).toBe(1_400_000);       // 7억 × 0.2%
    expect(result.nationalHousingBondAmount).toBe(21_000_000); // 7억 × 3%
  });

  it("TC-24-4: 온라인 신청 시 수수료 3,000원", () => {
    const result = calculateRegistrationCost({ propertyPrice: 100_000_000, isOnline: true });
    expect(result.registrationFee).toBe(3_000);
  });

  it("TC-24-5: 1.6억 경계값 — 1.6억은 1.3% 구간", () => {
    const result = calculateRegistrationCost({ propertyPrice: 160_000_000, isOnline: false });
    expect(result.bondRate).toBe(0.013);
  });

  it("TC-24-6: 1.6억 초과 — 1.9% 구간", () => {
    const result = calculateRegistrationCost({ propertyPrice: 161_000_000, isOnline: false });
    expect(result.bondRate).toBe(0.019);
  });
});
