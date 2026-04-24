import { describe, it, expect } from "vitest";
import { calculateMilitaryDischarge, addMonths, SERVICE_PERIODS } from "@/lib/calculators/militaryDischarge";

describe("addMonths", () => {
  it("일반적인 월 추가", () => {
    const date = new Date("2025-01-01");
    const result = addMonths(date, 18);
    expect(result.toISOString().slice(0, 10)).toBe("2026-07-01");
  });

  it("말일 조정: 1월 31일 + 1개월 → 2월 말일", () => {
    const date = new Date("2024-01-31");
    const result = addMonths(date, 1);
    // 2024년은 윤년: 2월 29일
    expect(result.toISOString().slice(0, 10)).toBe("2024-02-29");
  });
});

describe("calculateMilitaryDischarge", () => {
  it("TC-27-1: 육군 2025-01-01 입대 → 전역일 2026-07-01", () => {
    const result = calculateMilitaryDischarge({
      enlistmentDate: "2025-01-01",
      branchKey: "army",
      today: "2026-04-23",
    });
    expect(result.dischargeDate).toBe("2026-07-01");
    expect(result.branchLabel).toBe("육군·해병대");
  });

  it("TC-27-2: 복무 진행률 계산", () => {
    const result = calculateMilitaryDischarge({
      enlistmentDate: "2025-01-01",
      branchKey: "army",
      today: "2026-04-23",
    });
    // 총복무일수 18개월 ≈ 547일
    // 복무한 일수: 2025-01-01 ~ 2026-04-23 = 477일
    expect(result.progressPct).toBeGreaterThan(80);
    expect(result.progressPct).toBeLessThan(100);
  });

  it("TC-27-3: 전역 완료 여부 — 전역 전", () => {
    const result = calculateMilitaryDischarge({
      enlistmentDate: "2025-01-01",
      branchKey: "army",
      today: "2026-04-23",
    });
    expect(result.isCompleted).toBe(false);
  });

  it("TC-27-4: 전역 완료 여부 — 전역 후", () => {
    const result = calculateMilitaryDischarge({
      enlistmentDate: "2025-01-01",
      branchKey: "army",
      today: "2026-08-01",
    });
    expect(result.isCompleted).toBe(true);
    expect(result.progressPct).toBe(100);
    expect(result.daysRemaining).toBe(0);
  });

  it("TC-27-5: 공군 복무기간 21개월", () => {
    expect(SERVICE_PERIODS.airforce.months).toBe(21);
    const result = calculateMilitaryDischarge({
      enlistmentDate: "2025-01-01",
      branchKey: "airforce",
      today: "2026-04-23",
    });
    expect(result.dischargeDate).toBe("2026-10-01");
  });

  it("TC-27-6: 전문연구요원 36개월", () => {
    expect(SERVICE_PERIODS.research.months).toBe(36);
  });
});
