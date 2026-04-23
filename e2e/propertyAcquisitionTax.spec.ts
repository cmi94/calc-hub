import { test, expect } from "@playwright/test";

test.describe("부동산 취득세 계산기", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/property-acquisition-tax");
  });

  test("페이지 제목 렌더", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "부동산 취득세 계산기" })).toBeVisible();
  });

  test("1주택 5억 — 취득세 1%", async ({ page }) => {
    await page.getByPlaceholder("예: 500,000,000").fill("500000000");
    await page.getByRole("button", { name: "1주택" }).click();
    await page.locator('input[type="number"]').fill("84");
    await page.getByRole("button", { name: "계산하기" }).click();

    await expect(page.getByText("취득세율 1.00%")).toBeVisible();
    await expect(page.getByText("5,000,000원")).toBeVisible();
  });

  test("조정대상지역 토글 — 버튼이 컨테이너 안에 있어야 함", async ({ page }) => {
    // 2주택 선택 시 토글 표시
    await page.getByRole("button", { name: "2주택" }).click();

    const toggle = page.locator("button[class*='rounded-full']").first();
    await expect(toggle).toBeVisible();

    // 토글 버튼의 bounding box가 부모 요소 안에 포함되는지 확인
    const toggleBox = await toggle.boundingBox();
    const parentBox = await toggle.locator("..").boundingBox();

    expect(toggleBox).not.toBeNull();
    expect(parentBox).not.toBeNull();

    if (toggleBox && parentBox) {
      // 토글 우측 끝이 부모 우측 끝보다 크지 않아야 함 (overflow 없음)
      expect(toggleBox.x + toggleBox.width).toBeLessThanOrEqual(parentBox.x + parentBox.width + 1);
    }
  });

  test("2주택 조정지역 — 취득세 8%", async ({ page }) => {
    await page.getByPlaceholder("예: 500,000,000").fill("500000000");
    await page.getByRole("button", { name: "2주택" }).click();
    // 조정대상지역 토글 ON
    await page.locator("button[class*='rounded-full']").first().click();
    await page.locator('input[type="number"]').fill("84");
    await page.getByRole("button", { name: "계산하기" }).click();

    await expect(page.getByText("취득세율 8.00%")).toBeVisible();
  });

  test("전용 85㎡ 초과 — 농어촌특별세 부과", async ({ page }) => {
    await page.getByPlaceholder("예: 500,000,000").fill("500000000");
    await page.getByRole("button", { name: "1주택" }).click();
    await page.locator('input[type="number"]').fill("90");
    await page.getByRole("button", { name: "계산하기" }).click();

    // 농어촌특별세가 0이 아니어야 함
    const ruralTaxRow = page.getByText("농어촌특별세").first();
    await expect(ruralTaxRow).toBeVisible();
    // "취득세 × 20%" 텍스트 확인
    await expect(page.getByText(/취득세 × 20%/)).toBeVisible();
  });
});
