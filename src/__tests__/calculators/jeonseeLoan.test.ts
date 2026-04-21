import { describe, it, expect } from "vitest";
import { calculateJeonseLoan } from "@/lib/calculators/jeonseeLoan";

describe("calculateJeonseLoan", () => {
  it("월 이자 = 대출금액 × 연금리 / 12", () => {
    const result = calculateJeonseLoan({ loanAmount: 200_000_000, annualRate: 3.0, termYears: 2 });
    expect(result.monthlyInterest).toBe(Math.round(200_000_000 * 0.03 / 12));
  });

  it("총 이자 = 월 이자 × 기간(개월)", () => {
    const result = calculateJeonseLoan({ loanAmount: 200_000_000, annualRate: 3.0, termYears: 2 });
    expect(result.totalInterest).toBe(result.monthlyInterest * 24);
  });

  it("연 이자 = 월 이자 × 12", () => {
    const result = calculateJeonseLoan({ loanAmount: 200_000_000, annualRate: 3.0, termYears: 2 });
    expect(result.annualInterest).toBe(result.monthlyInterest * 12);
  });

  it("금리가 높을수록 월 이자가 크다", () => {
    const low = calculateJeonseLoan({ loanAmount: 200_000_000, annualRate: 2.0, termYears: 2 });
    const high = calculateJeonseLoan({ loanAmount: 200_000_000, annualRate: 4.0, termYears: 2 });
    expect(high.monthlyInterest).toBeGreaterThan(low.monthlyInterest);
  });

  it("대출금액이 클수록 월 이자가 크다", () => {
    const small = calculateJeonseLoan({ loanAmount: 100_000_000, annualRate: 3.0, termYears: 2 });
    const large = calculateJeonseLoan({ loanAmount: 300_000_000, annualRate: 3.0, termYears: 2 });
    expect(large.monthlyInterest).toBeGreaterThan(small.monthlyInterest);
  });
});
