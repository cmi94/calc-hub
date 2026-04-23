import { test, expect } from "@playwright/test";

test.describe("나이 계산기", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/age");
  });

  test("페이지 제목 렌더", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "나이 계산기" })).toBeVisible();
  });

  test("생년월일 입력 후 만나이 표시", async ({ page }) => {
    await page.locator('input[type="date"]').first().fill("1990-04-23");
    await page.getByRole("button", { name: "계산하기" }).click();

    // 결과 카드의 만나이 레이블 (exact: true로 중복 방지)
    await expect(page.getByText("만나이", { exact: true }).first()).toBeVisible();
    // 숫자+세 형식
    await expect(page.getByText(/^\d+세$/).first()).toBeVisible();
  });

  test("한국 나이는 만나이보다 크거나 같음", async ({ page }) => {
    await page.locator('input[type="date"]').first().fill("1990-06-15");
    await page.getByRole("button", { name: "계산하기" }).click();

    const ages = await page.getByText(/^\d+세$/).allTextContents();
    const nums = ages.map((t) => parseInt(t, 10)).filter((n) => !isNaN(n));
    // 만나이(0) ≤ 한국나이(1)
    if (nums.length >= 2) {
      expect(nums[0]).toBeLessThanOrEqual(nums[1]);
    }
  });

  test("다음 생일까지 일수 표시", async ({ page }) => {
    await page.locator('input[type="date"]').first().fill("1990-12-25");
    await page.getByRole("button", { name: "계산하기" }).click();

    await expect(page.getByText(/일 후|오늘이 생일/)).toBeVisible();
  });
});
