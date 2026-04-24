"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Sparkles, Star } from "lucide-react";

const tabs = [
  { href: "/",               icon: Home,     label: "홈" },
  { href: "/search",         icon: Search,   label: "검색" },
  { href: "/horoscope-daily",icon: Sparkles, label: "운세" },
  { href: "/favorites",      icon: Star,     label: "즐겨찾기" },
] as const;

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden"
      style={{
        background: "var(--ds-bg-card)",
        borderTop: "1px solid var(--ds-line)",
        /* iOS safe area — 탭바가 홈 인디케이터를 덮지 않도록 */
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(tab.href + "/");
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors min-h-[56px]"
            style={{
              fontSize: 11,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "var(--ds-orange)" : "var(--ds-muted)",
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
