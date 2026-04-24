// src/lib/data/tarotDeck.ts
// 타로 카드 78장 데이터

export type TarotCard = {
  id: number;
  name: string;
  nameKo: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
};

export const TAROT_DECK: TarotCard[] = [
  // === 메이저 아르카나 22장 ===
  {
    id: 0, name: 'The Fool', nameKo: '바보', arcana: 'major', number: 0,
    uprightMeaning: '새로운 시작과 순수한 마음으로 도약할 때입니다.',
    reversedMeaning: '무모한 결정이나 준비 없는 행동을 조심하세요.',
    keywords: ['새출발', '자유', '순수'],
  },
  {
    id: 1, name: 'The Magician', nameKo: '마법사', arcana: 'major', number: 1,
    uprightMeaning: '재능과 의지력으로 원하는 것을 이뤄낼 수 있습니다.',
    reversedMeaning: '능력을 낭비하거나 사기에 주의해야 합니다.',
    keywords: ['능력', '의지', '창조'],
  },
  {
    id: 2, name: 'The High Priestess', nameKo: '여사제', arcana: 'major', number: 2,
    uprightMeaning: '직관을 믿고 내면의 지혜를 따르세요.',
    reversedMeaning: '비밀이 드러나거나 직관을 무시하고 있습니다.',
    keywords: ['직관', '신비', '내면'],
  },
  {
    id: 3, name: 'The Empress', nameKo: '여황제', arcana: 'major', number: 3,
    uprightMeaning: '풍요로움과 창조의 에너지가 넘치는 시기입니다.',
    reversedMeaning: '창의성이 막히거나 과도한 의존이 문제입니다.',
    keywords: ['풍요', '창조', '모성'],
  },
  {
    id: 4, name: 'The Emperor', nameKo: '황제', arcana: 'major', number: 4,
    uprightMeaning: '체계적인 노력과 리더십으로 안정을 구축하세요.',
    reversedMeaning: '권위주의적 태도나 지나친 통제가 문제입니다.',
    keywords: ['권위', '안정', '리더십'],
  },
  {
    id: 5, name: 'The Hierophant', nameKo: '교황', arcana: 'major', number: 5,
    uprightMeaning: '전통과 믿음 안에서 정신적 가르침을 받을 때입니다.',
    reversedMeaning: '규범에 저항하거나 관습을 거부하고 싶은 마음입니다.',
    keywords: ['전통', '믿음', '가르침'],
  },
  {
    id: 6, name: 'The Lovers', nameKo: '연인', arcana: 'major', number: 6,
    uprightMeaning: '중요한 선택과 사랑의 결합이 이루어집니다.',
    reversedMeaning: '잘못된 선택이나 관계의 불균형이 생깁니다.',
    keywords: ['사랑', '선택', '조화'],
  },
  {
    id: 7, name: 'The Chariot', nameKo: '전차', arcana: 'major', number: 7,
    uprightMeaning: '강한 의지와 집중으로 승리를 거머쥘 수 있습니다.',
    reversedMeaning: '방향을 잃거나 자기 통제가 어렵습니다.',
    keywords: ['승리', '의지', '추진력'],
  },
  {
    id: 8, name: 'Strength', nameKo: '힘', arcana: 'major', number: 8,
    uprightMeaning: '내면의 용기와 인내로 어려움을 극복합니다.',
    reversedMeaning: '자신감 부족이나 감정 조절에 어려움을 겪습니다.',
    keywords: ['용기', '인내', '자제'],
  },
  {
    id: 9, name: 'The Hermit', nameKo: '은둔자', arcana: 'major', number: 9,
    uprightMeaning: '내면을 돌아보고 진정한 자아를 탐구할 시간입니다.',
    reversedMeaning: '지나친 고립이나 사회로부터의 도피가 우려됩니다.',
    keywords: ['성찰', '고독', '지혜'],
  },
  {
    id: 10, name: 'Wheel of Fortune', nameKo: '운명의 바퀴', arcana: 'major', number: 10,
    uprightMeaning: '운명의 전환점, 행운이 찾아오는 시기입니다.',
    reversedMeaning: '예상치 못한 변화나 불운이 찾아올 수 있습니다.',
    keywords: ['운명', '변화', '행운'],
  },
  {
    id: 11, name: 'Justice', nameKo: '정의', arcana: 'major', number: 11,
    uprightMeaning: '공정한 판단과 균형이 중요한 시기입니다.',
    reversedMeaning: '불공평한 상황이나 잘못된 판단을 조심하세요.',
    keywords: ['공정', '균형', '진실'],
  },
  {
    id: 12, name: 'The Hanged Man', nameKo: '매달린 사람', arcana: 'major', number: 12,
    uprightMeaning: '자발적 희생과 다른 관점에서 상황을 바라보세요.',
    reversedMeaning: '희생을 거부하거나 지연으로 손해가 생깁니다.',
    keywords: ['희생', '기다림', '관점전환'],
  },
  {
    id: 13, name: 'Death', nameKo: '죽음', arcana: 'major', number: 13,
    uprightMeaning: '낡은 것을 끝내고 새로운 변화가 시작됩니다.',
    reversedMeaning: '변화에 저항하며 과거에 집착하고 있습니다.',
    keywords: ['변화', '끝', '전환'],
  },
  {
    id: 14, name: 'Temperance', nameKo: '절제', arcana: 'major', number: 14,
    uprightMeaning: '균형과 조화로 인내하며 목표를 향해 나아가세요.',
    reversedMeaning: '과잉이나 불균형으로 인해 갈등이 생깁니다.',
    keywords: ['균형', '절제', '조화'],
  },
  {
    id: 15, name: 'The Devil', nameKo: '악마', arcana: 'major', number: 15,
    uprightMeaning: '물질적 집착이나 습관에 묶여있는 상태입니다.',
    reversedMeaning: '속박에서 벗어나 자유를 되찾을 수 있습니다.',
    keywords: ['집착', '유혹', '속박'],
  },
  {
    id: 16, name: 'The Tower', nameKo: '탑', arcana: 'major', number: 16,
    uprightMeaning: '갑작스런 변화와 혼란이 기존 구조를 무너뜨립니다.',
    reversedMeaning: '재앙을 피하거나 변화가 지연되고 있습니다.',
    keywords: ['혼란', '붕괴', '계시'],
  },
  {
    id: 17, name: 'The Star', nameKo: '별', arcana: 'major', number: 17,
    uprightMeaning: '희망과 치유의 빛이 어둠을 밝혀줍니다.',
    reversedMeaning: '희망을 잃고 자신감이 낮아진 상태입니다.',
    keywords: ['희망', '치유', '영감'],
  },
  {
    id: 18, name: 'The Moon', nameKo: '달', arcana: 'major', number: 18,
    uprightMeaning: '불안과 환상 속에서 진실을 찾아야 합니다.',
    reversedMeaning: '혼란이 걷히고 진실이 서서히 드러납니다.',
    keywords: ['무의식', '환상', '불안'],
  },
  {
    id: 19, name: 'The Sun', nameKo: '태양', arcana: 'major', number: 19,
    uprightMeaning: '기쁨과 성공, 긍정적인 에너지가 넘칩니다.',
    reversedMeaning: '일시적인 좌절이나 과도한 낙관주의를 조심하세요.',
    keywords: ['기쁨', '성공', '활력'],
  },
  {
    id: 20, name: 'Judgement', nameKo: '심판', arcana: 'major', number: 20,
    uprightMeaning: '과거를 돌아보고 새로운 부름에 응답할 때입니다.',
    reversedMeaning: '자기반성을 회피하거나 기회를 놓치고 있습니다.',
    keywords: ['재탄생', '반성', '부름'],
  },
  {
    id: 21, name: 'The World', nameKo: '세계', arcana: 'major', number: 21,
    uprightMeaning: '완성과 성취, 목표를 이루고 새 여정을 준비합니다.',
    reversedMeaning: '완성에 아직 미치지 못하거나 지연이 있습니다.',
    keywords: ['완성', '성취', '통합'],
  },

  // === 마이너 아르카나: 완드(Wands/불) 14장 ===
  {
    id: 22, name: 'Ace of Wands', nameKo: '완드 에이스', arcana: 'minor', suit: 'wands', number: 1,
    uprightMeaning: '새로운 열정과 창의적 프로젝트가 시작됩니다.',
    reversedMeaning: '에너지 부족이나 창의력 막힘을 경험합니다.',
    keywords: ['열정', '시작', '창의'],
  },
  {
    id: 23, name: 'Two of Wands', nameKo: '완드 2', arcana: 'minor', suit: 'wands', number: 2,
    uprightMeaning: '미래 계획을 세우고 새로운 도전을 준비하세요.',
    reversedMeaning: '계획이 지연되거나 두려움으로 행동을 미룹니다.',
    keywords: ['계획', '비전', '결정'],
  },
  {
    id: 24, name: 'Three of Wands', nameKo: '완드 3', arcana: 'minor', suit: 'wands', number: 3,
    uprightMeaning: '노력의 결실이 보이기 시작하고 확장이 가능합니다.',
    reversedMeaning: '기대했던 결과가 늦어지거나 장애물이 있습니다.',
    keywords: ['확장', '성장', '전망'],
  },
  {
    id: 25, name: 'Four of Wands', nameKo: '완드 4', arcana: 'minor', suit: 'wands', number: 4,
    uprightMeaning: '축하와 안정, 공동체의 화합이 이루어집니다.',
    reversedMeaning: '불안정하거나 축하가 미루어지는 상황입니다.',
    keywords: ['축하', '안정', '화합'],
  },
  {
    id: 26, name: 'Five of Wands', nameKo: '완드 5', arcana: 'minor', suit: 'wands', number: 5,
    uprightMeaning: '경쟁과 갈등이 있지만 이를 통해 성장합니다.',
    reversedMeaning: '갈등을 피하거나 해결의 실마리를 찾습니다.',
    keywords: ['경쟁', '갈등', '도전'],
  },
  {
    id: 27, name: 'Six of Wands', nameKo: '완드 6', arcana: 'minor', suit: 'wands', number: 6,
    uprightMeaning: '노력이 인정받고 승리와 성공을 경험합니다.',
    reversedMeaning: '인정받지 못하거나 자만심이 문제가 됩니다.',
    keywords: ['승리', '인정', '자신감'],
  },
  {
    id: 28, name: 'Seven of Wands', nameKo: '완드 7', arcana: 'minor', suit: 'wands', number: 7,
    uprightMeaning: '도전에 맞서 자신의 입장을 굳건히 지키세요.',
    reversedMeaning: '압박감에 굴복하거나 포기하려는 마음이 생깁니다.',
    keywords: ['방어', '도전', '끈기'],
  },
  {
    id: 29, name: 'Eight of Wands', nameKo: '완드 8', arcana: 'minor', suit: 'wands', number: 8,
    uprightMeaning: '빠른 진전과 소식, 상황이 빠르게 움직입니다.',
    reversedMeaning: '지연이나 오해, 급한 결정으로 문제가 생깁니다.',
    keywords: ['속도', '진전', '소통'],
  },
  {
    id: 30, name: 'Nine of Wands', nameKo: '완드 9', arcana: 'minor', suit: 'wands', number: 9,
    uprightMeaning: '지쳐있지만 마지막 힘을 내어 버텨낼 수 있습니다.',
    reversedMeaning: '과도한 경계심이나 고집이 발목을 잡습니다.',
    keywords: ['인내', '방어', '회복력'],
  },
  {
    id: 31, name: 'Ten of Wands', nameKo: '완드 10', arcana: 'minor', suit: 'wands', number: 10,
    uprightMeaning: '무거운 책임과 부담을 지고 있지만 끝이 보입니다.',
    reversedMeaning: '짐을 내려놓고 도움을 요청해야 할 때입니다.',
    keywords: ['부담', '책임', '완수'],
  },
  {
    id: 32, name: 'Page of Wands', nameKo: '완드 시동', arcana: 'minor', suit: 'wands', number: 11,
    uprightMeaning: '호기심과 열정으로 새로운 모험을 시작합니다.',
    reversedMeaning: '산만하거나 방향 없는 에너지를 낭비합니다.',
    keywords: ['탐험', '열정', '소식'],
  },
  {
    id: 33, name: 'Knight of Wands', nameKo: '완드 기사', arcana: 'minor', suit: 'wands', number: 12,
    uprightMeaning: '충동적이지만 강한 에너지로 목표를 향해 달려갑니다.',
    reversedMeaning: '무모한 행동이나 분산된 에너지가 문제입니다.',
    keywords: ['행동', '충동', '모험'],
  },
  {
    id: 34, name: 'Queen of Wands', nameKo: '완드 여왕', arcana: 'minor', suit: 'wands', number: 13,
    uprightMeaning: '자신감 넘치고 매력적인 리더십을 발휘합니다.',
    reversedMeaning: '질투심이나 과도한 자기중심적 태도가 보입니다.',
    keywords: ['자신감', '카리스마', '독립'],
  },
  {
    id: 35, name: 'King of Wands', nameKo: '완드 왕', arcana: 'minor', suit: 'wands', number: 14,
    uprightMeaning: '비전을 가진 강력한 리더로 주변을 이끕니다.',
    reversedMeaning: '독재적이거나 충동적인 결정이 문제입니다.',
    keywords: ['리더십', '비전', '열정'],
  },

  // === 마이너 아르카나: 컵(Cups/물) 14장 ===
  {
    id: 36, name: 'Ace of Cups', nameKo: '컵 에이스', arcana: 'minor', suit: 'cups', number: 1,
    uprightMeaning: '새로운 감정과 사랑, 직관의 시작을 알립니다.',
    reversedMeaning: '감정이 막히거나 내면의 공허함을 느낍니다.',
    keywords: ['사랑', '감정', '직관'],
  },
  {
    id: 37, name: 'Two of Cups', nameKo: '컵 2', arcana: 'minor', suit: 'cups', number: 2,
    uprightMeaning: '두 사람 사이의 특별한 유대와 파트너십이 생깁니다.',
    reversedMeaning: '관계의 불균형이나 단절이 일어납니다.',
    keywords: ['파트너십', '조화', '연결'],
  },
  {
    id: 38, name: 'Three of Cups', nameKo: '컵 3', arcana: 'minor', suit: 'cups', number: 3,
    uprightMeaning: '친구들과의 축하, 기쁨과 우정이 넘칩니다.',
    reversedMeaning: '과도한 방종이나 험담, 삼각관계가 생깁니다.',
    keywords: ['우정', '축하', '공동체'],
  },
  {
    id: 39, name: 'Four of Cups', nameKo: '컵 4', arcana: 'minor', suit: 'cups', number: 4,
    uprightMeaning: '현재에 불만족하며 새로운 가능성을 보지 못합니다.',
    reversedMeaning: '무기력에서 벗어나 새로운 관심사를 찾습니다.',
    keywords: ['무관심', '성찰', '재평가'],
  },
  {
    id: 40, name: 'Five of Cups', nameKo: '컵 5', arcana: 'minor', suit: 'cups', number: 5,
    uprightMeaning: '상실감과 후회가 있지만 아직 남은 것이 있습니다.',
    reversedMeaning: '슬픔에서 회복하고 앞으로 나아갑니다.',
    keywords: ['슬픔', '상실', '후회'],
  },
  {
    id: 41, name: 'Six of Cups', nameKo: '컵 6', arcana: 'minor', suit: 'cups', number: 6,
    uprightMeaning: '과거의 추억과 순수함이 현재에 영향을 줍니다.',
    reversedMeaning: '과거에 집착하거나 현실을 외면합니다.',
    keywords: ['추억', '순수', '향수'],
  },
  {
    id: 42, name: 'Seven of Cups', nameKo: '컵 7', arcana: 'minor', suit: 'cups', number: 7,
    uprightMeaning: '많은 선택지 앞에 상상력이 풍부하지만 혼란스럽습니다.',
    reversedMeaning: '환상에서 깨어나 현실적인 선택을 합니다.',
    keywords: ['선택', '환상', '상상'],
  },
  {
    id: 43, name: 'Eight of Cups', nameKo: '컵 8', arcana: 'minor', suit: 'cups', number: 8,
    uprightMeaning: '더 이상 만족하지 못해 익숙한 것을 떠납니다.',
    reversedMeaning: '미련을 버리지 못하거나 적절치 않은 복귀를 합니다.',
    keywords: ['이별', '여정', '포기'],
  },
  {
    id: 44, name: 'Nine of Cups', nameKo: '컵 9', arcana: 'minor', suit: 'cups', number: 9,
    uprightMeaning: '소원이 이루어지고 만족스러운 결과를 얻습니다.',
    reversedMeaning: '물질적 만족에 집착하거나 욕심이 문제입니다.',
    keywords: ['소원성취', '만족', '행복'],
  },
  {
    id: 45, name: 'Ten of Cups', nameKo: '컵 10', arcana: 'minor', suit: 'cups', number: 10,
    uprightMeaning: '가족과 사랑 안에서 진정한 행복을 누립니다.',
    reversedMeaning: '가족 갈등이나 이상과 현실의 괴리가 있습니다.',
    keywords: ['행복', '가족', '충족'],
  },
  {
    id: 46, name: 'Page of Cups', nameKo: '컵 시동', arcana: 'minor', suit: 'cups', number: 11,
    uprightMeaning: '감성적이고 창의적인 소식이나 영감이 옵니다.',
    reversedMeaning: '감정적으로 미성숙하거나 공상에 빠집니다.',
    keywords: ['감성', '창의', '영감'],
  },
  {
    id: 47, name: 'Knight of Cups', nameKo: '컵 기사', arcana: 'minor', suit: 'cups', number: 12,
    uprightMeaning: '낭만적이고 매력적인 제안이나 사람이 나타납니다.',
    reversedMeaning: '비현실적이거나 감정적으로 불안정합니다.',
    keywords: ['낭만', '이상주의', '제안'],
  },
  {
    id: 48, name: 'Queen of Cups', nameKo: '컵 여왕', arcana: 'minor', suit: 'cups', number: 13,
    uprightMeaning: '깊은 공감과 감성으로 주변을 따뜻하게 돌봅니다.',
    reversedMeaning: '지나친 감정이입이나 감정 조절이 어렵습니다.',
    keywords: ['공감', '직관', '돌봄'],
  },
  {
    id: 49, name: 'King of Cups', nameKo: '컵 왕', arcana: 'minor', suit: 'cups', number: 14,
    uprightMeaning: '감정을 현명하게 조절하며 균형 있게 이끕니다.',
    reversedMeaning: '감정이 폭발하거나 조종하려는 경향이 있습니다.',
    keywords: ['감정조절', '현명함', '균형'],
  },

  // === 마이너 아르카나: 검(Swords/공기) 14장 ===
  {
    id: 50, name: 'Ace of Swords', nameKo: '검 에이스', arcana: 'minor', suit: 'swords', number: 1,
    uprightMeaning: '명확한 사고와 진실의 힘으로 돌파구를 찾습니다.',
    reversedMeaning: '혼란스러운 생각이나 잘못된 판단이 문제입니다.',
    keywords: ['명확성', '진실', '돌파'],
  },
  {
    id: 51, name: 'Two of Swords', nameKo: '검 2', arcana: 'minor', suit: 'swords', number: 2,
    uprightMeaning: '어려운 결정 앞에 정보를 차단하며 균형을 유지합니다.',
    reversedMeaning: '갈등이 표면화되거나 진실을 피하려 합니다.',
    keywords: ['결단', '교착', '균형'],
  },
  {
    id: 52, name: 'Three of Swords', nameKo: '검 3', arcana: 'minor', suit: 'swords', number: 3,
    uprightMeaning: '상처와 이별, 슬픔의 시기이지만 치유가 시작됩니다.',
    reversedMeaning: '상처를 극복하고 점차 회복하고 있습니다.',
    keywords: ['상처', '이별', '슬픔'],
  },
  {
    id: 53, name: 'Four of Swords', nameKo: '검 4', arcana: 'minor', suit: 'swords', number: 4,
    uprightMeaning: '휴식과 회복, 잠시 물러서 에너지를 충전하세요.',
    reversedMeaning: '억지로 쉬지 못하거나 무기력함이 있습니다.',
    keywords: ['휴식', '명상', '회복'],
  },
  {
    id: 54, name: 'Five of Swords', nameKo: '검 5', arcana: 'minor', suit: 'swords', number: 5,
    uprightMeaning: '승리했지만 누군가의 희생이 따랐습니다.',
    reversedMeaning: '갈등에서 벗어나거나 화해의 기회가 옵니다.',
    keywords: ['갈등', '승리', '대가'],
  },
  {
    id: 55, name: 'Six of Swords', nameKo: '검 6', arcana: 'minor', suit: 'swords', number: 6,
    uprightMeaning: '어려운 상황을 벗어나 더 나은 곳으로 나아갑니다.',
    reversedMeaning: '변화를 거부하거나 이동이 어려운 상황입니다.',
    keywords: ['이동', '회복', '전환'],
  },
  {
    id: 56, name: 'Seven of Swords', nameKo: '검 7', arcana: 'minor', suit: 'swords', number: 7,
    uprightMeaning: '전략적 사고가 필요하지만 기만이 있을 수 있습니다.',
    reversedMeaning: '숨겨진 것이 드러나거나 양심의 가책이 생깁니다.',
    keywords: ['전략', '기만', '회피'],
  },
  {
    id: 57, name: 'Eight of Swords', nameKo: '검 8', arcana: 'minor', suit: 'swords', number: 8,
    uprightMeaning: '스스로 만든 제약과 두려움에 갇혀 있습니다.',
    reversedMeaning: '자기 제약에서 벗어나 자유를 찾을 수 있습니다.',
    keywords: ['구속', '두려움', '제약'],
  },
  {
    id: 58, name: 'Nine of Swords', nameKo: '검 9', arcana: 'minor', suit: 'swords', number: 9,
    uprightMeaning: '불안과 걱정이 밤잠을 설치게 하고 있습니다.',
    reversedMeaning: '최악의 상황은 지나가고 희망이 보입니다.',
    keywords: ['불안', '걱정', '악몽'],
  },
  {
    id: 59, name: 'Ten of Swords', nameKo: '검 10', arcana: 'minor', suit: 'swords', number: 10,
    uprightMeaning: '고통스러운 끝이지만 새로운 시작이 기다립니다.',
    reversedMeaning: '최악에서 회복하며 서서히 일어섭니다.',
    keywords: ['끝', '배신', '재기'],
  },
  {
    id: 60, name: 'Page of Swords', nameKo: '검 시동', arcana: 'minor', suit: 'swords', number: 11,
    uprightMeaning: '날카로운 호기심으로 진실을 탐구하려 합니다.',
    reversedMeaning: '가십이나 험담, 성급한 판단이 문제입니다.',
    keywords: ['호기심', '경계', '소통'],
  },
  {
    id: 61, name: 'Knight of Swords', nameKo: '검 기사', arcana: 'minor', suit: 'swords', number: 12,
    uprightMeaning: '빠르고 단호하게 목표를 향해 돌진합니다.',
    reversedMeaning: '무모하거나 공격적인 행동이 화를 부릅니다.',
    keywords: ['결단력', '속도', '직접성'],
  },
  {
    id: 62, name: 'Queen of Swords', nameKo: '검 여왕', arcana: 'minor', suit: 'swords', number: 13,
    uprightMeaning: '독립적이고 명석한 사고로 정확하게 판단합니다.',
    reversedMeaning: '냉정함이 지나쳐 차갑거나 잔인하게 보입니다.',
    keywords: ['명석함', '독립', '직언'],
  },
  {
    id: 63, name: 'King of Swords', nameKo: '검 왕', arcana: 'minor', suit: 'swords', number: 14,
    uprightMeaning: '지적 권위와 공정한 판단으로 이끌어 나갑니다.',
    reversedMeaning: '권위를 남용하거나 냉혹한 결정을 내립니다.',
    keywords: ['권위', '지성', '공정'],
  },

  // === 마이너 아르카나: 펜타클(Pentacles/땅) 14장 ===
  {
    id: 64, name: 'Ace of Pentacles', nameKo: '펜타클 에이스', arcana: 'minor', suit: 'pentacles', number: 1,
    uprightMeaning: '새로운 물질적 기회와 재정적 시작이 옵니다.',
    reversedMeaning: '기회를 놓치거나 재정 계획이 어긋납니다.',
    keywords: ['기회', '풍요', '시작'],
  },
  {
    id: 65, name: 'Two of Pentacles', nameKo: '펜타클 2', arcana: 'minor', suit: 'pentacles', number: 2,
    uprightMeaning: '여러 일을 균형 있게 처리하며 유연하게 대처합니다.',
    reversedMeaning: '과부하나 재정 불균형으로 혼란스럽습니다.',
    keywords: ['균형', '적응', '멀티태스킹'],
  },
  {
    id: 66, name: 'Three of Pentacles', nameKo: '펜타클 3', arcana: 'minor', suit: 'pentacles', number: 3,
    uprightMeaning: '팀워크와 협력으로 뛰어난 결과물을 만듭니다.',
    reversedMeaning: '협력이 부족하거나 노력이 인정받지 못합니다.',
    keywords: ['협력', '기술', '인정'],
  },
  {
    id: 67, name: 'Four of Pentacles', nameKo: '펜타클 4', arcana: 'minor', suit: 'pentacles', number: 4,
    uprightMeaning: '재정적 안정을 위해 절약하지만 지나친 집착이 있습니다.',
    reversedMeaning: '인색함에서 벗어나 더 넓게 나눌 수 있습니다.',
    keywords: ['안정', '집착', '절약'],
  },
  {
    id: 68, name: 'Five of Pentacles', nameKo: '펜타클 5', arcana: 'minor', suit: 'pentacles', number: 5,
    uprightMeaning: '재정적 어려움이나 소외감을 느끼는 시기입니다.',
    reversedMeaning: '어려운 시기가 끝나고 회복이 시작됩니다.',
    keywords: ['곤궁', '소외', '어려움'],
  },
  {
    id: 69, name: 'Six of Pentacles', nameKo: '펜타클 6', arcana: 'minor', suit: 'pentacles', number: 6,
    uprightMeaning: '나눔과 관대함, 공정한 보상이 이루어집니다.',
    reversedMeaning: '불공평한 대우나 조건부 도움에 주의하세요.',
    keywords: ['나눔', '관대함', '보상'],
  },
  {
    id: 70, name: 'Seven of Pentacles', nameKo: '펜타클 7', arcana: 'minor', suit: 'pentacles', number: 7,
    uprightMeaning: '인내하며 기다리면 노력의 결실을 거둡니다.',
    reversedMeaning: '노력에 비해 결과가 없거나 방향을 재검토해야 합니다.',
    keywords: ['인내', '투자', '성장'],
  },
  {
    id: 71, name: 'Eight of Pentacles', nameKo: '펜타클 8', arcana: 'minor', suit: 'pentacles', number: 8,
    uprightMeaning: '기술을 연마하고 꾸준한 노력으로 장인이 됩니다.',
    reversedMeaning: '단조로움이나 목적 없는 반복 작업이 문제입니다.',
    keywords: ['노력', '기술', '장인정신'],
  },
  {
    id: 72, name: 'Nine of Pentacles', nameKo: '펜타클 9', arcana: 'minor', suit: 'pentacles', number: 9,
    uprightMeaning: '독립적이고 풍요로운 삶을 즐기는 시기입니다.',
    reversedMeaning: '자기 가치를 과소평가하거나 낭비가 심합니다.',
    keywords: ['독립', '풍요', '자족'],
  },
  {
    id: 73, name: 'Ten of Pentacles', nameKo: '펜타클 10', arcana: 'minor', suit: 'pentacles', number: 10,
    uprightMeaning: '세대를 이어가는 풍요와 가족의 안정을 누립니다.',
    reversedMeaning: '가족 갈등이나 유산 분쟁이 생길 수 있습니다.',
    keywords: ['유산', '안정', '전통'],
  },
  {
    id: 74, name: 'Page of Pentacles', nameKo: '펜타클 시동', arcana: 'minor', suit: 'pentacles', number: 11,
    uprightMeaning: '새로운 기술이나 공부를 시작하며 미래를 준비합니다.',
    reversedMeaning: '게으름이나 비현실적인 목표가 문제입니다.',
    keywords: ['학습', '기회', '실용'],
  },
  {
    id: 75, name: 'Knight of Pentacles', nameKo: '펜타클 기사', arcana: 'minor', suit: 'pentacles', number: 12,
    uprightMeaning: '꼼꼼하고 책임감 있게 목표를 향해 나아갑니다.',
    reversedMeaning: '지나치게 보수적이거나 변화에 저항합니다.',
    keywords: ['책임감', '신뢰성', '꼼꼼함'],
  },
  {
    id: 76, name: 'Queen of Pentacles', nameKo: '펜타클 여왕', arcana: 'minor', suit: 'pentacles', number: 13,
    uprightMeaning: '실용적이고 따뜻하게 가정과 일을 모두 돌봅니다.',
    reversedMeaning: '일과 가정의 균형이 무너지거나 탐욕이 생깁니다.',
    keywords: ['실용적', '돌봄', '풍요'],
  },
  {
    id: 77, name: 'King of Pentacles', nameKo: '펜타클 왕', arcana: 'minor', suit: 'pentacles', number: 14,
    uprightMeaning: '풍요와 성공, 안정된 물질적 기반 위에 서 있습니다.',
    reversedMeaning: '탐욕이나 물질주의로 인해 인간관계가 상합니다.',
    keywords: ['성공', '안정', '물질'],
  },
];
