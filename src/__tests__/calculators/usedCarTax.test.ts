import { describe, it, expect } from "vitest";
import { calculateUsedCarTax } from "@/lib/calculators/usedCarTax";

describe("calculateUsedCarTax", () => {
  it("승용차 2,000만원 — 취득세 7%, 지방교육세 20% 적용", () => {
    const result = calculateUsedCarTax({ price: 20_000_000, vehicleType: "passenger" });
    expect(result.acquisitionTax).toBe(1_400_000); // 20,000,000 × 7%
    expect(result.localEduTax).toBe(280_000);       // 1,400,000 × 20%
    expect(result.totalTax).toBe(1_680_000);
  });

  it("승합차·화물차는 취득세 5% 적용", () => {
    const van = calculateUsedCarTax({ price: 20_000_000, vehicleType: "van" });
    const truck = calculateUsedCarTax({ price: 20_000_000, vehicleType: "truck" });
    expect(van.acquisitionTax).toBe(1_000_000);
    expect(truck.acquisitionTax).toBe(1_000_000);
  });

  it("전기차는 취득세에서 140만원 감면", () => {
    const result = calculateUsedCarTax({ price: 20_000_000, vehicleType: "electric" });
    // 20,000,000 × 7% = 1,400,000 - 1,400,000 = 0
    expect(result.acquisitionTax).toBe(0);
    expect(result.totalTax).toBe(0);
  });

  it("고가 전기차는 감면 후 잔여 취득세가 남는다", () => {
    const result = calculateUsedCarTax({ price: 60_000_000, vehicleType: "electric" });
    // 60,000,000 × 7% = 4,200,000 - 1,400,000 = 2,800,000
    expect(result.acquisitionTax).toBe(2_800_000);
    expect(result.totalTax).toBeGreaterThan(0);
  });

  it("총 납부세액 = 취득세 + 지방교육세", () => {
    const result = calculateUsedCarTax({ price: 15_000_000, vehicleType: "passenger" });
    expect(result.totalTax).toBe(result.acquisitionTax + result.localEduTax);
  });
});
