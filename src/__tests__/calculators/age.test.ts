import { describe, it, expect } from "vitest";
import { calculateAge } from "@/lib/calculators/age";

describe("calculateAge", () => {
  it("생일 전 — 만나이는 연차보다 1 적어야 한다", () => {
    const result = calculateAge({ birthDate: "1990-12-31", referenceDate: "2026-04-23" });
    expect(result.internationalAge).toBe(35);
  });

  it("생일 당일 — 만나이가 증가한다", () => {
    const result = calculateAge({ birthDate: "1990-04-23", referenceDate: "2026-04-23" });
    expect(result.internationalAge).toBe(36);
  });

  it("생일 다음날 — 만나이 유지", () => {
    const result = calculateAge({ birthDate: "1990-04-22", referenceDate: "2026-04-23" });
    expect(result.internationalAge).toBe(36);
  });

  it("한국 나이 = 현재연도 - 출생연도 + 1", () => {
    const result = calculateAge({ birthDate: "1990-01-01", referenceDate: "2026-04-23" });
    expect(result.koreanAge).toBe(37);
  });

  it("연나이 = 현재연도 - 출생연도", () => {
    const result = calculateAge({ birthDate: "1990-01-01", referenceDate: "2026-04-23" });
    expect(result.yearAge).toBe(36);
  });

  it("생일 당일 — 다음 생일까지 0일", () => {
    const result = calculateAge({ birthDate: "1990-04-23", referenceDate: "2026-04-23" });
    expect(result.daysUntilNextBirthday).toBe(0);
  });

  it("다음 생일까지 일수가 양수", () => {
    const result = calculateAge({ birthDate: "1990-12-25", referenceDate: "2026-04-23" });
    expect(result.daysUntilNextBirthday).toBeGreaterThan(0);
  });

  it("2월 29일생 — isLeapBirthday true", () => {
    const result = calculateAge({ birthDate: "2000-02-29", referenceDate: "2026-04-23" });
    expect(result.isLeapBirthday).toBe(true);
  });

  it("2월 29일생 평년 — 다음 생일이 3월 1일", () => {
    // 2026은 평년
    const result = calculateAge({ birthDate: "2000-02-29", referenceDate: "2026-01-01" });
    expect(result.nextBirthdayDate).toBe("2026-03-01");
  });

  it("2월 29일생 윤년 — 다음 생일이 2월 29일", () => {
    // 2028은 윤년
    const result = calculateAge({ birthDate: "2000-02-29", referenceDate: "2028-01-01" });
    expect(result.nextBirthdayDate).toBe("2028-02-29");
  });

  it("nextBirthdayDate 형식은 YYYY-MM-DD", () => {
    const result = calculateAge({ birthDate: "1990-06-15", referenceDate: "2026-04-23" });
    expect(result.nextBirthdayDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
