import { describe, it, expect } from "vitest";
import { calculateBrokerageFee } from "@/lib/calculators/brokerageFee";

describe("calculateBrokerageFee", () => {
  it("매매 5억 — 요율 0.4%, 한도 없음", () => {
    const result = calculateBrokerageFee({ transactionType: "buy-sell", price: 500_000_000 });
    expect(result.maxRate).toBe(0.004);
    expect(result.limitFee).toBeNull();
    expect(result.recommendedFee).toBe(Math.floor(500_000_000 * 0.004));
  });

  it("매매 3천만 — 요율 0.6%, 한도 25만 적용", () => {
    const result = calculateBrokerageFee({ transactionType: "buy-sell", price: 30_000_000 });
    expect(result.maxRate).toBe(0.006);
    expect(result.limitFee).toBe(250_000);
    expect(result.recommendedFee).toBe(180_000); // 30,000,000 * 0.006 = 180,000 < 250,000
  });

  it("매매 1억 — 요율 0.5%, 한도 80만 적용", () => {
    const result = calculateBrokerageFee({ transactionType: "buy-sell", price: 100_000_000 });
    expect(result.maxRate).toBe(0.005);
    expect(result.limitFee).toBe(800_000);
    expect(result.recommendedFee).toBe(500_000); // 100,000,000 * 0.005 = 500,000 < 800,000
  });

  it("전세 2억 — 요율 0.3%, 한도 없음", () => {
    const result = calculateBrokerageFee({ transactionType: "rent-jeonse", price: 200_000_000 });
    expect(result.maxRate).toBe(0.003);
    expect(result.limitFee).toBeNull();
    expect(result.recommendedFee).toBe(600_000);
  });

  it("전세 4천만 — 요율 0.5%, 한도 20만", () => {
    // 4천만은 5천만 미만 구간: 요율 0.5%, 한도 20만
    const result = calculateBrokerageFee({ transactionType: "rent-jeonse", price: 40_000_000 });
    expect(result.maxRate).toBe(0.005);
    expect(result.limitFee).toBe(200_000);
    expect(result.recommendedFee).toBe(200_000); // 40,000,000 * 0.005 = 200,000
  });

  it("월세 — 환산가 = 보증금 + 월세 × 100", () => {
    const result = calculateBrokerageFee({
      transactionType: "rent-monthly",
      price: 10_000_000,
      monthlyRent: 500_000,
    });
    expect(result.effectivePrice).toBe(10_000_000 + 500_000 * 100);
  });

  it("매매 10억 — 요율 0.9%", () => {
    const result = calculateBrokerageFee({ transactionType: "buy-sell", price: 1_000_000_000 });
    expect(result.maxRate).toBe(0.009);
  });
});
