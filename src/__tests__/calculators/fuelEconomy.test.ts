import { describe, it, expect } from "vitest";
import { calculateFuelEconomy } from "@/lib/calculators/fuelEconomy";

describe("calculateFuelEconomy", () => {
  it("TC-29-1: 400km / 32L = 12.5 km/L", () => {
    const result = calculateFuelEconomy({
      distance: 400,
      fuelUsed: 32,
      fuelPrice: 1700,
    });
    expect(result.fuelEfficiency).toBe(12.5);
  });

  it("TC-29-2: 연료단가 1700원 → 100km당 13,600원", () => {
    const result = calculateFuelEconomy({
      distance: 400,
      fuelUsed: 32,
      fuelPrice: 1700,
    });
    expect(result.costPer100km).toBe(13_600);
  });

  it("TC-29-3: km당 연료비 확인 (1700/12.5 = 136원)", () => {
    const result = calculateFuelEconomy({
      distance: 400,
      fuelUsed: 32,
      fuelPrice: 1700,
    });
    expect(result.costPerKm).toBe(136);
  });

  it("TC-29-4: 월 연료비 계산 (월 1000km)", () => {
    const result = calculateFuelEconomy({
      distance: 400,
      fuelUsed: 32,
      fuelPrice: 1700,
      monthlyDistance: 1000,
    });
    // 1000km / 12.5km/L = 80L × 1700 = 136,000
    expect(result.monthlyFuelCost).toBe(136_000);
    expect(result.annualFuelCost).toBe(1_632_000);
  });

  it("TC-29-5: monthlyDistance 없으면 월/연 연료비 없음", () => {
    const result = calculateFuelEconomy({
      distance: 400,
      fuelUsed: 32,
      fuelPrice: 1700,
    });
    expect(result.monthlyFuelCost).toBeUndefined();
    expect(result.annualFuelCost).toBeUndefined();
  });
});
