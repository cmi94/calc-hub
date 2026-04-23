import { describe, it, expect } from "vitest";
import { recommendRandomMenu, getMenuPool } from "@/lib/calculators/randomMenu";

describe("recommendRandomMenu", () => {
  it("TC-32-1: 한식 카테고리 → 한식 메뉴", () => {
    const result = recommendRandomMenu("korean");
    const pool = getMenuPool("korean");
    expect(pool).toContain(result.menu);
    expect(result.category).toBe("korean");
    expect(result.categoryLabel).toBe("한식");
  });

  it("TC-32-2: 랜덤 카테고리 → menu 비어있지 않음", () => {
    const result = recommendRandomMenu("random");
    expect(result.menu.length).toBeGreaterThan(0);
  });

  it("TC-32-3: 카테고리별 메뉴 풀이 비어있지 않음", () => {
    const categories = ["korean", "chinese", "japanese", "western", "snack", "fast", "cafe"] as const;
    categories.forEach((cat) => {
      expect(getMenuPool(cat).length).toBeGreaterThan(0);
    });
  });

  it("TC-32-4: 여러 번 호출해도 유효한 메뉴 반환", () => {
    for (let i = 0; i < 10; i++) {
      const result = recommendRandomMenu("chinese");
      const pool = getMenuPool("chinese");
      expect(pool).toContain(result.menu);
    }
  });

  it("TC-32-5: suggestion 텍스트가 비어있지 않음", () => {
    const result = recommendRandomMenu("japanese");
    expect(result.suggestion.length).toBeGreaterThan(0);
  });
});
