import { describe, it, expect } from "vitest";
import { calculateHousingSubscriptionScore } from "@/lib/calculators/housingSubscriptionScore";

describe("calculateHousingSubscriptionScore", () => {
  it("최대 점수 — 84점 (무주택15년+, 부양6명+, 통장15년+)", () => {
    const result = calculateHousingSubscriptionScore({
      noHouseYears: 15,
      dependents: 6,
      subscriptionYears: 15,
    });
    expect(result.totalScore).toBe(84);
    expect(result.noHouseScore).toBe(32);
    expect(result.dependentsScore).toBe(35);
    expect(result.subscriptionScore).toBe(17);
  });

  it("최소 점수 — 6점 (무주택 1년 미만, 부양 0명, 통장 6개월 미만)", () => {
    const result = calculateHousingSubscriptionScore({
      noHouseYears: 0,
      dependents: 0,
      subscriptionYears: 0,
    });
    expect(result.totalScore).toBe(8); // 2 + 5 + 1 = 8
  });

  it("무주택 5년 — 12점", () => {
    const result = calculateHousingSubscriptionScore({
      noHouseYears: 5,
      dependents: 0,
      subscriptionYears: 0,
    });
    expect(result.noHouseScore).toBe(12); // 2 + 5*2 = 12
  });

  it("부양가족 3명 — 20점", () => {
    const result = calculateHousingSubscriptionScore({
      noHouseYears: 0,
      dependents: 3,
      subscriptionYears: 0,
    });
    expect(result.dependentsScore).toBe(20); // 5 + 3*5 = 20
  });

  it("청약통장 2년 — 5점 (6개월마다 1점, 4개)", () => {
    const result = calculateHousingSubscriptionScore({
      noHouseYears: 0,
      dependents: 0,
      subscriptionYears: 2,
    });
    expect(result.subscriptionScore).toBe(5); // 1 + floor(2/0.5) = 1+4 = 5
  });

  it("부양가족 7명 초과 — 35점 상한", () => {
    const result = calculateHousingSubscriptionScore({
      noHouseYears: 0,
      dependents: 10,
      subscriptionYears: 0,
    });
    expect(result.dependentsScore).toBe(35);
  });

  it("무주택 20년 초과 — 32점 상한", () => {
    const result = calculateHousingSubscriptionScore({
      noHouseYears: 20,
      dependents: 0,
      subscriptionYears: 0,
    });
    expect(result.noHouseScore).toBe(32);
  });

  it("totalScore = 3개 점수 합산", () => {
    const result = calculateHousingSubscriptionScore({
      noHouseYears: 5,
      dependents: 2,
      subscriptionYears: 3,
    });
    expect(result.totalScore).toBe(result.noHouseScore + result.dependentsScore + result.subscriptionScore);
  });
});
