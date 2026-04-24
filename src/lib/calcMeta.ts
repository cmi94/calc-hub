// 계산기 체급 메타데이터 — 홈/상세 공통 참조
export const CAT_META: Record<string, {
  name: string; weight: string; emoji: string; color: string; desc: string;
}> = {
  labor:      { name: "근로",   weight: "웰터급",      emoji: "💼", color: "oklch(62% 0.16 45)",   desc: "연봉·퇴직·시급의 일상 체급" },
  tax:        { name: "세금",   weight: "미들급",      emoji: "📑", color: "oklch(62% 0.16 140)",  desc: "소득세·취득세·양도세" },
  finance:    { name: "대출",   weight: "라이트헤비급", emoji: "🏦", color: "oklch(62% 0.16 255)",  desc: "이자·DTI·예적금" },
  realestate: { name: "부동산", weight: "헤비급",      emoji: "🏠", color: "oklch(62% 0.16 305)",  desc: "취득·등기·중개 수수료" },
  life:       { name: "생활",   weight: "라이트급",    emoji: "🌿", color: "oklch(62% 0.16 85)",   desc: "BMI·나이·D-day" },
  fun:        { name: "재미",   weight: "밴텀급",      emoji: "🎲", color: "oklch(62% 0.16 350)",  desc: "로또·궁합·메뉴 추천" },
};

export const CALC_RANK: Record<string, number> = {
  "salary": 1, "severance": 2, "age": 3, "lotto": 4, "hourly-wage": 5,
};

export const CALC_STREAK: Record<string, number> = {
  "salary": 98, "severance": 94, "age": 92, "lotto": 89,
  "year-end-tax": 88, "property-acquisition-tax": 85,
  "mortgage": 83, "bmi": 80, "income-tax": 79,
  "hourly-wage": 81, "random-menu": 77, "dday": 76,
  "brokerage-fee": 74, "compatibility": 73,
  "weekly-holiday-pay": 72, "capital-gains-tax": 71,
  "jeonse-loan": 68, "gift-tax": 68, "daily-fortune": 65,
  "car-tax": 64, "unemployment-benefit": 62,
  "electricity-bill": 60, "housing-subscription-score": 58,
  "inheritance-tax": 55,
};
