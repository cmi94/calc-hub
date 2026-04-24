// src/components/cards/Badge.tsx
// 계산기 배지 컴포넌트

type BadgeType = 'new' | 'popular' | 'daily';

const BADGE_CONFIG: Record<BadgeType, { label: string; className: string }> = {
  new:     { label: 'NEW',    className: 'bg-green-100 text-green-700' },
  popular: { label: '🔥 인기', className: 'bg-orange-100 text-orange-700' },
  daily:   { label: '📅 매일', className: 'bg-purple-100 text-purple-700' },
};

export default function Badge({ type }: { type: BadgeType }) {
  const config = BADGE_CONFIG[type];
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${config.className}`}
    >
      {config.label}
    </span>
  );
}
