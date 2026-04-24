"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("ds-theme") as "light" | "dark" | null;
    const t = stored ?? "light";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ds-theme", next);
  };

  const activeNav =
    pathname === "/" ? "home"
    : pathname.startsWith("/category") ? "categories"
    : pathname === "/about" ? "about"
    : pathname === "/contact" ? "contact"
    : "";

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 20,
      background: "color-mix(in oklch, var(--ds-bg) 85%, transparent)",
      backdropFilter: "blur(14px) saturate(160%)",
      borderBottom: "1px solid var(--ds-line)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        height: 60, display: "flex", alignItems: "center", gap: 28,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <LogoMark />
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ds-ink)" }}>
            다계스탄
          </span>
          <span style={{
            fontSize: 9, fontWeight: 800, color: "var(--ds-orange)",
            letterSpacing: ".08em", padding: "2px 5px", borderRadius: 4,
            background: "var(--ds-orange-soft)", fontFamily: "var(--ff-en)",
            marginTop: -8,
          }}>UFC</span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", gap: 2, marginLeft: 4 }}>
          {[
            { id: "categories", label: "체급 전체", href: "/category" },
            { id: "about",      label: "소개",      href: "/about" },
            { id: "contact",    label: "문의",      href: "/contact" },
          ].map((n) => (
            <Link key={n.id} href={n.href} style={{
              background: activeNav === n.id ? "var(--ds-bg-sub)" : "transparent",
              border: "none", padding: "7px 12px", borderRadius: 8,
              fontSize: 14, fontWeight: 600,
              color: activeNav === n.id ? "var(--ds-ink)" : "var(--ds-muted-2)",
              letterSpacing: "-0.01em", textDecoration: "none",
              transition: "background .12s, color .12s",
            }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="테마 전환"
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: "var(--ds-bg-sub)", border: "1px solid var(--ds-line)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ds-muted-2)", cursor: "pointer",
          }}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
      background: "linear-gradient(135deg, var(--ds-orange) 0%, #FF8A3D 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 2px 6px rgba(255,91,36,.35)",
    }}>
      <span style={{ color: "#fff", fontWeight: 900, fontSize: 13, letterSpacing: "-0.04em", fontFamily: "var(--ff-kr)" }}>
        다
      </span>
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="3.2" />
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.3 3.3l1 1M11.7 11.7l1 1M3.3 12.7l1-1M11.7 4.3l1-1" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.5 10.2a5 5 0 01-6.7-6.7 5.5 5.5 0 106.7 6.7z" />
    </svg>
  );
}
