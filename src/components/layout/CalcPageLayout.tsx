"use client";

import Link from "next/link";
import type { Calculator } from "@/content/calculators";
import { CAT_META, CALC_RANK, CALC_STREAK } from "@/lib/calcMeta";
import { calculators } from "@/content/calculators";

interface Props {
  calc: Calculator;
  children: React.ReactNode;
}

export default function CalcPageLayout({ calc, children }: Props) {
  const cat = CAT_META[calc.category];
  const rank = CALC_RANK[calc.id];
  const streak = CALC_STREAK[calc.id];
  const isChamp = rank === 1;

  // 같은 체급 관련 계산기 (최대 4개)
  const related = calculators
    .filter((c) => c.category === calc.category && c.id !== calc.id)
    .sort((a, b) => (CALC_STREAK[b.id] ?? 50) - (CALC_STREAK[a.id] ?? 50))
    .slice(0, 4);

  return (
    <div style={{ background: "var(--ds-bg-sub)", minHeight: "100vh" }}>
      {/* ── Fight card header ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-7 pb-16 px-4 sm:px-6 sm:pt-8 sm:pb-16"
        style={{ background: "var(--ds-navy)", color: "#fff" }}
      >
        {/* Category color glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(500px 200px at 80% 50%, ${cat?.color ?? "transparent"}33, transparent)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          {/* Back */}
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,.08)", border: "none", color: "#fff",
            padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            marginBottom: 20, textDecoration: "none",
            transition: "background .12s",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2L4 6l4 4" />
            </svg>
            전체 로스터
          </Link>

          {/* Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            {isChamp && (
              <span style={{
                fontSize: 11, fontWeight: 800, padding: "3px 8px", borderRadius: 6,
                background: "#FFC940", color: "#2A1D00", letterSpacing: ".04em",
                fontFamily: "var(--ff-en)",
              }}>CHAMP · 2026 S1</span>
            )}
            {rank && !isChamp && (
              <span style={{
                fontSize: 11, fontWeight: 800, padding: "3px 8px", borderRadius: 6,
                background: "rgba(255,255,255,.15)", color: "#fff",
                letterSpacing: ".04em", fontFamily: "var(--ff-en)",
              }}>#{rank}</span>
            )}
            {cat && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                background: "rgba(255,255,255,.1)",
              }}>{cat.name} · {cat.weight}</span>
            )}
            {streak && (
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>승률 {streak}%</span>
            )}
          </div>

          <h1 style={{
            fontSize: "clamp(28px,4vw,42px)", fontWeight: 900,
            letterSpacing: "-0.04em", margin: "0 0 10px", lineHeight: 1.1,
          }}>
            {calc.name}
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", margin: 0, maxWidth: 560, letterSpacing: "-0.01em" }}>
            {calc.description}
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section
        className="relative px-4 sm:px-6 pb-16 sm:pb-16"
        style={{ maxWidth: 1040, margin: "-36px auto 0" }}
      >
        <div
          className="px-4 py-5 sm:px-7 sm:py-8"
          style={{
            background: "var(--ds-bg-card)", border: "1px solid var(--ds-line)",
            borderRadius: 20, boxShadow: "var(--shadow-md)",
          }}
        >
          {/* Round label */}
          <div style={{
            fontSize: 11, fontWeight: 800, color: "var(--ds-muted)",
            letterSpacing: ".12em", fontFamily: "var(--ff-en)", marginBottom: 20,
          }}>ROUND 1 · 계산</div>
          {children}
        </div>
      </section>

      {/* ── Same Division ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          className="px-4 sm:px-6 pb-16"
          style={{ maxWidth: 1040, margin: "0 auto" }}
        >
          <div style={{
            fontSize: 11, fontWeight: 800, color: "var(--ds-muted)",
            letterSpacing: ".12em", fontFamily: "var(--ff-en)", marginBottom: 14,
          }}>
            SAME DIVISION · {cat?.name} · {cat?.weight}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 12 }}>
            {related.map((c) => (
              <Link key={c.id} href={c.path} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "var(--ds-bg-card)", border: "1px solid var(--ds-line)",
                  borderRadius: 14, padding: 16, boxShadow: "var(--shadow-xs)",
                  transition: "transform .15s var(--ease-out), box-shadow .15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-xs)";
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: 3,
                      background: cat?.color, display: "inline-block",
                    }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: cat?.color, letterSpacing: ".02em" }}>
                      {cat?.name}
                    </span>
                    {CALC_RANK[c.id] && (
                      <span style={{
                        marginLeft: "auto", fontSize: 10, fontWeight: 800,
                        color: "#2A1D00", padding: "1px 5px", borderRadius: 4,
                        background: CALC_RANK[c.id] === 1 ? "#FFC940" : "var(--ds-bg-sub)",
                      }}>
                        {CALC_RANK[c.id] === 1 ? "CHAMP" : `#${CALC_RANK[c.id]}`}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ds-ink)", letterSpacing: "-0.02em", marginBottom: 4 }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ds-muted)", lineHeight: 1.4 }}>
                    {c.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
