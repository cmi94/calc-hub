"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { calculators } from "@/content/calculators";
import { CAT_META } from "@/lib/calcMeta";
import { useFavorites } from "@/lib/hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, toggle } = useFavorites();

  const favCalcs = calculators.filter((c) => favorites.includes(c.id));

  return (
    <div style={{ background: "var(--ds-bg-sub)", minHeight: "100vh" }}>
      <section
        className="py-10 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: "var(--ds-navy)", color: "#fff" }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(600px 300px at 70% 60%, oklch(62% 0.16 45 / 0.2), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: ".12em",
            color: "rgba(255,255,255,.45)", fontFamily: "var(--ff-en)", marginBottom: 12,
          }}>FAVORITES</p>
          <h1 style={{
            fontSize: "clamp(28px,5vw,42px)", fontWeight: 900,
            letterSpacing: "-0.04em", margin: "0 0 10px", lineHeight: 1.1,
          }}>
            즐겨찾기
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", margin: 0 }}>
            {favCalcs.length > 0
              ? `저장된 계산기 ${favCalcs.length}개`
              : "자주 쓰는 계산기를 별표로 저장하세요"}
          </p>
        </div>
      </section>

      <div className="px-4 sm:px-6 py-8" style={{ maxWidth: 1040, margin: "0 auto" }}>
        {favCalcs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <Star size={48} style={{ color: "var(--ds-muted)", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ds-ink)", marginBottom: 8 }}>
              아직 즐겨찾기가 없어요
            </p>
            <p style={{ fontSize: 13, color: "var(--ds-muted)", marginBottom: 24 }}>
              계산기 페이지의 ☆ 버튼을 눌러 저장해 보세요
            </p>
            <Link
              href="/"
              style={{
                display: "inline-flex", alignItems: "center",
                background: "var(--ds-orange)", color: "#fff",
                padding: "10px 20px", borderRadius: 10,
                fontSize: 14, fontWeight: 700, textDecoration: "none",
              }}
            >
              계산기 둘러보기
            </Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
            gap: 10,
          }}>
            {favCalcs.map((calc) => {
              const catMeta = CAT_META[calc.category];
              return (
                <div key={calc.id} style={{ position: "relative" }}>
                  <Link href={calc.path} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        background: "var(--ds-bg-card)",
                        border: "1px solid var(--ds-line)",
                        borderRadius: 14, padding: "14px 16px",
                        boxShadow: "var(--shadow-xs)",
                        transition: "transform .15s, box-shadow .15s",
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
                          background: catMeta?.color ?? "var(--ds-muted)",
                          display: "inline-block", flexShrink: 0,
                        }} />
                        <span style={{ fontSize: 10, color: "var(--ds-muted)", fontFamily: "var(--ff-en)" }}>
                          {catMeta?.name ?? calc.category}
                        </span>
                      </div>
                      <div style={{
                        fontSize: 14, fontWeight: 700,
                        color: "var(--ds-ink)", letterSpacing: "-0.02em",
                        marginBottom: 4,
                      }}>
                        {calc.name}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--ds-muted)", lineHeight: 1.4 }}>
                        {calc.description}
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggle(calc.id)}
                    title="즐겨찾기 제거"
                    style={{
                      position: "absolute", top: 10, right: 10,
                      background: "none", border: "none", cursor: "pointer",
                      padding: 4, color: "var(--ds-orange)",
                    }}
                  >
                    <Star size={14} fill="currentColor" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
