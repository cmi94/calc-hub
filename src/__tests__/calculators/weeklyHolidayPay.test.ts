import { describe, it, expect } from "vitest";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weeklyHolidayPay";

describe("calculateWeeklyHolidayPay", () => {
  it("주 15시간 미만은 주휴수당이 0이어야 한다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_320, weeklyHours: 14 });
    expect(result.isEligible).toBe(false);
    expect(result.holidayPayPerWeek).toBe(0);
  });

  it("주 15시간은 주휴수당이 지급되어야 한다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_320, weeklyHours: 15 });
    expect(result.isEligible).toBe(true);
    expect(result.holidayPayPerWeek).toBeGreaterThan(0);
  });

  it("주 40시간(풀타임) 시급 10,030원 — 주휴수당 8시간분이어야 한다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_320, weeklyHours: 40 });
    expect(result.holidayPayPerWeek).toBe(Math.floor(8 * 10_320));
  });

  it("주 40시간 초과해도 주휴수당은 8시간분 상한이어야 한다", () => {
    const fortyHours = calculateWeeklyHolidayPay({ hourlyWage: 10_320, weeklyHours: 40 });
    const fiftyHours = calculateWeeklyHolidayPay({ hourlyWage: 10_320, weeklyHours: 50 });
    expect(fiftyHours.holidayPayPerWeek).toBe(fortyHours.holidayPayPerWeek);
  });

  it("월 총 임금은 근로분 + 주휴수당이어야 한다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_320, weeklyHours: 40 });
    const expectedMonthlyWork = Math.floor(40 * 4.345 * 10_320);
    expect(result.monthlyTotalWage).toBe(expectedMonthlyWork + result.holidayPayPerMonth);
  });
});
