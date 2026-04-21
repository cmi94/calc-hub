import type { MetadataRoute } from "next";
import { calculators } from "@/content/calculators";

export const dynamic = "force-static";

const SITE_URL = "https://calc-hub-cv9.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const calculatorPages: MetadataRoute.Sitemap = calculators.flatMap((calc) => [
    { url: `${SITE_URL}${calc.path}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}${calc.path}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ]);

  return [...staticPages, ...calculatorPages];
}
