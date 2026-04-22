import { describe, it, expect } from "vitest";
import { calculatePropertyAcquisitionTax } from "@/lib/calculators/propertyAcquisitionTax";

describe("calculatePropertyAcquisitionTax", () => {
  // TC-04-1: 5억, 1주택, 비조정 → 취득세율 1%
  it("5억 1주택 비조정 — 취득세율 1%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "1",
      isAdjusted: false,
      area: 85,
    });
    expect(result.taxRate).toBeCloseTo(0.01, 5);
    expect(result.acquisitionTax).toBe(5_000_000);
  });

  // TC-04-2: 8억, 1주택, 비조정 → 취득세율 약 2.33%
  it("8억 1주택 비조정 — 취득세율 약 2.33%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 800_000_000,
      houseCount: "1",
      isAdjusted: false,
      area: 85,
    });
    expect(result.taxRate).toBeCloseTo(0.02333, 4);
    expect(result.acquisitionTax).toBe(Math.floor(800_000_000 * result.taxRate));
  });

  // TC-04-3: 5억, 2주택, 조정 → 취득세율 8%
  it("5억 2주택 조정 — 취득세율 8%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "2",
      isAdjusted: true,
      area: 85,
    });
    expect(result.taxRate).toBe(0.08);
    expect(result.acquisitionTax).toBe(40_000_000);
  });

  // TC-04-4: 5억, 3주택+, 조정 → 취득세율 12%
  it("5억 3주택+ 조정 — 취득세율 12%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "3plus",
      isAdjusted: true,
      area: 85,
    });
    expect(result.taxRate).toBe(0.12);
    expect(result.acquisitionTax).toBe(60_000_000);
  });

  it("법인 — 취득세율 12%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "corporate",
      isAdjusted: false,
      area: 85,
    });
    expect(result.taxRate).toBe(0.12);
    expect(result.acquisitionTax).toBe(60_000_000);
  });

  it("비조정 3주택 — 취득세율 8%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "3plus",
      isAdjusted: false,
      area: 85,
    });
    expect(result.taxRate).toBe(0.08);
  });

  it("비조정 2주택 — 1주택과 동일 누진세율 적용", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "2",
      isAdjusted: false,
      area: 85,
    });
    expect(result.taxRate).toBeCloseTo(0.01, 5);
  });

  it("6억 초과 9억 이하 경계값 — 6억 정확히 1%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 600_000_000,
      houseCount: "1",
      isAdjusted: false,
      area: 85,
    });
    expect(result.taxRate).toBeCloseTo(0.01, 5);
  });

  it("9억 초과 — 취득세율 3%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 1_000_000_000,
      houseCount: "1",
      isAdjusted: false,
      area: 85,
    });
    expect(result.taxRate).toBe(0.03);
  });

  it("지방교육세는 취득세의 10%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "1",
      isAdjusted: false,
      area: 85,
    });
    expect(result.localEducationTax).toBe(Math.floor(result.acquisitionTax * 0.1));
  });

  it("전용 85㎡ 이하 — 농어촌특별세 0원", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "1",
      isAdjusted: false,
      area: 85,
    });
    expect(result.ruralSpecialTax).toBe(0);
  });

  it("전용 86㎡ — 농어촌특별세 취득세의 20%", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 500_000_000,
      houseCount: "1",
      isAdjusted: false,
      area: 86,
    });
    expect(result.ruralSpecialTax).toBe(Math.floor(result.acquisitionTax * 0.2));
  });

  it("totalTax는 취득세 + 지방교육세 + 농어촌특별세 합산", () => {
    const result = calculatePropertyAcquisitionTax({
      propertyPrice: 800_000_000,
      houseCount: "1",
      isAdjusted: false,
      area: 90,
    });
    expect(result.totalTax).toBe(
      result.acquisitionTax + result.localEducationTax + result.ruralSpecialTax
    );
  });
});
