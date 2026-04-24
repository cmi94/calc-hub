// src/lib/calculators/tarot.ts
// 오늘의 타로 (CALC-37)

import { TAROT_DECK } from '@/lib/data/tarotDeck';
import { simpleHash, hashShuffle } from '@/lib/utils/hash';

export type TarotInput = {
  question?: string;
  date: string;
  spreadType: 'one' | 'three' | 'celtic';
};

export type DrawnCard = {
  card: {
    nameKo: string;
    arcana: string;
    keywords: string[];
  };
  isReversed: boolean;
  meaning: string;
  position?: string;
};

export type TarotResult = {
  spreadType: string;
  cards: DrawnCard[];
  overallMessage: string;
};

const POSITIONS_THREE = ['과거', '현재', '미래'];
const POSITIONS_CELTIC = ['현재 상황', '도전', '근본', '과거', '가능성', '미래'];

const OVERALL_MESSAGES: Record<TarotInput['spreadType'], string[]> = {
  one: [
    '카드가 전하는 메시지에 귀를 기울여보세요.',
    '오늘 이 카드가 당신에게 꼭 필요한 이유가 있습니다.',
    '카드의 지혜를 통해 내면의 답을 찾아보세요.',
    '지금 이 순간 우주가 당신에게 보내는 신호입니다.',
    '카드 속에 오늘 당신에게 필요한 모든 것이 있습니다.',
  ],
  three: [
    '과거, 현재, 미래의 흐름 속에서 당신의 여정을 바라보세요.',
    '세 장의 카드가 이야기하는 당신의 이야기에 집중하세요.',
    '흐름을 이해하면 앞으로 나아갈 길이 보입니다.',
    '시간의 흐름 속에서 진정한 자신을 발견하세요.',
    '과거로부터 배우고 현재에 집중하여 미래를 열어가세요.',
  ],
  celtic: [
    '켈틱 십자 배열이 당신의 상황을 깊이 분석합니다.',
    '복잡한 상황 속에서 카드들이 길을 안내해줍니다.',
    '여러 관점에서 바라보면 전체 그림이 보입니다.',
    '각 카드의 메시지를 통합하여 현명한 결정을 내려보세요.',
    '우주가 당신의 질문에 다각적으로 답하고 있습니다.',
  ],
};

export function drawTarot(input: TarotInput): TarotResult {
  const seed = `${input.date}:${input.question ?? ''}:${input.spreadType}`;
  const shuffled = hashShuffle([...TAROT_DECK], seed);

  let cardCount: number;
  let positions: string[] | undefined;

  switch (input.spreadType) {
    case 'one':
      cardCount = 1;
      positions = undefined;
      break;
    case 'three':
      cardCount = 3;
      positions = POSITIONS_THREE;
      break;
    case 'celtic':
      cardCount = 5;
      positions = POSITIONS_CELTIC;
      break;
  }

  const drawn = shuffled.slice(0, cardCount);

  const cards: DrawnCard[] = drawn.map((card, idx) => {
    const reversedSeed = `${seed}:reversed:${idx}`;
    const isReversed = simpleHash(reversedSeed) % 2 === 0;
    const meaning = isReversed ? card.reversedMeaning : card.uprightMeaning;
    const position = positions?.[idx];

    return {
      card: {
        nameKo: card.nameKo,
        arcana: card.arcana,
        keywords: card.keywords,
      },
      isReversed,
      meaning,
      position,
    };
  });

  const msgSeed = simpleHash(`${seed}:overall`);
  const messages = OVERALL_MESSAGES[input.spreadType];
  const overallMessage = messages[msgSeed % messages.length];

  return {
    spreadType: input.spreadType,
    cards,
    overallMessage,
  };
}
