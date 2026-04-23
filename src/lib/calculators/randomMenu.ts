// 랜덤 메뉴 추천 계산기
// 카테고리별 메뉴 목록에서 랜덤 선택

export type MenuCategory =
  | "korean"    // 한식
  | "chinese"   // 중식
  | "japanese"  // 일식
  | "western"   // 양식
  | "snack"     // 분식
  | "fast"      // 패스트푸드
  | "cafe"      // 카페·디저트
  | "random";   // 전체 랜덤

export type MenuCategoryLabel = {
  id: MenuCategory;
  label: string;
  emoji: string;
};

export const MENU_CATEGORIES: MenuCategoryLabel[] = [
  { id: "random", label: "오늘의 추천", emoji: "🎲" },
  { id: "korean", label: "한식", emoji: "🍚" },
  { id: "chinese", label: "중식", emoji: "🥢" },
  { id: "japanese", label: "일식", emoji: "🍣" },
  { id: "western", label: "양식", emoji: "🍝" },
  { id: "snack", label: "분식", emoji: "🥚" },
  { id: "fast", label: "패스트푸드", emoji: "🍔" },
  { id: "cafe", label: "카페·디저트", emoji: "☕" },
];

const MENU_LIST: Record<Exclude<MenuCategory, "random">, string[]> = {
  korean: [
    "비빔밥", "된장찌개", "김치찌개", "순두부찌개", "부대찌개",
    "삼겹살", "갈비탕", "설렁탕", "삼계탕", "냉면",
    "물냉면", "비빔냉면", "불고기", "제육볶음", "닭갈비",
    "보쌈", "족발", "국밥", "떡국", "육개장",
    "해장국", "추어탕", "곱창", "막창", "오삼불고기",
    "생선구이", "황태구이", "고등어구이", "갈치조림", "콩나물국밥",
  ],
  chinese: [
    "짜장면", "짬뽕", "탕수육", "볶음밥", "마파두부",
    "깐풍기", "양장피", "팔보채", "잡채", "유산슬",
    "군만두", "물만두", "쌀국수", "짬뽕밥", "짜장밥",
    "마라탕", "마라샹궈", "훠궈", "양꼬치", "차슈",
  ],
  japanese: [
    "초밥", "라멘", "우동", "소바", "돈카츠",
    "규동", "카레라이스", "나베", "오야코동", "가츠동",
    "텐동", "연어덮밥", "참치회", "오마카세", "야키토리",
    "타코야키", "오코노미야키", "모듬회", "스시", "사케동",
  ],
  western: [
    "파스타", "피자", "스테이크", "리소토", "뇨키",
    "그라탱", "수프", "시저샐러드", "까르보나라", "봉골레",
    "함박스테이크", "크림스파게티", "로제파스타", "라자냐", "브런치",
    "에그베네딕트", "샌드위치", "버거", "클럽샌드위치", "갈릭브레드",
  ],
  snack: [
    "떡볶이", "순대", "튀김", "어묵", "라면",
    "짜파게티", "비빔면", "쫄면", "잡채밥", "김밥",
    "충무김밥", "참치김밥", "계란김밥", "컵라면", "삼각김밥",
    "핫도그", "토스트", "길거리 토스트", "호떡", "붕어빵",
    "계란빵", "와플", "슬러시", "치즈볼", "감자튀김",
  ],
  fast: [
    "빅맥", "불고기버거", "새우버거", "치킨버거", "더블치즈버거",
    "치킨텐더", "너겟", "프라이드치킨", "양념치킨", "간장치킨",
    "핫도그", "타코", "부리토", "서브웨이", "샌드위치",
    "핫윙", "콥샐러드", "치즈스틱", "감자튀김", "어니언링",
  ],
  cafe: [
    "아메리카노", "카페라떼", "카푸치노", "바닐라라떼", "카라멜마키아또",
    "딸기라떼", "초코라떼", "그린티라떼", "에스프레소", "콜드브루",
    "에이드", "스무디", "과일쉐이크", "케이크", "마카롱",
    "크로와상", "베이글", "쿠키", "타르트", "브라우니",
    "빙수", "팥빙수", "소프트아이스크림", "젤라또", "와플",
  ],
};

export type RandomMenuResult = {
  category: MenuCategory;
  categoryLabel: string;
  categoryEmoji: string;
  menu: string;
  suggestion: string; // 추천 멘트
};

const SUGGESTIONS = [
  "오늘 점심은 이걸로 결정!",
  "고민 끝! 바로 이거예요.",
  "오늘의 행운 메뉴입니다.",
  "당신의 선택이 옳았습니다.",
  "이거 진짜 맛있어요!",
  "오늘 이 메뉴 먹으면 기분 UP!",
  "다이어트는 내일부터, 오늘은 이거!",
  "신이 추천한 오늘의 메뉴",
];

export function recommendRandomMenu(category: MenuCategory): RandomMenuResult {
  const pool: string[] = category === "random"
    ? Object.values(MENU_LIST).flat()
    : MENU_LIST[category];

  const menu = pool[Math.floor(Math.random() * pool.length)];

  const catInfo = MENU_CATEGORIES.find((c) => c.id === category)!;
  const suggestion = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];

  return {
    category,
    categoryLabel: catInfo.label,
    categoryEmoji: catInfo.emoji,
    menu,
    suggestion,
  };
}

// 메뉴 목록 접근자 (테스트용)
export function getMenuPool(category: Exclude<MenuCategory, "random">): string[] {
  return MENU_LIST[category];
}
