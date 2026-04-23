import { describe, it, expect } from "vitest";
import { calculateBmi, getBmiCategory } from "@/lib/calculators/bmi";

describe("calculateBmi", () => {
  it("TC-22-1: 키 170cm, 몸무게 65kg → BMI 약 22.5 (정상)", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 65 });
    expect(result.bmi).toBeCloseTo(22.5, 0);
    expect(result.category).toBe("normal");
    expect(result.categoryLabel).toBe("정상");
  });

  it("TC-22-2: 키 170cm, 몸무게 45kg → 저체중", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 45 });
    expect(result.bmi).toBeLessThan(18.5);
    expect(result.category).toBe("underweight");
  });

  it("TC-22-3: 키 170cm, 몸무게 80kg → 비만 1단계 (BMI ~27.7)", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 80 });
    expect(result.bmi).toBeGreaterThanOrEqual(25);
    expect(result.bmi).toBeLessThan(30);
    expect(result.category).toBe("obese1");
  });

  it("TC-22-4: 적정 체중 범위 계산", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 65 });
    // 170cm 기준: 18.5*(1.7²)~22.9*(1.7²) = 53.5~66.2
    expect(result.idealWeightMin).toBeCloseTo(53.5, 0);
    expect(result.idealWeightMax).toBeCloseTo(66.2, 0);
  });

  it("TC-22-5: 정상 범위일 때 weightDiff = 0", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 60 });
    expect(result.weightDiff).toBe(0);
  });

  it("TC-22-6: 과체중일 때 weightDiff > 0", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 80 });
    expect(result.weightDiff).toBeGreaterThan(0);
  });

  it("BMI 경계값: 18.5 → 정상", () => {
    expect(getBmiCategory(18.5)).toBe("normal");
  });

  it("BMI 경계값: 23.0 → 과체중", () => {
    expect(getBmiCategory(23.0)).toBe("overweight");
  });

  it("BMI 경계값: 25.0 → 비만 1단계", () => {
    expect(getBmiCategory(25.0)).toBe("obese1");
  });

  it("BMI 경계값: 35.0 → 고도비만", () => {
    expect(getBmiCategory(35.0)).toBe("obese3");
  });
});
