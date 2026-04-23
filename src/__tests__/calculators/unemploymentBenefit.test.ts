import { describe, it, expect } from "vitest";
import { calculateUnemploymentBenefit, DAILY_BENEFIT_MAX } from "@/lib/calculators/unemploymentBenefit";

describe("calculateUnemploymentBenefit", () => {
  it("구직급여일액 = 평균임금 × 60% (하한·상한 사이 구간)", () => {
    // 115,000 × 60% = 69,000 → 하한(66,048) 이상, 상한(70,000) 이하
    const result = calculateUnemploymentBenefit({
      averageDailyWage: 115_000,
      ageGroup: "under50",
      insurancePeriod: "1to3",
    });
    expect(result.dailyBenefit).toBe(Math.floor(115_000 * 0.6));
  });

  it("상한 초과 시 66,000원으로 제한", () => {
    const result = calculateUnemploymentBenefit({
      averageDailyWage: 200_000, // 60% = 120,000 → 상한 적용
      ageGroup: "under50",
      insurancePeriod: "1to3",
    });
    expect(result.dailyBenefit).toBe(DAILY_BENEFIT_MAX);
  });

  it("50세 미만, 피보험 1~3년 → 150일", () => {
    const result = calculateUnemploymentBenefit({
      averageDailyWage: 80_000,
      ageGroup: "under50",
      insurancePeriod: "1to3",
    });
    expect(result.benefitDays).toBe(150);
  });

  it("50세 이상, 피보험 10년 이상 → 270일", () => {
    const result = calculateUnemploymentBenefit({
      averageDailyWage: 80_000,
      ageGroup: "50above",
      insurancePeriod: "10above",
    });
    expect(result.benefitDays).toBe(270);
  });

  it("50세 미만, 피보험 1년 미만 → 120일", () => {
    const result = calculateUnemploymentBenefit({
      averageDailyWage: 80_000,
      ageGroup: "under50",
      insurancePeriod: "under1year",
    });
    expect(result.benefitDays).toBe(120);
  });

  it("총 수급액 = 구직급여일액 × 소정급여일수", () => {
    const result = calculateUnemploymentBenefit({
      averageDailyWage: 80_000,
      ageGroup: "under50",
      insurancePeriod: "3to5",
    });
    expect(result.totalBenefit).toBe(result.dailyBenefit * result.benefitDays);
  });
});
