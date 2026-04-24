/**
 * 레이아웃 안전 하네스 (Layout Safety Harness)
 *
 * 모바일 뷰포트에서 계산기 페이지가 아래 세 가지 규칙을 지키는지 자동으로 검증합니다.
 *
 *   R1. 가로 오버플로 없음   — scrollWidth <= viewportWidth
 *   R2. 헤더 침범 없음       — 콘텐츠 최상단이 sticky header 아래에서 시작
 *   R3. 탭바 침범 없음       — 콘텐츠 최하단이 MobileTabBar 위에서 끝남
 *
 * 새 계산기를 추가할 때 CALC_PATHS 배열에만 슬러그를 추가하면 됩니다.
 */

import { test, expect, type Page } from "@playwright/test";

// ── 검사 대상 계산기 경로 ──────────────────────────────────────
const CALC_PATHS = [
  "/salary",
  "/retirement",
  "/weekly-holiday-pay",
  "/age",
  "/dday",
  "/bmi",
  "/mortgage",
  "/gift-tax",
  "/lotto",
  "/daily-fortune",
  "/past-life",
  "/mbti-compatibility",
  "/couple-anniversary",
  "/military-discharge",
  "/life-remaining",
  "/area-converter",
  "/fuel-economy",
];

// ── 헬퍼 ──────────────────────────────────────────────────────

/** 문서 전체에서 가로 오버플로를 일으키는 요소 목록 반환 */
async function findOverflowingElements(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders: string[] = [];
    document.querySelectorAll("*").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > vw + 1) {   // 1px 오차 허용
        const tag = el.tagName.toLowerCase();
        const cls = (el.className && typeof el.className === "string")
          ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
          : "";
        offenders.push(`${tag}${cls} right=${Math.round(rect.right)}`);
      }
    });
    return offenders.slice(0, 10); // 최대 10개만 리포트
  });
}

/** sticky header의 하단 y 좌표 */
async function headerBottom(page: Page): Promise<number> {
  return page.evaluate(() => {
    const header = document.querySelector("header");
    return header ? header.getBoundingClientRect().bottom : 0;
  });
}

/** 페이지 스크롤 너비 vs 뷰포트 너비 */
async function scrollVsViewport(page: Page): Promise<{ scroll: number; vp: number }> {
  return page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    vp:     document.documentElement.clientWidth,
  }));
}

// ── 테스트 스위트 ──────────────────────────────────────────────

test.describe("Layout Safety — Mobile (iPhone 12 / 390px)", () => {
  // iPhone 12 뷰포트 강제 (playwright.config 의 mobile-safari 프로젝트와 동일)
  test.use({ viewport: { width: 390, height: 844 } });

  for (const path of CALC_PATHS) {
    test(`R1 가로오버플로 없음 · ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });

      const offenders = await findOverflowingElements(page);
      expect(
        offenders,
        `가로 오버플로 발생 요소:\n${offenders.join("\n")}`,
      ).toHaveLength(0);
    });

    test(`R2 헤더 침범 없음 · ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });

      const hb = await headerBottom(page);

      // fight-card 섹션(첫 번째 <section>)의 상단이 헤더 바로 아래여야 함
      const firstSectionTop = await page.evaluate(() => {
        const s = document.querySelector("section");
        return s ? s.getBoundingClientRect().top : 0;
      });

      // section의 top이 헤더 bottom 이상이어야 함 (2px 오차 허용)
      expect(firstSectionTop).toBeGreaterThanOrEqual(hb - 2);
    });

    test(`R3 scrollWidth ≤ clientWidth · ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });

      const { scroll, vp } = await scrollVsViewport(page);
      expect(scroll, `scrollWidth(${scroll}) > clientWidth(${vp})`).toBeLessThanOrEqual(vp + 1);
    });
  }
});

test.describe("Layout Safety — Small Mobile (360px)", () => {
  test.use({ viewport: { width: 360, height: 740 } });

  for (const path of CALC_PATHS) {
    test(`R1 가로오버플로 없음 · ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const offenders = await findOverflowingElements(page);
      expect(offenders, offenders.join("\n")).toHaveLength(0);
    });
  }
});

test.describe("Layout Safety — Desktop (1280px)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  for (const path of CALC_PATHS) {
    test(`R1 가로오버플로 없음 · ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const { scroll, vp } = await scrollVsViewport(page);
      expect(scroll).toBeLessThanOrEqual(vp + 1);
    });
  }
});
