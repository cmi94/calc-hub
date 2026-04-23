import { describe, it, expect } from "vitest";
import { calculateHourlyWage, MIN_HOURLY_WAGE_2026 } from "@/lib/calculators/hourlyWage";

describe("calculateHourlyWage", () => {
  it("일급은 시급 × 8시간", () => {
    const result = calculateHourlyWage({ hourlyWage: 10_320, weeklyHours: 40, includeHolidayPay: true });
    expect(result.dailyWage).toBe(10_320 * 8);
  });

  it("주 40시간 + 주휴수당 포함 — 주급 계산", () => {
    const result = calculateHourlyWage({ hourlyWage: 10_320, weeklyHours: 40, includeHolidayPay: true });
    const expectedHoliday = Math.floor((40 / 40) * 8 * 10_320);
    const expectedWeekly = Math.floor(40 * 10_320) + expectedHoliday;
    expect(result.weeklyWage).toBe(expectedWeekly);
    expect(result.holidayPayPerWeek).toBe(expectedHoliday);
  });

  it("주휴수당 미포함 — 주급에 주휴수당 없음", () => {
    const result = calculateHourlyWage({ hourlyWage: 10_320, weeklyHours: 40, includeHolidayPay: false });
    expect(result.holidayPayPerWeek).toBe(0);
    expect(result.weeklyWage).toBe(Math.floor(40 * 10_320));
  });

  it("주 15시간 미만 — 주휴수당 0", () => {
    const result = calculateHourlyWage({ hourlyWage: 10_320, weeklyHours: 14, includeHolidayPay: true });
    expect(result.holidayPayPerWeek).toBe(0);
  });

  it("월급 = 주급 × 4.345 내림", () => {
    const result = calculateHourlyWage({ hourlyWage: 10_320, weeklyHours: 40, includeHolidayPay: true });
    expect(result.monthlyWage).toBe(Math.floor(result.weeklyWage * 4.345));
  });

  it("연봉 = 월급 × 12", () => {
    const result = calculateHourlyWage({ hourlyWage: 10_320, weeklyHours: 40, includeHolidayPay: true });
    expect(result.annualWage).toBe(result.monthlyWage * 12);
  });

  it("최저시급 이상 — isAboveMinWage true", () => {
    const result = calculateHourlyWage({ hourlyWage: MIN_HOURLY_WAGE_2026, weeklyHours: 40, includeHolidayPay: true });
    expect(result.isAboveMinWage).toBe(true);
  });

  it("최저시급 미만 — isAboveMinWage false", () => {
    const result = calculateHourlyWage({ hourlyWage: MIN_HOURLY_WAGE_2026 - 1, weeklyHours: 40, includeHolidayPay: true });
    expect(result.isAboveMinWage).toBe(false);
  });

  it("minWage는 2026 최저시급 10,320원", () => {
    const result = calculateHourlyWage({ hourlyWage: 12_000, weeklyHours: 40, includeHolidayPay: true });
    expect(result.minWage).toBe(10_320);
  });
});
