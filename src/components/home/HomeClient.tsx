"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Calculator } from "@/content/calculators";

// ── UFC weight-class metadata per category ─────────────────────────
const CAT_META: Record<string, { name: string; weight: string; emoji: string; color: string; desc: string }> = {
  labor:      { name: "근로",   weight: "웰터급",      emoji: "💼", color: "var(--ds-c-work)",   desc: "연봉·퇴직·시급의 일상 체급" },
  tax:        { name: "세금",   weight: "미들급",      emoji: "📑", color: "var(--ds-c-tax)",    desc: "소득세·취득세·양도세" },
  finance:    { name: "대출",   weight: "라이트헤비급", emoji: "🏦", color: "var(--ds-c-loan)",   desc: "이자·DTI·예적금" },
  realestate: { name: "부동산", weight: "헤비급",      emoji: "🏠", color: "var(--ds-c-estate)", desc: "취득·등기·중개 수수료" },
  life:       { name: "생활",   weight: "라이트급",    emoji: "🌿", color: "var(--ds-c-life)",   desc: "BMI·나이·D-day" },
  fun:        { name: "재미",   weight: "밴텀급",      emoji: "🎲", color: "var(--ds-c-fun)",    desc: "로또·궁합·메뉴 추천" },
};

// ── Popularity scores (used for ranking & sorting) ──────────────────
const STREAK: Record<string, number> = {
  "salary": 98, "severance": 94, "age": 92, "lotto": 89,
  "year-end-tax": 88, "property-acquisition-tax": 85,
  "mortgage": 83, "bmi": 80, "income-tax": 79,
  "hourly-wage": 81, "random-menu": 77, "dday": 76,
  "brokerage-fee": 74, "compatibility": 73,
  "weekly-holiday-pay": 72, "capital-gains-tax": 71,
  "jeonse-loan": 68, "gift-tax": 68, "daily-fortune": 65,
  "car-tax": 64, "unemployment-benefit": 62,
  "electricity-bill": 60, "housing-subscription-score": 58,
  "inheritance-tax": 55,
};

const RANKS: Record<string, number> = {
  "salary": 1, "severance": 2, "age": 3, "lotto": 4, "hourly-wage": 5,
};

const CAT_ORDER = ["labor", "tax", "finance", "realestate", "life", "fun"];
const CHAMP_ID = "salary";
const CONTENDER_IDS = ["severance", "age", "lotto", "hourly-wage"];

// ── Sub-components ──────────────────────────────────────────────────

function CatDot({ color, size = 8 }: { color: string; size?: number }) {
  return (
    <span style={{
      display: "inline-block", width: size, height: size,
      borderRadius: size / 2, background: color, flexShrink: 0,
    }} />
  );
}

function RankBadge({ rank }: { rank: number }) {
  const isChamp = rank === 1;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 8px 3px 6px", borderRadius: 6,
      background: isChamp ? "linear-gradient(180deg,#FFD84F 0%,#F4A700 100%)" : "var(--ds-navy)",
      color: isChamp ? "#2A1D00" : "#fff",
      fontSize: 11, fontWeight: 800, letterSpacing: "-0.01em",
      fontFamily: "var(--ff-en)",
      boxShadow: isChamp ? "0 2px 6px rgba(240,170,0,.35)" : "0 2px 6px rgba(13,27,42,.2)",
    }}>
      {isChamp ? (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
          <path d="M2 3l2 2 2-3 2 3 2-2-1 6H3z" />
        </svg>
      ) : (
        <span style={{ fontSize: 10, opacity: .7 }}>#</span>
      )}
      {isChamp ? "CHAMP" : rank}
    </div>
  );
}

// ── Champion Section ────────────────────────────────────────────────

