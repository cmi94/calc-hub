import { describe, it, expect } from "vitest";
import { calculateDailyFortune } from "@/lib/calculators/dailyFortune";

describe("calculateDailyFortune", () => {
  const input = { birthDate: "1990-04-23", referenceDate: "2026-04-23" };

  it("luckyScore는 1~100 사이", () => {
    const result = calculateDailyFortune(input);
    expect(result.luckyScore).toBeGreaterThanOrEqual(1);
    expect(result.luckyScore).toBeLessThanOrEqual(100);
  });

  it("luckyNumbers는 3개", () => {
    const result = calculateDailyFortune(input);
    expect(result.luckyNumbers).toHaveLength(3);
  });

  it("luckyNumbers는 1~45 범위", () => {
    const result = calculateDailyFortune(input);
    result.luckyNumbers.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(45);
    });
  });

  it("luckyNumbers는 중복 없음", () => {
    const result = calculateDailyFortune(input);
    const unique = new Set(result.luckyNumbers);
    expect(unique.size).toBe(3);
  });

  it("luckyNumbers는 오름차순 정렬", () => {
    const result = calculateDailyFortune(input);
    const sorted = [...result.luckyNumbers].sort((a, b) => a - b);
    expect(result.luckyNumbers).toEqual(sorted);
  });

  it("동일 입력은 동일 결과 (결정론적)", () => {
    const r1 = calculateDailyFortune(input);
    const r2 = calculateDailyFortune(input);
    expect(r1.luckyScore).toBe(r2.luckyScore);
    expect(r1.luckyNumbers).toEqual(r2.luckyNumbers);
    expect(r1.luckyColor).toBe(r2.luckyColor);
  });

  it("다른 날짜는 다른 결과가 나올 수 있음", () => {
    const r1 = calculateDailyFortune({ birthDate: "1990-04-23", referenceDate: "2026-04-23" });
    const r2 = calculateDailyFortune({ birthDate: "1990-04-23", referenceDate: "2026-04-24" });
    // 같을 수도 있지만 대부분 다름 — score 또는 numbers 중 하나가 달라야 함
    const same = r1.luckyScore === r2.luckyScore && JSON.stringify(r1.luckyNumbers) === JSON.stringify(r2.luckyNumbers);
    expect(same).toBe(false);
  });

  it("message는 빈 문자열이 아님", () => {
    const result = calculateDailyFortune(input);
    expect(result.message.length).toBeGreaterThan(0);
  });

  it("luckyColorHex는 # 으로 시작하는 색상 코드", () => {
    const result = calculateDailyFortune(input);
    expect(result.luckyColorHex).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });
});
