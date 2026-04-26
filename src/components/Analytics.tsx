'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CALCULATORS } from '@/lib/data/categories';

const GA_ID = 'G-V3ZRJ96QGC';

// slug → calculator 빠른 조회 (슬래시 포함 slug 지원: lotto/probability)
const CALC_BY_SLUG = Object.fromEntries(CALCULATORS.map((c) => [c.slug, c]));

declare global {
  interface Window {
    gtag: (cmd: string, action: string, params?: Record<string, unknown>) => void;
  }
}

function track(event: string, params: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}

function calcFromPathname(pathname: string) {
  // /lotto/probability → "lotto/probability" 우선, 없으면 "lotto"
  const full = pathname.replace(/^\//, '');
  return CALC_BY_SLUG[full] ?? CALC_BY_SLUG[full.split('/')[0]] ?? null;
}

export default function Analytics() {
  const pathname = usePathname();

  // 계산기 페이지 진입 이벤트
  useEffect(() => {
    const calc = calcFromPathname(pathname);
    if (!calc) return;
    track('calc_view', {
      calc_id: calc.id,
      calc_name: calc.name,
      calc_category: calc.categoryId,
      is_fun: calc.isFun,
      send_to: GA_ID,
    });
  }, [pathname]);

  // "계산하기" 버튼 클릭 이벤트 (이벤트 위임 — 계산기 파일 수정 없음)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest('button');
      if (!btn) return;
      if (!btn.textContent?.includes('계산하기')) return;

      const calc = calcFromPathname(window.location.pathname);
      track('calc_submit', {
        calc_id: calc?.id ?? 'unknown',
        calc_name: calc?.name ?? window.location.pathname,
        calc_category: calc?.categoryId ?? 'unknown',
        is_fun: calc?.isFun ?? false,
        send_to: GA_ID,
      });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
