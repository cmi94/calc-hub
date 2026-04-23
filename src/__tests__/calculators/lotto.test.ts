import { describe, it, expect } from "vitest";
import { generateLotto, getBallColor } from "@/lib/calculators/lotto";

describe("generateLotto", () => {
  // TC-15-1: 6개, 1~45, 중복 없음, 오름차순
  it("TC-15-1: 번호 6개, 1~45, 중복 없음, 오름차순", () => {
    const result = generateLotto({ setCount: 1 });
    const numbers = result.sets[0].numbers;
    expect(numbers).toHaveLength(6);
    numbers.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(45);
    });
    const unique = new Set(numbers);
    expect(unique.size).toBe(6);
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
  });

  it("setCount만큼 게임 세트 생성", () => {
    const result = generateLotto({ setCount: 5 });
    expect(result.sets).toHaveLength(5);
  });

  it("setCount 10 이하로 제한", () => {
    const result = generateLotto({ setCount: 20 });
    expect(result.sets).toHaveLength(10);
  });

  it("고정 번호는 반드시 포함", () => {
    const fixed = [7, 14, 21];
    const result = generateLotto({ setCount: 5, fixedNumbers: fixed });
    result.sets.forEach((set) => {
      fixed.forEach((n) => expect(set.numbers).toContain(n));
    });
  });

  it("제외 번호는 결과에 없음", () => {
    const exclude = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = generateLotto({ setCount: 5, excludeNumbers: exclude });
    result.sets.forEach((set) => {
      set.numbers.forEach((n) => expect(exclude).not.toContain(n));
    });
  });

  it("고정 + 제외 동시 적용", () => {
    const fixed = [11, 22, 33];
    const exclude = [1, 2, 3];
    const result = generateLotto({ setCount: 3, fixedNumbers: fixed, excludeNumbers: exclude });
    result.sets.forEach((set) => {
      fixed.forEach((n) => expect(set.numbers).toContain(n));
      exclude.forEach((n) => expect(set.numbers).not.toContain(n));
      expect(set.numbers).toHaveLength(6);
    });
  });
});

describe("getBallColor", () => {
  it("1~10 노란색", () => expect(getBallColor(1)).toBe("#FFC107"));
  it("11~20 파란색", () => expect(getBallColor(15)).toBe("#2196F3"));
  it("21~30 빨간색", () => expect(getBallColor(25)).toBe("#F44336"));
  it("31~40 회색", () => expect(getBallColor(35)).toBe("#9E9E9E"));
  it("41~45 초록색", () => expect(getBallColor(45)).toBe("#4CAF50"));
});
