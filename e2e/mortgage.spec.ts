import { test, expect } from "@playwright/test";

test.describe("주택담보대출 계산기", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/mortgage");
  });

  test("페이지 제목 렌더", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "주택담보대출 이자 계산기" })).toBeVisible();
  });

  test("계산 결과 — 월 상환액 표시", async ({ page }) => {
    await page.getByPlaceholder("예: 300,000,000").fill("300000000");
    await page.locator('input[type="number"]').fill("4");
    await page.getByRole("button", { name: "계산하기" }).click();

    // 결과 카드의 월 상환액 레이블 (첫 번째)
    await expect(page.getByText("월 상환액").first()).toBeVisible();
    await expect(page.getByText(/\d{1,3}(,\d{3})+원/).first()).toBeVisible();
  });

  test("연도별 스케줄 — 연도가 정수(n년차)로 표시", async ({ page }) => {
    await page.getByPlaceholder("예: 300,000,000").fill("100000000");
    await page.locator('input[type="number"]').fill("4");
    await page.getByRole("button", { name: "계산하기" }).click();
    await page.getByRole("button", { name: /연도별/ }).click();

    // "1년차" 형식 셀이 있어야 함
    await expect(page.getByRole("cell", { name: "1년차", exact: true })).toBeVisible();

    // 소수점 포함된 연도(예: 0.083년차)가 없어야 함
    const decimalYear = page.getByRole("cell", { name: /\d+\.\d+년차/ });
    await expect(decimalYear).toHaveCount(0);
  });
});
