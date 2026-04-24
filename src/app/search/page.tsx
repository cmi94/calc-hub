"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { calculators } from "@/content/calculators";
import { CAT_META } from "@/lib/calcMeta";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return calculators;
    return calculators.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div style={{ background: "var(--ds-bg-sub)", minHeight: "100vh" }}>
      <section
        className="py-10 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: "var(--ds-navy)", color: "#fff" }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(600px 300px at 70% 60%, oklch(62% 0.16 255 / 0.2), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: ".12em",
            color: "rgba(255,255,255,.45)", fontFamily: "var(--ff-en)", marginBottom: 12,
          }}>SEARCH</p>
          <h1 style={{
            fontSize: "clamp(28px,5vw,42px)", fontWeight: 900,
            letterSpacing: "-0.04em", margin: "0 0 16px", lineHeight: 1.1,
          }}>
            계산기 검색
          </h1>
          <div style={{ position: "relative", maxWidth: 480 }}>
            <Search
              size={18}
              style={{
                position: "absolute", left: 16, top: "50%",
                transform: "translateY(-50%)", color: "rgba(255,255,255,.5)",
                pointerEvents: "none",
              }}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="계산기 이름이나 키워드 검색..."
              autoFocus
              style={{
                width: "100%", padding: "12px 16px 12px 46px",
                background: "rgba(255,255,255,.1)",
                border: "1px solid rgba(255,255,255,.2)",
                borderRadius: 12, color: "#fff", fontSize: 15,
                outline: "none",
              }}
            />
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 py-6" style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p style={{ fontSize: 13, color: "var(--ds-muted)", marginBottom: 16 }}>
          {query ? `"${query}" 검색 결과 ${results.length}개` : `전체 ${results.length}개`}
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
          gap: 10,
        }}>
          {results.map((calc) => {
            const catMeta = CAT_META[calc.category];
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
                      background: catMeta?.color ?? "var(--ds-muted)",
                      display: "inline-block", flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: 10, color: "var(--ds-muted)",
                      fontFamily: "var(--ff-en)",
                    }}>
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
            );
          })}
        </div>
        {results.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ds-muted)" }}>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>검색 결과가 없습니다</p>
            <p style={{ fontSize: 13 }}>다른 키워드로 검색해 보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
