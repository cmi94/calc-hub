import { describe, it, expect } from "vitest";
import { calculateSeverance } from "@/lib/calculators/severance";

describe("calculateSeverance", () => {
  it("1년 미만 재직자는 퇴직금이 0이어야 한다", () => {
    const result = calculateSeverance({
      startDate: "2024-01-01",
      endDate: "2024-06-30", // 181일 — 1년 미만
      lastThreeMonthsPay: 9_000_000,
      lastThreeMonthsDays: 90,
    });
    expect(result.isEligible).toBe(false);
    expect(result.severancePay).toBe(0);
  });

  it("정확히 1년 재직 시 퇴직금이 지급되어야 한다", () => {
    const result = calculateSeverance({
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      lastThreeMonthsPay: 9_000_000,
      lastThreeMonthsDays: 90,
    });
    expect(result.isEligible).toBe(true);
    expect(result.severancePay).toBeGreaterThan(0);
  });

  it("3년 재직, 월 300만원 기준 — 퇴직금이 약 900만원이어야 한다", () => {
    // 평균임금 = 9,000,000 / 90 = 100,000원/일
    // 퇴직금 = 100,000 × 30 × (1096 / 365) ≈ 9,009,863원
    const result = calculateSeverance({
      startDate: "2022-01-01",
      endDate: "2024-12-31",
      lastThreeMonthsPay: 9_000_000,
      lastThreeMonthsDays: 90,
    });
    expect(result.severancePay).toBeGreaterThan(8_000_000);
    expect(result.severancePay).toBeLessThan(12_000_000);
  });

  it("평균임금이 높을수록 퇴직금이 많아야 한다", () => {
    const low = calculateSeverance({
      startDate: "2022-01-01",
      endDate: "2024-12-31",
      lastThreeMonthsPay: 9_000_000,
      lastThreeMonthsDays: 90,
    });
    const high = calculateSeverance({
      startDate: "2022-01-01",
      endDate: "2024-12-31",
      lastThreeMonthsPay: 18_000_000,
      lastThreeMonthsDays: 90,
    });
    expect(high.severancePay).toBeGreaterThan(low.severancePay);
  });

  it("재직기간이 길수록 퇴직금이 많아야 한다", () => {
    const short = calculateSeverance({
      startDate: "2023-01-01",
      endDate: "2024-12-31",
      lastThreeMonthsPay: 9_000_000,
      lastThreeMonthsDays: 90,
    });
    const long = calculateSeverance({
      startDate: "2020-01-01",
      endDate: "2024-12-31",
      lastThreeMonthsPay: 9_000_000,
      lastThreeMonthsDays: 90,
    });
    expect(long.severancePay).toBeGreaterThan(short.severancePay);
  });
});
