import { describe, it, expect } from "vitest";
import { calculateMortgage } from "@/lib/calculators/mortgage";

describe("calculateMortgage", () => {
  it("총 상환액 = 월 상환액 × 총 개월수", () => {
    const result = calculateMortgage({ loanAmount: 300_000_000, annualRate: 4.5, termYears: 30 });
    expect(result.totalPayment).toBe(result.monthlyPayment * 30 * 12);
  });

  it("총 이자 = 총 상환액 - 대출금액", () => {
    const result = calculateMortgage({ loanAmount: 300_000_000, annualRate: 4.5, termYears: 30 });
    expect(result.totalInterest).toBe(result.totalPayment - 300_000_000);
  });

  it("금리가 높을수록 월 상환액이 크다", () => {
    const low = calculateMortgage({ loanAmount: 300_000_000, annualRate: 3.0, termYears: 30 });
    const high = calculateMortgage({ loanAmount: 300_000_000, annualRate: 5.0, termYears: 30 });
    expect(high.monthlyPayment).toBeGreaterThan(low.monthlyPayment);
  });

  it("기간이 길수록 월 상환액이 작다", () => {
    const short = calculateMortgage({ loanAmount: 300_000_000, annualRate: 4.5, termYears: 20 });
    const long = calculateMortgage({ loanAmount: 300_000_000, annualRate: 4.5, termYears: 30 });
    expect(long.monthlyPayment).toBeLessThan(short.monthlyPayment);
  });

  it("월별 스케줄 개수가 기간(개월)과 일치한다", () => {
    const result = calculateMortgage({ loanAmount: 300_000_000, annualRate: 4.5, termYears: 30 });
    expect(result.schedule.length).toBe(360);
  });

  it("마지막 달 잔금은 0이어야 한다", () => {
    const result = calculateMortgage({ loanAmount: 300_000_000, annualRate: 4.5, termYears: 30 });
    expect(result.schedule[result.schedule.length - 1].remainingBalance).toBe(0);
  });

  it("금리 0% — 월 상환액이 원금 ÷ 개월수", () => {
    const result = calculateMortgage({ loanAmount: 120_000_000, annualRate: 0, termYears: 10 });
    expect(result.monthlyPayment).toBe(1_000_000);
  });
});
