import { describe, it, expect } from "vitest";
import { calculateGiftTax } from "@/lib/calculators/giftTax";

describe("calculateGiftTax", () => {
  it("배우자 6억 이하 — 세금 0원", () => {
    const result = calculateGiftTax({
      giftAmount: 500_000_000,
      relation: "spouse",
      isMinor: false,
    });
    expect(result.finalTax).toBe(0);
  });

  it("직계존속 5천만 이하 — 세금 0원", () => {
    const result = calculateGiftTax({
      giftAmount: 50_000_000,
      relation: "lineal-ascend",
      isMinor: false,
    });
    expect(result.finalTax).toBe(0);
  });

  it("미성년 직계비속 공제 2천만원", () => {
    const result = calculateGiftTax({
      giftAmount: 30_000_000,
      relation: "lineal-descend",
      isMinor: true,
    });
    // 과세표준 = 3천만 - 2천만 = 1천만, 세율 10% = 100만, 신고공제 3% = 3만, 납부 97만
    expect(result.taxableAmount).toBe(10_000_000);
    expect(result.taxBeforeCredit).toBe(1_000_000);
    expect(result.finalTax).toBe(970_000);
  });

  it("직계비속 1억 증여 — 공제 5천만, 과세표준 5천만", () => {
    const result = calculateGiftTax({
      giftAmount: 100_000_000,
      relation: "lineal-descend",
      isMinor: false,
    });
    expect(result.taxableAmount).toBe(50_000_000);
    expect(result.taxBeforeCredit).toBe(5_000_000); // 5천만 × 10%
  });

  it("신고세액공제는 산출세액의 3%", () => {
    const result = calculateGiftTax({
      giftAmount: 100_000_000,
      relation: "lineal-descend",
      isMinor: false,
    });
    expect(result.taxCredit).toBe(Math.floor(result.taxBeforeCredit * 0.03));
  });

  it("타인 증여 — 공제 0원, 전액 과세", () => {
    const result = calculateGiftTax({
      giftAmount: 10_000_000,
      relation: "other",
      isMinor: false,
    });
    expect(result.deduction).toBe(0);
    expect(result.taxableAmount).toBe(10_000_000);
  });

  it("기타 친족 1천만 공제", () => {
    const result = calculateGiftTax({
      giftAmount: 10_000_000,
      relation: "other-relative",
      isMinor: false,
    });
    expect(result.finalTax).toBe(0);
  });

  it("finalTax = taxBeforeCredit - taxCredit", () => {
    const result = calculateGiftTax({
      giftAmount: 200_000_000,
      relation: "lineal-descend",
      isMinor: false,
    });
    expect(result.finalTax).toBe(result.taxBeforeCredit - result.taxCredit);
  });
});
