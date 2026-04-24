import { describe, it, expect } from "vitest";
import { calculateDueDate } from "@/lib/calculators/dueDate";

describe("calculateDueDate", () => {
  it("TC-26-1: LMP 2026-01-01 → 출산예정일 2026-10-08 (280일 후)", () => {
    const result = calculateDueDate({ lmpDate: "2026-01-01", today: "2026-04-23" });
    expect(result.dueDate).toBe("2026-10-08");
  });

  it("TC-26-2: 임신 주수 계산 (2026-01-01 기준, 오늘 2026-04-23)", () => {
    const result = calculateDueDate({ lmpDate: "2026-01-01", today: "2026-04-23" });
    // 2026-01-01 ~ 2026-04-23: 112일 → 16주
    expect(result.gestationalWeeks).toBe(16);
    expect(result.gestationalDays).toBe(112);
  });

  it("TC-26-3: 임신 2분기 (16주)", () => {
    const result = calculateDueDate({ lmpDate: "2026-01-01", today: "2026-04-23" });
    expect(result.trimester).toBe(2);
    expect(result.trimesterName).toBe("임신 2분기");
  });

  it("TC-26-4: 임신 1분기 (13주 이하)", () => {
    const result = calculateDueDate({ lmpDate: "2026-02-01", today: "2026-04-23" });
    // 2026-02-01 ~ 2026-04-23: 81일 → 11주
    expect(result.trimester).toBe(1);
    expect(result.trimesterName).toBe("임신 1분기");
  });

  it("TC-26-5: 임신 3분기 (28주 이상)", () => {
    const result = calculateDueDate({ lmpDate: "2025-10-01", today: "2026-04-23" });
    // 약 29주
    expect(result.trimester).toBe(3);
    expect(result.trimesterName).toBe("임신 3분기");
  });

  it("TC-26-6: daysUntilDue — 출산예정일 이후 음수 가능", () => {
    const result = calculateDueDate({ lmpDate: "2025-01-01", today: "2026-04-23" });
    expect(result.daysUntilDue).toBeLessThan(0);
  });

  it("TC-26-7: dueDateFormatted 형식 확인", () => {
    const result = calculateDueDate({ lmpDate: "2026-01-01", today: "2026-04-23" });
    expect(result.dueDateFormatted).toBe("2026년 10월 8일");
  });
});
