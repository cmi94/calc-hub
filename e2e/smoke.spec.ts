/**
 * 스모크 테스트 — 전체 라우트 HTTP 200 확인
 *
 * 새 페이지를 추가하거나 라우트 구조가 바뀔 때 ROUTES 배열에 경로를 추가하세요.
 * 이 테스트가 실패하면 404가 발생한다는 의미입니다.
 */

import { test, expect } from "@playwright/test";

const ROUTES = [
  // ── 정적 페이지 ────────────────────────────────────────────
  "/",
  "/about",
  "/privacy",
  "/terms",
  "/contact",

  // ── 카테고리 ──────────────────────────────────────────────
  "/category",
  "/category/labor",
  "/category/tax",
  "/category/finance",
  "/category/realestate",
  "/category/life",
  "/category/fun",

  // ── 모바일 탭바 링크 ────────────────────────────────────────
  "/search",
  "/favorites",
  "/horoscope-daily",

  // ── 근로 계산기 ──────────────────────────────────────────
  "/salary",
  "/retirement",
  "/weekly-holiday-pay",
  "/hourly-wage",
  "/unemployment-benefit",

  // ── 세금 계산기 ──────────────────────────────────────────
  "/income-tax",
  "/gift-tax",
  "/capital-gains-tax",
  "/year-end-tax",
  "/inheritance-tax",

  // ── 대출·금융 계산기 ─────────────────────────────────────
  "/mortgage",
  "/jeonse-loan",
  "/car-installment",

  // ── 부동산 계산기 ────────────────────────────────────────
  "/property-acquisition-tax",
  "/brokerage-fee",
  "/housing-subscription-score",
  "/registration-cost",
  "/area-converter",

  // ── 생활 계산기 ──────────────────────────────────────────
  "/age",
  "/bmi",
  "/dday",
  "/car-tax",
  "/electricity-bill",
  "/due-date",
  "/military-discharge",
  "/fuel-economy",
  "/bac",
  "/life-remaining",

  // ── 재미 계산기 ──────────────────────────────────────────
  "/daily-fortune",
  "/lotto",
  "/compatibility",
  "/random-menu",
  "/mbti-compatibility",
  "/mbti-career",
  "/mbti-balance",
  "/mbti-change",
  "/couple-anniversary",
  "/zodiac-compatibility",
  "/zodiac-animal-compatibility",
  "/zodiac-personality",
  "/tojeong",
  "/tarot-daily",
  "/name-strokes",
  "/naming-score",
  "/past-life",
  "/saju",
  "/face-age",
];

test.describe("Smoke — 전체 라우트 200 응답 확인", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  for (const route of ROUTES) {
    test(`GET ${route}`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(
        response?.status(),
        `${route} 가 ${response?.status()} 를 반환했습니다 (200 이어야 합니다)`
      ).toBeLessThan(400);
    });
  }
});
