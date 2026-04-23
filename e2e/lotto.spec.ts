import { test, expect } from "@playwright/test";

test.describe("로또 번호 생성기", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lotto");
  });

  test("페이지 제목 렌더", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "로또 번호 생성기" })).toBeVisible();
  });

  test("번호 생성 — 결과 섹션 표시", async ({ page }) => {
    await page.getByRole("button", { name: "번호 생성하기" }).click();
    await expect(page.getByRole("button", { name: "다시 뽑기" })).toBeVisible();
  });

  test("다시 뽑기 버튼 동작", async ({ page }) => {
    await page.getByRole("button", { name: "번호 생성하기" }).click();
    await expect(page.getByRole("button", { name: "다시 뽑기" })).toBeVisible();
    await page.getByRole("button", { name: "다시 뽑기" }).click();
    await expect(page.getByRole("button", { name: "다시 뽑기" })).toBeVisible();
  });

  test("고정 번호 오류 — 6개 초과 시 에러 메시지", async ({ page }) => {
    await page.getByPlaceholder("예: 7, 14, 21").fill("1 2 3 4 5 6");
    await page.getByRole("button", { name: "번호 생성하기" }).click();
    // 에러 메시지 p 태그 — red-500 색상으로 구분
    await expect(page.locator("p.text-red-500")).toBeVisible();
    await expect(page.locator("p.text-red-500")).toContainText("최대 5개");
  });

  test("공 색상 범례 표시", async ({ page }) => {
    await page.getByRole("button", { name: "번호 생성하기" }).click();
    await expect(page.getByText("1~10")).toBeVisible();
    await expect(page.getByText("11~20")).toBeVisible();
  });
});
