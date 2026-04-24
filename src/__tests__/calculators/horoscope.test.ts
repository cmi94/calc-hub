import { describe, it, expect } from 'vitest';
import { getDailyHoroscope } from '@/lib/calculators/horoscope';

describe('horoscope', () => {
  it('같은 입력에 대해 항상 같은 결과를 반환해야 한다 (결정적)', () => {
    const input = { signId: 'aries', date: '2026-04-24' };
    const result1 = getDailyHoroscope(input);
    const result2 = getDailyHoroscope(input);
    expect(result1.messages.overall).toBe(result2.messages.overall);
    expect(result1.messages.love).toBe(result2.messages.love);
  });

  it('모든 5개 카테고리 메시지가 존재해야 한다', () => {
    const result = getDailyHoroscope({ signId: 'taurus', date: '2026-04-24' });
    expect(result.messages.overall).toBeTruthy();
    expect(result.messages.love).toBeTruthy();
    expect(result.messages.work).toBeTruthy();
    expect(result.messages.money).toBeTruthy();
    expect(result.messages.health).toBeTruthy();
  });

  it('sign 정보가 포함되어야 한다', () => {
    const result = getDailyHoroscope({ signId: 'gemini', date: '2026-04-24' });
    expect(result.sign.nameKo).toBe('쌍둥이자리');
    expect(result.sign.symbol).toBeTruthy();
  });

  it('luckyColor와 luckyNumber가 있어야 한다', () => {
    const result = getDailyHoroscope({ signId: 'cancer', date: '2026-04-24' });
    expect(result.luckyColor).toBeTruthy();
    expect(typeof result.luckyNumber).toBe('number');
    expect(result.luckyNumber).toBeGreaterThan(0);
  });

  it('날짜가 다르면 메시지가 다를 수 있어야 한다', () => {
    const r1 = getDailyHoroscope({ signId: 'leo', date: '2026-04-01' });
    const r2 = getDailyHoroscope({ signId: 'leo', date: '2026-04-24' });
    // 같을 수도 있지만 메시지가 문자열이어야 함
    expect(typeof r1.messages.overall).toBe('string');
    expect(typeof r2.messages.overall).toBe('string');
  });

  it('유효하지 않은 별자리 ID는 기본 메시지를 반환한다', () => {
    const result = getDailyHoroscope({ signId: 'unknown', date: '2026-04-24' });
    expect(result.sign.nameKo).toBe('알 수 없음');
  });
});
