import { test, expect } from "@playwright/test";

test.describe("연봉 실수령액 계산기", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/salary");
  });

  test("페이지 제목 렌더", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "연봉 실수령액 계산기" })).toBeVisible();
  });

  test("연봉 입력 후 월 실수령액 표시", async ({ page }) => {
    await page.getByPlaceholder("예: 40,000,000").fill("40000000");
    await page.getByRole("button", { name: "계산하기" }).click();

    await expect(page.getByText("월 실수령액").first()).toBeVisible();
    await expect(page.getByText(/\d{1,3}(,\d{3})+원/).first()).toBeVisible();
  });

  test("빈 입력 시 오류 메시지 표시", async ({ page }) => {
    await page.getByRole("button", { name: "계산하기" }).click();
    await expect(page.getByText(/입력/)).toBeVisible();
  });

  test("공제 내역 항목 — 4대보험 표시", async ({ page }) => {
    await page.getByPlaceholder("예: 40,000,000").fill("40000000");
    await page.getByRole("button", { name: "계산하기" }).click();

    await expect(page.getByText("국민연금")).toBeVisible();
    await expect(page.getByText("건강보험")).toBeVisible();
    await expect(page.getByText("고용보험")).toBeVisible();
  });
});
