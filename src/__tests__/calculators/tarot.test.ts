import { describe, it, expect } from 'vitest';
import { drawTarot } from '@/lib/calculators/tarot';
import { TAROT_DECK } from '@/lib/data/tarotDeck';

describe('tarot', () => {
  it('TAROT_DECK는 정확히 78장이어야 한다', () => {
    expect(TAROT_DECK).toHaveLength(78);
  });

  it("'one' 스프레드는 1장이어야 한다", () => {
    const result = drawTarot({ date: '2026-04-24', spreadType: 'one' });
    expect(result.cards).toHaveLength(1);
  });

  it("'three' 스프레드는 3장이어야 한다", () => {
    const result = drawTarot({ date: '2026-04-24', spreadType: 'three' });
    expect(result.cards).toHaveLength(3);
  });

  it("'celtic' 스프레드는 5장이어야 한다", () => {
    const result = drawTarot({ date: '2026-04-24', spreadType: 'celtic' });
    expect(result.cards).toHaveLength(5);
  });

  it('중복 카드가 없어야 한다', () => {
    const result = drawTarot({ date: '2026-04-24', spreadType: 'three' });
    const names = result.cards.map((c) => c.card.nameKo);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it('같은 입력에 대해 항상 같은 카드가 나와야 한다 (결정적)', () => {
    const input = { date: '2026-04-24', spreadType: 'three' as const };
    const r1 = drawTarot(input);
    const r2 = drawTarot(input);
    expect(r1.cards[0].card.nameKo).toBe(r2.cards[0].card.nameKo);
    expect(r1.cards[1].card.nameKo).toBe(r2.cards[1].card.nameKo);
  });

  it('three 스프레드의 카드에 position이 있어야 한다', () => {
    const result = drawTarot({ date: '2026-04-24', spreadType: 'three' });
    expect(result.cards[0].position).toBe('과거');
    expect(result.cards[1].position).toBe('현재');
    expect(result.cards[2].position).toBe('미래');
  });

  it('카드에 meaning이 있어야 한다', () => {
    const result = drawTarot({ date: '2026-04-24', spreadType: 'one' });
    expect(result.cards[0].meaning).toBeTruthy();
    expect(result.cards[0].card.keywords).toHaveLength(3);
  });
});
