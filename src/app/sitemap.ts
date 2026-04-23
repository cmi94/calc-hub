import type { MetadataRoute } from "next";
import { calculators } from "@/content/calculators";

export const dynamic = "force-static";

const SITE_URL = "https://dagyesan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  // guide 페이지가 없는 계산기 (재미 카테고리)
  const NO_GUIDE_PATHS = new Set(["/daily-fortune", "/lotto"]);

  const calculatorPages: MetadataRoute.Sitemap = calculators.flatMap((calc) => {
    const pages: MetadataRoute.Sitemap = [
      { url: `${SITE_URL}${calc.path}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ];
    if (!NO_GUIDE_PATHS.has(calc.path)) {
      pages.push({ url: `${SITE_URL}${calc.path}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
    }
    return pages;
  });

  return [...staticPages, ...calculatorPages];
}
