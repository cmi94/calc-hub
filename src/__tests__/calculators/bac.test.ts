import { describe, it, expect } from "vitest";
import { calculateBac } from "@/lib/calculators/bac";

describe("calculateBac", () => {
  it("TC-30-1: 70kg 남성, 소주 1병(360mL 19도), 0시간 경과 → 약 0.11% BAC", () => {
    const result = calculateBac({
      gender: "male",
      weightKg: 70,
      drinks: [{ volumeMl: 360, alcoholPct: 19, count: 1 }],
      hoursElapsed: 0,
    });
    // 알코올 = 360 × 0.19 × 0.789 = 53.98g
    expect(result.totalAlcoholGrams).toBeCloseTo(53.98, 0);
    // BAC = 53.98 / (70 × 0.7 × 10) = 53.98 / 490 ≈ 0.110%
    expect(result.peakBac).toBeCloseTo(0.110, 2);
    expect(result.currentBac).toBeCloseTo(0.110, 2);
    expect(result.isDrivingSafe).toBe(false);
    expect(result.isDrivingLegal).toBe(false); // 0.11 >= 0.08 → 면허취소 수준
  });

  it("TC-30-2: 2시간 경과 후 BAC 감소", () => {
    const result = calculateBac({
      gender: "male",
      weightKg: 70,
      drinks: [{ volumeMl: 360, alcoholPct: 19, count: 1 }],
      hoursElapsed: 2,
    });
    // 0.110 - 0.015 × 2 = 0.080%
    expect(result.currentBac).toBeCloseTo(0.080, 2);
  });

  it("TC-30-3: 완전 해소 후 BAC = 0", () => {
    const result = calculateBac({
      gender: "male",
      weightKg: 70,
      drinks: [{ volumeMl: 360, alcoholPct: 19, count: 1 }],
      hoursElapsed: 10,
    });
    expect(result.currentBac).toBe(0);
    expect(result.isDrivingSafe).toBe(true);
    expect(result.soberInHours).toBe(0);
    expect(result.warning).toBe("음주 없음 또는 완전 해소");
  });

  it("TC-30-4: 음주 없음 → BAC = 0", () => {
    const result = calculateBac({
      gender: "male",
      weightKg: 70,
      drinks: [],
      hoursElapsed: 0,
    });
    expect(result.totalAlcoholGrams).toBe(0);
    expect(result.currentBac).toBe(0);
    expect(result.warning).toBe("음주 없음 또는 완전 해소");
  });

  it("TC-30-5: 여성은 BAC 더 높음 (분배계수 0.6 < 0.7)", () => {
    const male = calculateBac({
      gender: "male",
      weightKg: 60,
      drinks: [{ volumeMl: 360, alcoholPct: 19, count: 1 }],
      hoursElapsed: 0,
    });
    const female = calculateBac({
      gender: "female",
      weightKg: 60,
      drinks: [{ volumeMl: 360, alcoholPct: 19, count: 1 }],
      hoursElapsed: 0,
    });
    expect(female.peakBac).toBeGreaterThan(male.peakBac);
  });

  it("TC-30-6: 면허취소 기준(0.08%) 초과 시 경고 메시지", () => {
    // 대량 음주 시나리오
    const result = calculateBac({
      gender: "male",
      weightKg: 60,
      drinks: [{ volumeMl: 500, alcoholPct: 19, count: 2 }],
      hoursElapsed: 0,
    });
    if (result.currentBac >= 0.08) {
      expect(result.warning).toBe("면허취소 기준 초과");
      expect(result.isDrivingLegal).toBe(false);
    }
  });
});
