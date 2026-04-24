import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { calculators } from "@/content/calculators";
import { CAT_META, CALC_RANK, CALC_STREAK } from "@/lib/calcMeta";

const CAT_ORDER = ["labor", "tax", "finance", "realestate", "life", "fun"] as const;

export function generateStaticParams() {
  return CAT_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const meta = CAT_META[slug];
  if (!meta) return {};
  const count = calculators.filter((c) => c.category === slug).length;
  return {
    title: `${meta.name} 계산기 ${count}종 — 다계스탄`,
    description: `${meta.desc}. 다계스탄에서 ${meta.name} 관련 계산기 ${count}종을 무료로 이용하세요.`,
  };
}

export default async function CategorySlugPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const meta = CAT_META[slug];
  if (!meta) notFound();

  const calcs = calculators
    .filter((c) => c.category === slug)
    .sort((a, b) => (CALC_STREAK[b.id] ?? 0) - (CALC_STREAK[a.id] ?? 0));

  return (
    <div style={{ background: "var(--ds-bg-sub)", minHeight: "100vh" }}>
      {/* 헤더 배너 */}
      <section
        className="py-10 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: "var(--ds-navy)", color: "#fff" }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(600px 300px at 70% 60%, ${meta.color}33, transparent)`,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          <Link
            href="/category"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,.08)", color: "#fff",
              padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              marginBottom: 20, textDecoration: "none",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2L4 6l4 4" />
            </svg>
            전체 카테고리
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>{meta.emoji}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, color: meta.color,
              background: `${meta.color}22`,
              padding: "3px 10px", borderRadius: 20,
              fontFamily: "var(--ff-en)",
            }}>{meta.weight}</span>
          </div>

          <h1 style={{
            fontSize: "clamp(28px,5vw,42px)", fontWeight: 900,
            letterSpacing: "-0.04em", margin: "0 0 10px", lineHeight: 1.1,
          }}>
            {meta.name} 계산기
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", margin: 0 }}>
            {meta.desc} · {calcs.length}종
          </p>
        </div>
      </section>

      {/* 계산기 목록 */}
      <div
        className="px-4 sm:px-6 py-8"
        style={{ maxWidth: 1040, margin: "0 auto" }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
          gap: 12,
        }}>
          {calcs.map((calc) => {
            const rank = CALC_RANK[calc.id];
            const streak = CALC_STREAK[calc.id];
            return (
              <Link key={calc.id} href={calc.path} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "var(--ds-bg-card)",
                    border: "1px solid var(--ds-line)",
                    borderRadius: 16, padding: "18px 20px",
                    boxShadow: "var(--shadow-xs)",
                    transition: "transform .15s, box-shadow .15s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-xs)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{
                      width: 7, height: 7, borderRadius: 4,
                      background: meta.color, display: "inline-block", flexShrink: 0,
                    }} />
                    {rank ? (
                      <span style={{
                        fontSize: 11, fontWeight: 800,
                        color: rank === 1 ? "#2A1D00" : "#fff",
                        background: rank === 1 ? "#FFC940" : "var(--ds-navy)",
                        padding: "2px 7px", borderRadius: 5,
                        fontFamily: "var(--ff-en)",
                      }}>
                        {rank === 1 ? "CHAMP" : `#${rank}`}
                      </span>
                    ) : null}
                    {streak ? (
                      <span style={{ fontSize: 11, color: "var(--ds-muted)", marginLeft: "auto" }}>
                        {streak}%
                      </span>
                    ) : null}
                  </div>
                  <div style={{
                    fontSize: 15, fontWeight: 700,
                    color: "var(--ds-ink)", letterSpacing: "-0.02em",
                    marginBottom: 6, lineHeight: 1.3,
                  }}>
                    {calc.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ds-muted)", lineHeight: 1.5 }}>
                    {calc.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