function ChampionSection({ calc }: { calc: Calculator }) {
  const cat = CAT_META[calc.category];
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 32px" }}>
      <SectionLabel label="P4P CHAMPION" note="체급 무관 최강의 1위" />
      <Link href={calc.path} style={{ display: "block", textDecoration: "none" }}>
        <div style={{
          background: "linear-gradient(110deg, var(--ds-navy) 0%, #1B2940 100%)",
          borderRadius: 20, padding: 0, overflow: "hidden",
          position: "relative", boxShadow: "var(--shadow-lg)",
          transition: "transform .15s var(--ease-out)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>
          {/* Radial glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(600px 300px at 100% 0%, rgba(255,91,36,.22), transparent 60%)",
            pointerEvents: "none",
          }} />
          {/* Belt graphic */}
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: 220,
            opacity: 0.07, pointerEvents: "none",
          }}>
            <svg viewBox="0 0 220 220" fill="none" style={{ width: "100%", height: "100%" }}>
              <circle cx="110" cy="110" r="80" stroke="#FFD84F" strokeWidth="3" />
              <circle cx="110" cy="110" r="56" stroke="#FFD84F" strokeWidth="2" />
              <rect x="10" y="96" width="200" height="28" stroke="#FFD84F" strokeWidth="2" />
            </svg>
          </div>

          <div style={{ position: "relative", padding: "36px 40px", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            {/* Trophy icon */}
            <div style={{
              width: 88, height: 88, borderRadius: 22, flexShrink: 0,
              background: "linear-gradient(180deg,#FFD84F,#F4A700)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(244,167,0,.35), inset 0 -3px 0 rgba(0,0,0,.1)",
            }}>
              <svg width="48" height="48" viewBox="0 0 52 52" fill="#2A1D00">
                <path d="M8 14l7 6 11-12 11 12 7-6-4 26H12z" />
              </svg>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 240, color: "#fff" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{
                  fontSize: 11, fontWeight: 800, padding: "3px 8px", borderRadius: 6,
                  background: "#FFC940", color: "#2A1D00", letterSpacing: ".04em",
                  fontFamily: "var(--ff-en)",
                }}>CHAMP · 2026 S1</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                  background: "rgba(255,255,255,.1)",
                }}>{cat.name} · {cat.weight}</span>
              </div>
              <div style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                {calc.name}
              </div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,.7)", marginTop: 8, letterSpacing: "-0.01em", maxWidth: 520 }}>
                {calc.description}
              </div>
              <div style={{ display: "flex", gap: 28, marginTop: 20, flexWrap: "wrap" }}>
                <ChampStat label="주간 사용" value="128,402" unit="회" />
                <ChampStat label="연승" value={String(STREAK[calc.id] ?? 90)} unit="주" />
                <ChampStat label="타이틀 방어" value="12" unit="연속" />
              </div>
            </div>

            {/* CTA */}
            <div style={{
              padding: "14px 22px", borderRadius: 14,
              background: "var(--ds-orange)", color: "#fff",
              fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em", flexShrink: 0,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              계산 시작
              <ArrowRight />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

function ChampStat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", fontWeight: 600, marginBottom: 2, letterSpacing: ".02em" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", fontFamily: "var(--ff-en)" }}>{value}</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{unit}</span>
      </div>
    </div>
  );
}

// ── Contenders Section ──────────────────────────────────────────────

