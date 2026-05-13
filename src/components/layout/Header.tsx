"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "categories", label: "체급 전체", href: "/category" },
  { id: "about",      label: "소개",      href: "/about" },
  { id: "contact",    label: "문의",      href: "/contact" },
] as const;

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("ds-theme") as "light" | "dark" | null;
    const t = stored ?? "light";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ds-theme", next);
  };

  const activeNav =
    pathname === "/"                   ? "home"
    : pathname.startsWith("/category") ? "categories"
    : pathname === "/about"            ? "about"
    : pathname === "/contact"          ? "contact"
    : "";

  return (
    <>
      <header
        className="sticky top-0 z-20 border-b"
        style={{
          background: "color-mix(in oklch, var(--ds-bg) 85%, transparent)",
          backdropFilter: "blur(14px) saturate(160%)",
          borderColor: "var(--ds-line)",
        }}
      >
        <div
          className="mx-auto flex h-[60px] items-center gap-4 px-4 sm:px-6"
          style={{ maxWidth: 1200 }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 no-underline"
          >
            <LogoMark />
            <span
              className="text-[18px] font-extrabold tracking-tight"
              style={{ color: "var(--ds-ink)" }}
            >
              다계스탄
            </span>
            <span
              className="-mt-2 rounded px-[5px] py-[2px] text-[9px] font-extrabold tracking-wide"
              style={{
                color: "var(--ds-orange)",
                background: "var(--ds-orange-soft)",
                fontFamily: "var(--ff-en)",
              }}
            >
              UFC
            </span>
          </Link>

          {/* Desktop nav — lg(1024px) 이상에서만 표시 */}
          <nav className="ml-1 hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold tracking-tight no-underline transition-[background,color] duration-100"
                style={{
                  background: activeNav === n.id ? "var(--ds-bg-sub)" : "transparent",
                  color: activeNav === n.id ? "var(--ds-ink)" : "var(--ds-muted-2)",
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="테마 전환"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px]"
            style={{
              background: "var(--ds-bg-sub)",
              border: "1px solid var(--ds-line)",
              color: "var(--ds-muted-2)",
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Mobile hamburger — lg 미만에서만 표시 */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] lg:hidden"
            style={{
              background: "var(--ds-bg-sub)",
              border: "1px solid var(--ds-line)",
              color: "var(--ds-muted-2)",
            }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[60px] z-10 border-b px-4 py-3 lg:hidden"
          style={{
            background: "var(--ds-bg)",
            borderColor: "var(--ds-line)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.id}
              href={n.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold no-underline"
              style={{
                background: activeNav === n.id ? "var(--ds-bg-sub)" : "transparent",
                color: activeNav === n.id ? "var(--ds-ink)" : "var(--ds-muted-2)",
              }}
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function LogoMark() {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-lg"
      style={{
        width: 28, height: 28,
        background: "linear-gradient(135deg, var(--ds-orange) 0%, #FF8A3D 100%)",
        boxShadow: "0 2px 6px rgba(255,91,36,.35)",
      }}
    >
      <span
        className="font-black text-[13px] text-white"
        style={{ letterSpacing: "-0.04em", fontFamily: "var(--ff-kr)" }}
      >
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

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  );
}
