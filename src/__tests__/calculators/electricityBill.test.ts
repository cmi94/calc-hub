import { describe, it, expect } from "vitest";
import { calculateElectricityBill } from "@/lib/calculators/electricityBill";

describe("calculateElectricityBill", () => {
  it("TC-21-1: 100kWh → 1구간", () => {
    const result = calculateElectricityBill({ monthlyKwh: 100 });
    expect(result.tier).toBe(1);
    expect(result.basicCharge).toBe(910);
    expect(result.usageCharge).toBe(12_000); // 100 * 120
    expect(result.subtotal).toBe(12_910);
    expect(result.vat).toBe(1_291);
    expect(result.powerFundLevy).toBe(477); // 12910 * 0.037 = 477.67
    expect(result.totalBill).toBe(14_678); // 12910 + 1291 + 477
  });

  it("TC-21-2: 300kWh → 2구간", () => {
    const result = calculateElectricityBill({ monthlyKwh: 300 });
    expect(result.tier).toBe(2);
    expect(result.basicCharge).toBe(1_600);
    // 200*120 + 100*214.6 = 24000 + 21460 = 45460
    expect(result.usageCharge).toBe(45_460);
  });

  it("TC-21-3: 500kWh → 3구간", () => {
    const result = calculateElectricityBill({ monthlyKwh: 500 });
    expect(result.tier).toBe(3);
    expect(result.basicCharge).toBe(7_300);
    // 200*120 + 200*214.6 + 100*307.3 = 24000 + 42920 + 30730 = 97650
    expect(result.usageCharge).toBe(97_650);
  });

  it("TC-21-4: TV 수신료 포함", () => {
    const withTv = calculateElectricityBill({ monthlyKwh: 200, includesTvFee: true });
    const withoutTv = calculateElectricityBill({ monthlyKwh: 200, includesTvFee: false });
    expect(withTv.totalBill - withoutTv.totalBill).toBe(2_500);
    expect(withTv.tvFee).toBe(2_500);
  });

  it("TC-21-5: 0kWh → avgUnitPrice = 0", () => {
    const result = calculateElectricityBill({ monthlyKwh: 0 });
    expect(result.avgUnitPrice).toBe(0);
  });

  it("TC-21-6: 평균 단가 계산", () => {
    const result = calculateElectricityBill({ monthlyKwh: 200 });
    expect(result.avgUnitPrice).toBeGreaterThan(0);
    expect(result.avgUnitPrice).toBe(Math.round(result.totalBill / 200));
  });
});