function ContendersSection({ calcs }: { calcs: Calculator[] }) {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 24px 48px" }}>
      <SectionLabel label="TOP CONTENDERS" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {calcs.map((c) => {
          const cat = CAT_META[c.category];
          const streak = STREAK[c.id] ?? 60;
          const rank = RANKS[c.id];
          return (
            <Link key={c.id} href={c.path} style={{ textDecoration: "none" }}>
              <div style={{
                background: "var(--ds-bg-card)", border: "1px solid var(--ds-line)",
                borderRadius: 14, padding: 20, position: "relative",
                boxShadow: "var(--shadow-xs)", transition: "transform .15s var(--ease-out), box-shadow .15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-xs)";
              }}>
                <div style={{
                  fontSize: 44, fontWeight: 900, letterSpacing: "-0.06em",
                  color: cat?.color, lineHeight: 1, marginBottom: 10,
                  fontFamily: "var(--ff-en)",
                }}>#{rank}</div>
                {cat && (
                  <div style={{ fontSize: 11, fontWeight: 700, color: cat.color, marginBottom: 6 }}>
                    {cat.name} · {cat.weight}
                  </div>
                )}
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ds-ink)", letterSpacing: "-0.02em", marginBottom: 6 }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--ds-muted)", lineHeight: 1.5, minHeight: 36 }}>
                  {c.description}
                </div>
                {/* Win-rate bar */}
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px dashed var(--ds-line)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: "var(--ds-muted)" }}>승률</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ds-ink)", fontFamily: "var(--ff-en)" }}>{streak}%</span>
                  <div style={{ flex: 1, height: 4, background: "var(--ds-bg-sub)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${streak}%`, height: "100%", background: cat?.color }} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ── Divisions Section ───────────────────────────────────────────────

function DivisionsSection({ grouped }: { grouped: Array<{ slug: string; meta: typeof CAT_META[string]; items: Calculator[] }> }) {
  return (
    <section style={{ background: "var(--ds-bg-sub)", padding: "56px 24px", borderTop: "1px solid var(--ds-line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ds-muted)", letterSpacing: ".12em", fontFamily: "var(--ff-en)", marginBottom: 6 }}>
              DIVISIONS
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", margin: 0, color: "var(--ds-ink)" }}>
              체급 선택
            </h2>
          </div>
          <Link href="/category" style={{
            background: "var(--ds-bg-card)", border: "1px solid var(--ds-line)",
            padding: "10px 16px", borderRadius: 10, fontSize: 14, fontWeight: 600,
            color: "var(--ds-muted-2)", textDecoration: "none",
          }}>전체 보기 →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
          {grouped.map(({ slug, meta, items }) => {
            const top3 = items.slice(0, 3);
            return (
              <div key={slug} style={{
                background: "var(--ds-bg-card)", border: "1px solid var(--ds-line)",
                borderRadius: 14, padding: 22, position: "relative", overflow: "hidden",
              }}>
                {/* Color blob */}
                <div style={{
                  position: "absolute", top: -28, right: -28, width: 100, height: 100,
                  borderRadius: 999, background: meta.color, opacity: 0.08,
                  pointerEvents: "none",
                }} />

                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: meta.color, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>{meta.emoji}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "var(--ds-ink)", letterSpacing: "-0.02em" }}>{meta.name}</div>
                    <div style={{ fontSize: 11, color: meta.color, fontWeight: 700 }}>{meta.weight} · {items.length}종</div>
                  </div>
                </div>

                {/* Top 3 calculators */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {top3.map((c, i) => (
                    <Link key={c.id} href={c.path} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                      background: "var(--ds-bg-sub)", borderRadius: 8,
                      textDecoration: "none",
                      transition: "background .1s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--ds-line)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--ds-bg-sub)")}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ds-muted)", width: 18, fontFamily: "var(--ff-en)" }}>#{i + 1}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ds-ink)", flex: 1 }}>{c.name}</span>
                      <span style={{ fontSize: 11, color: "var(--ds-muted)" }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Search Results Dropdown ─────────────────────────────────────────

function SearchDropdown({ results, query, onClose }: { results: Calculator[]; query: string; onClose: () => void }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
      background: "var(--ds-bg-card)", border: "1px solid var(--ds-line)",
      borderRadius: 14, padding: 8, boxShadow: "var(--shadow-lg)",
      maxHeight: 340, overflowY: "auto", zIndex: 10,
    }}>
      {results.length === 0 ? (
        <div style={{ padding: 24, textAlign: "center", color: "var(--ds-muted)", fontSize: 14 }}>
          &ldquo;{query}&rdquo;에 해당하는 계산기가 없어요.
        </div>
      ) : results.slice(0, 8).map((c) => {
        const cat = CAT_META[c.category];
        return (
          <Link key={c.id} href={c.path} onClick={onClose} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
            borderRadius: 8, textDecoration: "none",
            transition: "background .1s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--ds-bg-sub)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}>
            {cat && <CatDot color={cat.color} size={10} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ds-ink)" }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "var(--ds-muted)", marginTop: 2 }}>{c.description}</div>
            </div>
            {STREAK[c.id] && (
              <span style={{ fontSize: 12, color: "var(--ds-muted)", fontFamily: "var(--ff-en)" }}>
                #{STREAK[c.id]}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

// ── Shared helpers ──────────────────────────────────────────────────

function SectionLabel({ label, note }: { label: string; note?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: "var(--ds-muted)", letterSpacing: "0.12em", fontFamily: "var(--ff-en)" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--ds-line)" }} />
      {note && <span style={{ fontSize: 12, color: "var(--ds-muted)" }}>{note}</span>}
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

// ── Main Component ──────────────────────────────────────────────────

export default function HomeClient({ calculators }: { calculators: Calculator[] }) {
  const [q, setQ] = useState("");

  const searchResults = useMemo(() => {
    const Q = q.trim().toLowerCase();
    if (!Q) return null;
    return calculators.filter((c) =>
      c.name.toLowerCase().includes(Q) ||
      c.description.toLowerCase().includes(Q) ||
      (CAT_META[c.category]?.name ?? "").includes(Q)
    );
  }, [q, calculators]);

  const champion = calculators.find((c) => c.id === CHAMP_ID);
  const contenders = CONTENDER_IDS
    .map((id) => calculators.find((c) => c.id === id))
    .filter((c): c is Calculator => Boolean(c));

  const grouped = CAT_ORDER.map((slug) => ({
    slug,
    meta: CAT_META[slug],
    items: calculators
      .filter((c) => c.category === slug)
      .sort((a, b) => (STREAK[b.id] ?? 50) - (STREAK[a.id] ?? 50)),
  })).filter((g) => g.meta && g.items.length > 0);

  const isSearching = Boolean(searchResults);

  return (
    <div style={{ background: "var(--ds-bg)", minHeight: "100vh" }}>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{ padding: "56px 24px 48px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Live badge */}
        <div style={{ marginBottom: 18 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 10px 5px 8px", borderRadius: 999,
            background: "var(--ds-orange-soft)", color: "var(--ds-orange)",
            fontSize: 12, fontWeight: 700, letterSpacing: "-0.01em",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3, background: "var(--ds-orange)",
              display: "inline-block", animation: "ds-pulse 2s infinite",
            }} />
            2026 S1 랭킹 업데이트됨
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: "clamp(40px,6vw,64px)", fontWeight: 900,
          letterSpacing: "-0.045em", lineHeight: 1.02,
          margin: "0 0 18px", color: "var(--ds-ink)",
        }}>
          계산기 씬의<br />
          <span style={{ color: "var(--ds-orange)" }}>절대 체급.</span>
        </h1>

        <p style={{
          fontSize: "clamp(15px,2vw,19px)", color: "var(--ds-muted-2)", lineHeight: 1.5,
          margin: "0 0 36px", maxWidth: 640, letterSpacing: "-0.01em",
        }}>
          연봉·퇴직금·세금·대출·부동산까지. 한국인의 모든 계산을 한 곳에서.
          체급별 랭킹으로 가장 많이 쓰는 계산기부터 바로.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 640, position: "relative" }}>
          <form onSubmit={(e) => e.preventDefault()} style={{
            display: "flex", alignItems: "center",
            background: "var(--ds-bg-card)", border: "1px solid var(--ds-line)",
            borderRadius: 29, padding: "0 6px 0 20px",
            boxShadow: "var(--shadow-md)", height: 58,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--ds-muted)" strokeWidth="2" strokeLinecap="round">
              <circle cx="8" cy="8" r="5.5" /><path d="M12 12l4 4" />
            </svg>
            <input
              type="text" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="계산기 이름, 태그 검색 (예: 연봉, BMI, 취득세)"
              style={{
                flex: 1, border: "none", outline: "none", background: "transparent",
                padding: "0 12px", fontSize: 16, color: "var(--ds-ink)", letterSpacing: "-0.01em",
              }}
            />
            {q && (
              <button type="button" onClick={() => setQ("")} style={{
                background: "none", border: "none", color: "var(--ds-muted)",
                fontSize: 16, cursor: "pointer", padding: "0 6px",
              }}>✕</button>
            )}
            <button type="submit" style={{
              background: "var(--ds-orange)", color: "#fff", border: "none",
              height: 46, padding: "0 20px", borderRadius: 23,
              fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", cursor: "pointer",
            }}>검색</button>
          </form>

          {/* Quick-pick tags */}
          {!isSearching && (
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {["연봉 실수령액", "퇴직금", "BMI", "D-day", "로또", "취득세"].map((t) => (
                <button key={t} onClick={() => setQ(t)} style={{
                  padding: "7px 14px", borderRadius: 999,
                  background: "var(--ds-bg-card)", border: "1px solid var(--ds-line)",
                  fontSize: 13, fontWeight: 600, color: "var(--ds-ink-soft)",
                  letterSpacing: "-0.01em", cursor: "pointer",
                  transition: "border-color .12s",
                }}>{t}</button>
              ))}
            </div>
          )}

          {/* Search dropdown */}
          {isSearching && searchResults && (
            <SearchDropdown results={searchResults} query={q} onClose={() => setQ("")} />
          )}
        </div>
      </section>

      {/* ── P4P Champion ──────────────────────────────────────────── */}
      {!isSearching && champion && <ChampionSection calc={champion} />}

      {/* ── Top Contenders ────────────────────────────────────────── */}
      {!isSearching && contenders.length > 0 && <ContendersSection calcs={contenders} />}

      {/* ── Divisions ─────────────────────────────────────────────── */}
      {!isSearching && <DivisionsSection grouped={grouped} />}

      {/* ── Footer stripe ─────────────────────────────────────────── */}
      {!isSearching && (
        <div style={{ padding: "32px 24px", textAlign: "center", color: "var(--ds-muted)", fontSize: 12, borderTop: "1px solid var(--ds-line)" }}>
          다계스탄 · 계산기 씬의 절대 체급 · 2026
        </div>
      )}
    </div>
  );
}
