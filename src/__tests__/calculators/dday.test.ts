import { describe, it, expect } from "vitest";
import { calculateDday } from "@/lib/calculators/dday";

describe("calculateDday", () => {
  it("TC-23-1: 365일 차이", () => {
    const result = calculateDday({ startDate: "2025-01-01", endDate: "2026-01-01" });
    expect(result.totalDays).toBe(365);
  });

  it("TC-23-2: 100일 차이", () => {
    const result = calculateDday({ startDate: "2026-01-01", endDate: "2026-04-11" });
    expect(result.totalDays).toBe(100);
  });

  it("TC-23-3: 같은 날 → 0일", () => {
    const result = calculateDday({ startDate: "2026-04-23", endDate: "2026-04-23" });
    expect(result.totalDays).toBe(0);
  });

  it("TC-23-4: 주 계산 (28일 = 4주)", () => {
    const result = calculateDday({ startDate: "2026-01-01", endDate: "2026-01-29" });
    expect(result.totalDays).toBe(28);
    expect(result.weeks).toBe(4);
  });

  it("TC-23-5: breakdown 년·월·일 분리 (1년 2개월 3일)", () => {
    const result = calculateDday({ startDate: "2025-01-01", endDate: "2026-03-04" });
    expect(result.breakdown.years).toBe(1);
    expect(result.breakdown.months).toBe(2);
    expect(result.breakdown.days).toBe(3);
  });

  it("TC-23-6: endDate가 startDate보다 이른 경우도 totalDays는 양수", () => {
    const result = calculateDday({ startDate: "2026-12-31", endDate: "2026-01-01" });
    expect(result.totalDays).toBeGreaterThan(0);
  });
});
