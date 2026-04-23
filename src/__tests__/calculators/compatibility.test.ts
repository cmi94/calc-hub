import { describe, it, expect } from "vitest";
import { calculateCompatibility } from "@/lib/calculators/compatibility";

describe("calculateCompatibility", () => {
  it("TC-31-1: 결과 score는 0~100 범위", () => {
    const result = calculateCompatibility({ name1: "홍길동", name2: "이순신" });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("TC-31-2: 동일 입력 → 동일 결과 (결정적)", () => {
    const r1 = calculateCompatibility({ name1: "김철수", name2: "박영희" });
    const r2 = calculateCompatibility({ name1: "김철수", name2: "박영희" });
    expect(r1.score).toBe(r2.score);
    expect(r1.label).toBe(r2.label);
  });

  it("TC-31-3: 순서 무관 — (A,B)와 (B,A)의 score 동일", () => {
    const r1 = calculateCompatibility({ name1: "김철수", name2: "박영희" });
    const r2 = calculateCompatibility({ name1: "박영희", name2: "김철수" });
    expect(r1.score).toBe(r2.score);
  });

  it("TC-31-4: strokes1, strokes2 > 0", () => {
    const result = calculateCompatibility({ name1: "가나", name2: "다라" });
    expect(result.strokes1).toBeGreaterThan(0);
    expect(result.strokes2).toBeGreaterThan(0);
  });

  it("TC-31-5: label과 description이 비어있지 않음", () => {
    const result = calculateCompatibility({ name1: "테스트", name2: "검증용" });
    expect(result.label.length).toBeGreaterThan(0);
    expect(result.description.length).toBeGreaterThan(0);
  });

  it("TC-31-6: lovePoints는 5개, 각각 0~100", () => {
    const result = calculateCompatibility({ name1: "김민준", name2: "이서연" });
    expect(result.lovePoints).toHaveLength(5);
    result.lovePoints.forEach((p) => {
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(100);
    });
  });
});
