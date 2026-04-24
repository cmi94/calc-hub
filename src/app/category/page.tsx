import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/content/calculators";
import { CAT_META, CALC_RANK, CALC_STREAK } from "@/lib/calcMeta";

export const metadata: Metadata = {
  title: "전체 카테고리 — 다계스탄",
  description: "근로·세금·대출·부동산·생활·재미 6개 체급, 총 49종 계산기를 한눈에 확인하세요.",
};

const CAT_ORDER = ["labor", "tax", "finance", "realestate", "life", "fun"] as const;

export default function CategoryPage() {
  return (
    <div style={{ background: "var(--ds-bg-sub)", minHeight: "100vh" }}>
      {/* 헤더 배너 */}
      <section
        className="py-10 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: "var(--ds-navy)", color: "#fff" }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(600px 300px at 70% 60%, oklch(62% 0.16 255)33, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: ".12em",
            color: "rgba(255,255,255,.45)", fontFamily: "var(--ff-en)", marginBottom: 12,
          }}>FULL ROSTER</p>
          <h1 style={{
            fontSize: "clamp(28px,5vw,42px)", fontWeight: 900,
            letterSpacing: "-0.04em", margin: "0 0 10px", lineHeight: 1.1,
          }}>
            체급 전체
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", margin: 0 }}>
            6개 체급 · {calculators.length}종 계산기
          </p>
        </div>
      </section>

      {/* 카테고리 그리드 */}
      <div
        className="px-4 sm:px-6 py-8"
        style={{ maxWidth: 1040, margin: "0 auto" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {CAT_ORDER.map((catKey) => {
            const meta = CAT_META[catKey];
            if (!meta) return null;
            const calcs = calculators
              .filter((c) => c.category === catKey)
              .sort((a, b) => (CALC_STREAK[b.id] ?? 0) - (CALC_STREAK[a.id] ?? 0));

            return (
              <section key={catKey}>
                {/* 체급 헤더 */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  marginBottom: 16, paddingBottom: 12,
                  borderBottom: "1px solid var(--ds-line)",
                }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${meta.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>{meta.emoji}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        fontSize: 16, fontWeight: 800, color: "var(--ds-ink)",
                        letterSpacing: "-0.03em",
                      }}>{meta.name}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: meta.color,
                        background: `${meta.color}18`,
                        padding: "2px 8px", borderRadius: 20,
                        fontFamily: "var(--ff-en)",
                      }}>{meta.weight}</span>
                      <span style={{
                        fontSize: 11, color: "var(--ds-muted)",
                        marginLeft: 2,
                      }}>{calcs.length}종</span>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--ds-muted)", margin: "2px 0 0" }}>
                      {meta.desc}
                    </p>
                  </div>
                  <Link
                    href={`/category/${catKey}`}
                    style={{
                      marginLeft: "auto", fontSize: 12, fontWeight: 600,
                      color: meta.color, textDecoration: "none", flexShrink: 0,
                    }}
                  >
                    전체 보기 →
                  </Link>
                </div>

                {/* 계산기 카드 목록 */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
                  gap: 10,
                }}>
                  {calcs.map((calc) => {
                    const rank = CALC_RANK[calc.id];
                    return (
                      <Link key={calc.id} href={calc.path} style={{ textDecoration: "none" }}>
                        <div
                          style={{
                            background: "var(--ds-bg-card)",
                            border: "1px solid var(--ds-line)",
                            borderRadius: 14, padding: "14px 16px",
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
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                            <span style={{
                              width: 6, height: 6, borderRadius: 3,
                              background: meta.color, display: "inline-block", flexShrink: 0,
                            }} />
                            {rank && (
                              <span style={{
                                fontSize: 10, fontWeight: 800,
                                color: rank === 1 ? "#2A1D00" : "var(--ds-muted)",
                                background: rank === 1 ? "#FFC940" : "var(--ds-bg-sub)",
                                padding: "1px 6px", borderRadius: 4,
                                fontFamily: "var(--ff-en)",
                              }}>
                                {rank === 1 ? "CHAMP" : `#${rank}`}
                              </span>
                            )}
                            {CALC_STREAK[calc.id] && (
                              <span style={{ fontSize: 10, color: "var(--ds-muted)", marginLeft: "auto" }}>
                                승률 {CALC_STREAK[calc.id]}%
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontSize: 14, fontWeight: 700,
                            color: "var(--ds-ink)", letterSpacing: "-0.02em",
                            marginBottom: 4,
                          }}>
                            {calc.name}
                          </div>
                          <div style={{
                            fontSize: 12, color: "var(--ds-muted)", lineHeight: 1.4,
                          }}>
                            {calc.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
