import { describe, it, expect } from "vitest";
import { calculateAreaConverter } from "@/lib/calculators/areaConverter";

describe("calculateAreaConverter", () => {
  it("TC-28-1: 10평 → 33.06㎡", () => {
    const result = calculateAreaConverter({ value: 10, unit: "pyeong" });
    expect(result.pyeong).toBe(10);
    expect(result.sqm).toBe(33.06);
  });

  it("TC-28-2: 100㎡ → 30.25평", () => {
    const result = calculateAreaConverter({ value: 100, unit: "sqm" });
    expect(result.sqm).toBe(100);
    expect(result.pyeong).toBe(30.25);
  });

  it("TC-28-3: 1평 → 3.31㎡", () => {
    const result = calculateAreaConverter({ value: 1, unit: "pyeong" });
    expect(result.sqm).toBe(3.31);
  });

  it("TC-28-4: 제곱피트 환산 확인 (10평 → 약 355.86 sqft)", () => {
    const result = calculateAreaConverter({ value: 10, unit: "pyeong" });
    // 33.0579 × 10.7639 ≈ 355.86
    expect(result.sqft).toBeGreaterThan(355);
    expect(result.sqft).toBeLessThan(360);
  });

  it("TC-28-5: 0 입력 시 모두 0", () => {
    const result = calculateAreaConverter({ value: 0, unit: "pyeong" });
    expect(result.pyeong).toBe(0);
    expect(result.sqm).toBe(0);
    expect(result.sqft).toBe(0);
  });

  it("TC-28-6: inputUnit 반환 확인", () => {
    const result = calculateAreaConverter({ value: 25, unit: "sqm" });
    expect(result.inputUnit).toBe("sqm");
    expect(result.inputValue).toBe(25);
  });
});
