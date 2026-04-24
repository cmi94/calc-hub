// src/lib/data/categories.ts
// 다계스탄 계산기 레지스트리 — 카테고리 + 49종 계산기

export type SubCategory = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;       // Lucide 아이콘명
  color: string;      // Tailwind 컬러 프리픽스 (blue, emerald, amber, violet, cyan, pink)
  subCategories?: SubCategory[];
};

export type Calculator = {
  id: string;           // "CALC-01"
  slug: string;         // URL 경로 (앞의 / 제외)
  name: string;         // 한글 표시명
  shortDesc: string;    // 한줄 설명 (카드용, 30자 이내)
  categoryId: string;
  subCategoryId?: string;
  phase: number;
  tags: string[];       // 검색 키워드 (초성 검색용 포함)
  badge?: 'new' | 'popular' | 'daily';
  revisitType?: 'daily' | 'weekly' | 'seasonal' | null;
  isFun: boolean;
};

// ─── 카테고리 ──────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  {
    id: 'salary',
    name: '급여·근로',
    icon: 'Wallet',
    color: 'blue',
  },
  {
    id: 'tax',
    name: '세무',
    icon: 'Receipt',
    color: 'emerald',
  },
  {
    id: 'property',
    name: '부동산',
    icon: 'Home',
    color: 'amber',
  },
  {
    id: 'finance',
    name: '금융·대출',
    icon: 'TrendingUp',
    color: 'violet',
  },
  {
    id: 'life',
    name: '생활·건강',
    icon: 'Heart',
    color: 'cyan',
  },
  {
    id: 'fun',
    name: '재미·운세',
    icon: 'Sparkles',
    color: 'pink',
    subCategories: [
      { id: 'fortune', name: '운세·사주' },
      { id: 'compatibility', name: '궁합' },
      { id: 'mbti', name: 'MBTI' },
      { id: 'lotto', name: '로또' },
      { id: 'name', name: '이름·성명' },
      { id: 'etc', name: '기타' },
    ],
  },
];

