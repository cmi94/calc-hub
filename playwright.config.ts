import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },          // 393 × 851, Android
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },         // 390 × 844, iOS
    },
    {
      name: "mobile-small",
      use: { ...devices["Galaxy S8"] },         // 360 × 740, 최소 타깃
    },
  ],

  // pnpm dev 서버를 자동 시작
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
