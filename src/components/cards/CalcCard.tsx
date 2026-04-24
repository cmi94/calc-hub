// src/components/cards/CalcCard.tsx
// 계산기 카드 컴포넌트 — lib/data/categories.ts의 Calculator 타입 기반
import type { Calculator } from "@/lib/data/categories";
import { CATEGORY_COLORS } from "@/lib/data/categories";
import Link from "next/link";
import Badge from "./Badge";

// 카테고리별 이모지 아이콘 (HomeClient와 동일한 스타일)
const CATEGORY_EMOJI: Record<string, { icon: string; label: string }> = {
  salary:   { icon: '💼', label: '급여·근로' },
  tax:      { icon: '🧾', label: '세무' },
  property: { icon: '🏠', label: '부동산' },
  finance:  { icon: '🏦', label: '금융·대출' },
  life:     { icon: '🌿', label: '생활·건강' },
  fun:      { icon: '🎲', label: '재미·운세' },
};

// 카테고리별 배지 스타일 (Tailwind 전체 클래스 — 동적 생성 금지)
// CATEGORY_COLORS에서 파생된 bg/text 매핑
const CATEGORY_BADGE_STYLE: Record<keyof typeof CATEGORY_COLORS, { bg: string; text: string }> = {
  salary:   { bg: 'bg-blue-50',    text: 'text-blue-700' },
  tax:      { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  property: { bg: 'bg-amber-50',   text: 'text-amber-700' },
  finance:  { bg: 'bg-violet-50',  text: 'text-violet-700' },
  life:     { bg: 'bg-cyan-50',    text: 'text-cyan-700' },
  fun:      { bg: 'bg-pink-50',    text: 'text-pink-700' },
};

type Props = {
  calc: Calculator;
  compact?: boolean;
};

export default function CalcCard({ calc, compact = false }: Props) {
  const catEmoji = CATEGORY_EMOJI[calc.categoryId];
  const badgeStyle = CATEGORY_BADGE_STYLE[calc.categoryId as keyof typeof CATEGORY_COLORS];

  return (
    <Link
      href={`/${calc.slug}`}
      className={`group bg-white border border-slate-200 rounded-2xl hover:border-orange-400 hover:shadow-md transition-all duration-200 flex flex-col gap-1 ${compact ? 'p-4' : 'p-5'}`}
    >
      {/* 카테고리 배지 */}
      {catEmoji && badgeStyle && (
        <span
          className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${badgeStyle.bg} ${badgeStyle.text} mb-1`}
        >
          {catEmoji.icon} {catEmoji.label}
        </span>
      )}

      {/* 계산기 이름 */}
      <p className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
        {calc.name}
      </p>

      {/* 한줄 설명 (compact 모드에서는 숨김) */}
      {!compact && (
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {calc.shortDesc}
        </p>
      )}

      {/* 인기·신규·매일 배지 */}
      {calc.badge && (
        <div className="mt-1">
          <Badge type={calc.badge} />
        </div>
      )}
    </Link>
  );
}