// ─── 계산기 레지스트리 ──────────────────────────────────────────────
export const CALCULATORS: Calculator[] = [
  // ── 급여·근로 ──────────────────────────────────────────────────
  {
    id: 'CALC-01',
    slug: 'salary',
    name: '연봉 실수령액 계산기',
    shortDesc: '연봉에서 실제 받는 월급은?',
    categoryId: 'salary',
    phase: 1,
    badge: 'popular',
    isFun: false,
    tags: ['연봉', '실수령액', '월급', '4대보험', '세금', '급여', 'ㅇㅂ', 'ㅅㅅㄹㅇ', '근로소득세'],
  },
  {
    id: 'CALC-02',
    slug: 'retirement',
    name: '퇴직금 계산기',
    shortDesc: '퇴직금 얼마 받을 수 있을까?',
    categoryId: 'salary',
    phase: 1,
    isFun: false,
    tags: ['퇴직금', '퇴직', '퇴사', 'ㅌㅈㄱ', '평균임금', '근속기간'],
  },
  {
    id: 'CALC-03',
    slug: 'weekly-holiday-pay',
    name: '주휴수당 계산기',
    shortDesc: '주휴수당 자동 계산',
    categoryId: 'salary',
    phase: 1,
    isFun: false,
    tags: ['주휴수당', '주휴', 'ㅈㅎㅅㄷ', '시급', '알바', '파트타임', '근무시간'],
  },
  {
    id: 'CALC-08',
    slug: 'unemployment-benefit',
    name: '실업급여 계산기',
    shortDesc: '실업급여 예상 금액 확인',
    categoryId: 'salary',
    phase: 1,
    isFun: false,
    tags: ['실업급여', '구직급여', '실업', 'ㅅㅇㄱㅇ', '고용보험', '실직', '이직확인서'],
  },
  {
    id: 'CALC-13',
    slug: 'hourly-wage',
    name: '시급 계산기',
    shortDesc: '시급으로 월급·연봉 환산',
    categoryId: 'salary',
    phase: 1,
    badge: 'popular',
    isFun: false,
    tags: ['시급', '최저시급', '알바', 'ㅅㄱ', '월급', '일급', '주급', '최저임금'],
  },

  // ── 세무 ──────────────────────────────────────────────────────
  {
    id: 'CALC-07',
    slug: 'income-tax',
    name: '종합소득세 계산기',
    shortDesc: '종소세 간편 계산',
    categoryId: 'tax',
    phase: 1,
    isFun: false,
    tags: ['종합소득세', '종소세', 'ㅈㅎㅅㄷㅅ', '프리랜서', '사업소득', '세금', '확정신고'],
  },
  {
    id: 'CALC-10',
    slug: 'gift-tax',
    name: '증여세 계산기',
    shortDesc: '증여세 얼마나 낼까?',
    categoryId: 'tax',
    phase: 1,
    isFun: false,
    tags: ['증여세', '증여', 'ㅈㅇㅅ', '부모자식', '공제', '세금', '부동산증여'],
  },
  {
    id: 'CALC-17',
    slug: 'capital-gains-tax',
    name: '양도소득세 계산기',
    shortDesc: '부동산 양도세 계산',
    categoryId: 'tax',
    phase: 2,
    isFun: false,
    tags: ['양도소득세', '양도세', 'ㅇㄷㅅㄷㅅ', '부동산', '주택', '비과세', '장기보유'],
  },
  {
    id: 'CALC-18',
    slug: 'year-end-tax',
    name: '연말정산 환급액 계산기',
    shortDesc: '13월의 월급 얼마?',
    categoryId: 'tax',
    phase: 2,
    isFun: false,
    tags: ['연말정산', '환급', 'ㅇㅁㅈㅅ', '세금환급', '소득공제', '세액공제', '13월'],
  },
  {
    id: 'CALC-19',
    slug: 'inheritance-tax',
    name: '상속세 계산기',
    shortDesc: '상속세 간편 계산',
    categoryId: 'tax',
    phase: 2,
    isFun: false,
    tags: ['상속세', '상속', 'ㅅㅅㅅ', '유산', '배우자공제', '세금', '부동산상속'],
  },

  // ── 부동산 ──────────────────────────────────────────────────────
  {
    id: 'CALC-04',
    slug: 'property-acquisition-tax',
    name: '부동산 취득세 계산기',
    shortDesc: '취득세·지방교육세 한번에',
    categoryId: 'property',
    phase: 1,
    isFun: false,
    tags: ['취득세', '부동산', 'ㅊㄷㅅ', '지방교육세', '농어촌특별세', '주택취득', '아파트'],
  },
  {
    id: 'CALC-09',
    slug: 'housing-subscription-score',
    name: '청약 가점 계산기',
    shortDesc: '내 청약 가점은 몇 점?',
    categoryId: 'property',
    phase: 1,
    badge: 'popular',
    isFun: false,
    tags: ['청약', '가점', 'ㅊㅇ', '청약통장', '무주택', '부양가족', '아파트청약'],
  },
  {
    id: 'CALC-11',
    slug: 'brokerage-fee',
    name: '부동산 중개수수료 계산기',
    shortDesc: '복비 얼마나 내야할까?',
    categoryId: 'property',
    phase: 1,
    isFun: false,
    tags: ['중개수수료', '복비', 'ㅈㄱㅅㅅㄹ', '부동산', '공인중개사', '매매', '전세'],
  },
  {
    id: 'CALC-24',
    slug: 'registration-cost',
    name: '등기비용 계산기',
    shortDesc: '등기 비용 한번에 계산',
    categoryId: 'property',
    phase: 2,
    isFun: false,
    tags: ['등기비용', '등기', 'ㄷㄱㅂㅇ', '소유권이전', '법무사', '취득세', '부동산'],
  },
  {
    id: 'CALC-28',
    slug: 'area-converter',
    name: '평수 변환기',
    shortDesc: '평↔㎡ 간편 변환',
    categoryId: 'property',
    phase: 2,
    isFun: false,
    tags: ['평수', '평방미터', 'ㅍㅅ', '면적', '평', '㎡', '아파트', '변환'],
  },

  // ── 금융·대출 ──────────────────────────────────────────────────
  {
    id: 'CALC-05',
    slug: 'mortgage',
    name: '주택담보대출 이자 계산기',
    shortDesc: '주담대 월 상환액 확인',
    categoryId: 'finance',
    phase: 1,
    isFun: false,
    tags: ['주택담보대출', '주담대', 'ㅈㄷㄷ', '모기지', '이자', '원리금', '대출상환'],
  },
  {
    id: 'CALC-06',
    slug: 'jeonse-loan',
    name: '전세대출 이자 계산기',
    shortDesc: '전세대출 월 이자 계산',
    categoryId: 'finance',
    phase: 1,
    isFun: false,
    tags: ['전세대출', '전세', 'ㅈㅅㄷㅊ', '이자', '월이자', '대출', '전셋집'],
  },
  {
    id: 'CALC-25',
    slug: 'car-installment',
    name: '자동차 할부 계산기',
    shortDesc: '자동차 할부금 계산',
    categoryId: 'finance',
    phase: 2,
    isFun: false,
    tags: ['자동차할부', '할부', 'ㅈㄷㅊㅎㅂ', '자동차', '월납입금', '이자', '차량구매'],
  },

  // ── 생활·건강 ──────────────────────────────────────────────────
  {
    id: 'CALC-12',
    slug: 'age',
    name: '나이 계산기',
    shortDesc: '만나이·한국나이 한번에',
    categoryId: 'life',
    phase: 1,
    badge: 'popular',
    isFun: false,
    tags: ['나이', '만나이', 'ㄴㅇ', '한국나이', '생일', '연령', '나이계산'],
  },
  {
    id: 'CALC-20',
    slug: 'car-tax',
    name: '자동차세 계산기',
    shortDesc: '내 차 자동차세는?',
    categoryId: 'life',
    phase: 2,
    isFun: false,
    tags: ['자동차세', '차량세', 'ㅈㄷㅊㅅ', '배기량', '지방교육세', '자동차', '세금'],
  },
  {
    id: 'CALC-21',
    slug: 'electricity-bill',
    name: '전기요금 계산기',
    shortDesc: '전기료 누진세 계산',
    categoryId: 'life',
    phase: 2,
    isFun: false,
    tags: ['전기요금', '전기세', 'ㅈㄱㅇㄱ', '누진세', '한전', '전력', '전기료'],
  },
  {
    id: 'CALC-22',
    slug: 'bmi',
    name: 'BMI 계산기',
    shortDesc: 'BMI·적정 체중 확인',
    categoryId: 'life',
    phase: 1,
    isFun: false,
    tags: ['BMI', '체질량지수', '비만도', '체중', '키', '표준체중', '다이어트'],
  },
  {
    id: 'CALC-23',
    slug: 'dday',
    name: 'D-day 계산기',
    shortDesc: '두 날짜 사이 일수 계산',
    categoryId: 'life',
    phase: 1,
    isFun: false,
    tags: ['디데이', 'D-day', '날짜', '기념일', '일수계산', '남은날', '날짜차이'],
  },
  {
    id: 'CALC-26',
    slug: 'due-date',
    name: '출산예정일 계산기',
    shortDesc: '출산 예정일 확인',
    categoryId: 'life',
    phase: 2,
    isFun: false,
    tags: ['출산예정일', '출산', 'ㅊㅅㅇㅈㅇ', '임신', '분만예정일', '임신주수', '출산일'],
  },
  {
    id: 'CALC-27',
    slug: 'military-discharge',
    name: '전역일 계산기',
    shortDesc: '전역일·복무일수 계산',
    categoryId: 'life',
    phase: 2,
    isFun: false,
    tags: ['전역일', '전역', 'ㅈㅇㅇ', '군대', '복무기간', '입대일', '제대'],
  },
  {
    id: 'CALC-29',
    slug: 'fuel-economy',
    name: '연비 계산기',
    shortDesc: '내 차 연비 계산',
    categoryId: 'life',
    phase: 2,
    isFun: false,
    tags: ['연비', '기름값', 'ㅇㅂ', '주유', '연료비', '자동차', '경제속도'],
  },
  {
    id: 'CALC-30',
    slug: 'bac',
    name: '음주 측정 계산기',
    shortDesc: 'BAC 혈중알코올 추정',
    categoryId: 'life',
    phase: 2,
    isFun: false,
    tags: ['음주측정', '혈중알코올', 'BAC', 'ㅇㅈㅊㅈ', '음주운전', '알코올', '음주'],
  },

  // ── 재미·운세 (fortune) ──────────────────────────────────────
  {
    id: 'CALC-14',
    slug: 'daily-fortune',
    name: '오늘의 한마디',
    shortDesc: '오늘의 행운 점수는?',
    categoryId: 'fun',
    subCategoryId: 'fortune',
    phase: 1,
    badge: 'daily',
    revisitType: 'daily',
    isFun: true,
    tags: ['오늘의운세', '운세', 'ㅇㄴㅇㅎㅁㄷ', '행운', '오늘', '일일운세', '포춘'],
  },
  {
    id: 'CALC-36',
    slug: 'tojeong',
    name: '토정비결',
    shortDesc: '2026년 나의 운세는?',
    categoryId: 'fun',
    subCategoryId: 'fortune',
    phase: 3,
    revisitType: 'seasonal',
    isFun: true,
    tags: ['토정비결', '토정', 'ㅌㅈㅂㄱ', '연간운세', '사주', '신년운세', '운세'],
  },
  {
    id: 'CALC-37',
    slug: 'tarot-daily',
    name: '오늘의 타로',
    shortDesc: '오늘의 타로 카드 한 장',
    categoryId: 'fun',
    subCategoryId: 'fortune',
    phase: 3,
    badge: 'daily',
    revisitType: 'daily',
    isFun: true,
    tags: ['타로', '타로카드', 'ㅌㄹ', '오늘의타로', '일일타로', '운세', '점'],
  },
  {
    id: 'CALC-40',
    slug: 'saju',
    name: '사주 오행 분석기',
    shortDesc: '내 사주 오행 분포는?',
    categoryId: 'fun',
    subCategoryId: 'fortune',
    phase: 3,
    isFun: true,
    tags: ['사주', '오행', 'ㅅㅈ', '사주팔자', '명리', '운세', '오행분석'],
  },
  {
    id: 'CALC-43',
    slug: 'horoscope-daily',
    name: '오늘의 별자리 운세',
    shortDesc: '별자리별 오늘의 운세',
    categoryId: 'fun',
    subCategoryId: 'fortune',
    phase: 3,
    badge: 'daily',
    revisitType: 'daily',
    isFun: true,
    tags: ['별자리', '별자리운세', 'ㅂㅈㄹ', '황도12궁', '오늘의운세', '점성술', '호로스코프'],
  },
  {
    id: 'CALC-44',
    slug: 'zodiac-personality',
    name: '별자리 성격 분석',
    shortDesc: '내 별자리 성격은?',
    categoryId: 'fun',
    subCategoryId: 'fortune',
    phase: 3,
    isFun: true,
    tags: ['별자리', '성격', 'ㅂㅈㄹㅅㄱ', '별자리성격', '점성술', '궁합', '특징'],
  },

  // ── 재미·궁합 (compatibility) ──────────────────────────────
  {
    id: 'CALC-31',
    slug: 'name-compatibility',
    name: '이름 궁합 계산기',
    shortDesc: '이름으로 보는 궁합',
    categoryId: 'fun',
    subCategoryId: 'compatibility',
    phase: 1,
    badge: 'popular',
    isFun: true,
    tags: ['이름궁합', '궁합', 'ㅇㄹㄱㅎ', '이름', '획수궁합', '커플', '연애'],
  },
  {
    id: 'CALC-35',
    slug: 'zodiac-compatibility',
    name: '별자리 궁합 계산기',
    shortDesc: '두 별자리의 궁합은?',
    categoryId: 'fun',
    subCategoryId: 'compatibility',
    phase: 3,
    isFun: true,
    tags: ['별자리궁합', '별자리', 'ㅂㅈㄹㄱㅎ', '황도12궁', '점성술', '커플', '연애궁합'],
  },
  {
    id: 'CALC-41',
    slug: 'zodiac-animal-compatibility',
    name: '띠별 궁합 계산기',
    shortDesc: '12띠로 보는 궁합',
    categoryId: 'fun',
    subCategoryId: 'compatibility',
    phase: 3,
    isFun: true,
    tags: ['띠궁합', '띠', 'ㄷㄱㅎ', '12띠', '쥐띠', '소띠', '궁합'],
  },

  // ── 재미·MBTI ──────────────────────────────────────────────
  {
    id: 'CALC-33',
    slug: 'mbti-compatibility',
    name: 'MBTI 궁합 계산기',
    shortDesc: 'MBTI로 보는 궁합',
    categoryId: 'fun',
    subCategoryId: 'mbti',
    phase: 3,
    isFun: true,
    tags: ['MBTI궁합', 'MBTI', '엠비티아이', '궁합', '성격유형', '커플', '연애'],
  },
  {
    id: 'CALC-45',
    slug: 'mbti-career',
    name: 'MBTI 직업 궁합',
    shortDesc: '내 MBTI에 맞는 직업은?',
    categoryId: 'fun',
    subCategoryId: 'mbti',
    phase: 3,
    isFun: true,
    tags: ['MBTI직업', 'MBTI', '엠비티아이직업', '직업추천', '성격유형', '진로', '취업'],
  },
  {
    id: 'CALC-46',
    slug: 'mbti-balance',
    name: 'MBTI 밸런스 게임',
    shortDesc: '밸런스 게임으로 MBTI 검증',
    categoryId: 'fun',
    subCategoryId: 'mbti',
    phase: 3,
    revisitType: 'weekly',
    isFun: true,
    tags: ['MBTI밸런스', '밸런스게임', 'ㅂㄹㅅㄱㅇ', 'MBTI', '엠비티아이', '게임', '성격'],
  },
  {
    id: 'CALC-47',
    slug: 'mbti-change',
    name: 'MBTI 변화 추적기',
    shortDesc: '과거 vs 현재 MBTI 비교',
    categoryId: 'fun',
    subCategoryId: 'mbti',
    phase: 3,
    isFun: true,
    tags: ['MBTI변화', 'MBTI', '엠비티아이변화', '성격변화', '유형변화', '비교', '성장'],
  },

  // ── 재미·로또 ──────────────────────────────────────────────
  {
    id: 'CALC-15',
    slug: 'lotto',
    name: '로또 번호 생성기',
    shortDesc: '행운의 로또 번호 뽑기',
    categoryId: 'fun',
    subCategoryId: 'lotto',
    phase: 1,
    badge: 'popular',
    revisitType: 'weekly',
    isFun: true,
    tags: ['로또', '복권', 'ㄹㄸ', '로또번호', '행운번호', '1등', '추첨'],
  },
  {
    id: 'CALC-16',
    slug: 'lotto/probability',
    name: '로또 확률 계산기',
    shortDesc: '당첨 확률과 기댓값',
    categoryId: 'fun',
    subCategoryId: 'lotto',
    phase: 2,
    isFun: true,
    tags: ['로또확률', '로또', 'ㄹㄸㅎㄹ', '당첨확률', '기댓값', '복권', '통계'],
  },

  // ── 재미·이름 ──────────────────────────────────────────────
  {
    id: 'CALC-38',
    slug: 'name-strokes',
    name: '이름 획수 풀이',
    shortDesc: '내 이름 획수로 보는 운세',
    categoryId: 'fun',
    subCategoryId: 'name',
    phase: 3,
    isFun: true,
    tags: ['이름획수', '획수', 'ㅇㄹㅎㅅ', '이름풀이', '성명학', '운세', '이름'],
  },
  {
    id: 'CALC-48',
    slug: 'naming-score',
    name: '작명 점수 계산기',
    shortDesc: '아기 이름 후보 비교',
    categoryId: 'fun',
    subCategoryId: 'name',
    phase: 3,
    isFun: true,
    tags: ['작명', '이름짓기', 'ㅈㅁ', '아기이름', '성명학', '이름점수', '신생아'],
  },

  // ── 재미·기타 ──────────────────────────────────────────────
  {
    id: 'CALC-32',
    slug: 'random-menu',
    name: '랜덤 메뉴 추천',
    shortDesc: '오늘 뭐 먹지?',
    categoryId: 'fun',
    subCategoryId: 'etc',
    phase: 1,
    revisitType: 'daily',
    isFun: true,
    tags: ['메뉴추천', '랜덤메뉴', 'ㅁㄴㅊㅊ', '오늘뭐먹지', '점심', '저녁', '음식'],
  },
  {
    id: 'CALC-34',
    slug: 'couple-anniversary',
    name: '커플 기념일 계산기',
    shortDesc: '100일·1000일 언제?',
    categoryId: 'fun',
    subCategoryId: 'etc',
    phase: 3,
    isFun: true,
    tags: ['커플기념일', '기념일', 'ㅋㅍㄱㄴㅇ', '100일', '1000일', '연애', '사귄날'],
  },
  {
    id: 'CALC-39',
    slug: 'past-life',
    name: '전생 직업 계산기',
    shortDesc: '전생에 나는 무엇이었을까?',
    categoryId: 'fun',
    subCategoryId: 'etc',
    phase: 3,
    isFun: true,
    tags: ['전생', '전생직업', 'ㅈㅅ', '환생', '전생테스트', '재미', '운세'],
  },
  {
    id: 'CALC-42',
    slug: 'life-remaining',
    name: '인생 남은 시간 계산기',
    shortDesc: '남은 주말·벚꽃 시즌',
    categoryId: 'fun',
    subCategoryId: 'etc',
    phase: 3,
    isFun: true,
    tags: ['인생남은시간', '남은시간', 'ㅇㅅㄴㅇㅅㄱ', '주말', '벚꽃', '남은날', '인생시계'],
  },
  {
    id: 'CALC-49',
    slug: 'face-age',
    name: '관상/얼굴 나이',
    shortDesc: '내 얼굴은 몇 살?',
    categoryId: 'fun',
    subCategoryId: 'etc',
    phase: 3,
    isFun: true,
    tags: ['관상', '얼굴나이', 'ㄱㅅ', '동안', '나이테스트', '재미', '얼굴'],
  },
];

// ─── 헬퍼 함수 ──────────────────────────────────────────────────────
export function getCalculatorsByCategory(categoryId: string): Calculator[] {
  return CALCULATORS.filter((c) => c.categoryId === categoryId);
}

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

// ─── 컬러 매핑 ──────────────────────────────────────────────────────
export const CATEGORY_COLORS = {
  salary:   { main: 'blue-600',    bg: 'blue-50',    border: 'blue-200'    },
  tax:      { main: 'emerald-600', bg: 'emerald-50', border: 'emerald-200' },
  property: { main: 'amber-600',   bg: 'amber-50',   border: 'amber-200'   },
  finance:  { main: 'violet-600',  bg: 'violet-50',  border: 'violet-200'  },
  life:     { main: 'cyan-600',    bg: 'cyan-50',    border: 'cyan-200'    },
  fun:      { main: 'pink-600',    bg: 'pink-50',    border: 'pink-200'    },
} as const;

export const CATEGORY_ICONS: Record<string, string> = {
  salary: 'Wallet',
  tax: 'Receipt',
  property: 'Home',
  finance: 'TrendingUp',
  life: 'Heart',
  fun: 'Sparkles',
};
