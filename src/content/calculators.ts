export type Calculator = {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
};

export const calculators: Calculator[] = [
  {
    id: "salary",
    name: "연봉 실수령액 계산기",
    description: "4대보험·근로소득세 공제 후 월 실수령액 계산",
    category: "labor",
    path: "/salary",
  },
  {
    id: "severance",
    name: "퇴직금 계산기",
    description: "입사일·퇴사일·급여로 퇴직금 계산",
    category: "labor",
    path: "/retirement",
  },
  {
    id: "weekly-holiday-pay",
    name: "주휴수당 계산기",
    description: "시급·주간 근무시간으로 주휴수당 계산",
    category: "labor",
    path: "/weekly-holiday-pay",
  },
  {
    id: "property-acquisition-tax",
    name: "부동산 취득세 계산기",
    description: "주택수·조정지역별 취득세·지방교육세·농어촌특별세 계산",
    category: "realestate",
    path: "/property-acquisition-tax",
  },
  {
    id: "mortgage",
    name: "주택담보대출 이자 계산기",
    description: "원리금균등상환 기준 월 상환액·총 이자 계산",
    category: "finance",
    path: "/mortgage",
  },
  {
    id: "jeonse-loan",
    name: "전세대출 이자 계산기",
    description: "이자만납입 방식 월 이자·총 이자 계산",
    category: "finance",
    path: "/jeonse-loan",
  },
  {
    id: "income-tax",
    name: "종합소득세 계산기",
    description: "프리랜서·사업소득자 간편 세금 계산",
    category: "tax",
    path: "/income-tax",
  },
  {
    id: "age",
    name: "나이 계산기",
    description: "만나이·한국나이·다음 생일까지 남은 일수 계산",
    category: "life",
    path: "/age",
  },
  {
    id: "hourly-wage",
    name: "시급 계산기",
    description: "시급으로 일급·주급·월급·연봉 환산, 최저임금 판정",
    category: "labor",
    path: "/hourly-wage",
  },
  {
    id: "brokerage-fee",
    name: "부동산 중개수수료 계산기",
    description: "매매·전세·월세별 법정 상한 중개수수료 계산",
    category: "realestate",
    path: "/brokerage-fee",
  },
  {
    id: "housing-subscription-score",
    name: "청약 가점 계산기",
    description: "무주택기간·부양가족·청약통장으로 청약 가점 계산",
    category: "realestate",
    path: "/housing-subscription-score",
  },
  {
    id: "unemployment-benefit",
    name: "실업급여 계산기",
    description: "평균임금·나이·피보험기간으로 구직급여 수급액 계산",
    category: "labor",
    path: "/unemployment-benefit",
  },
  {
    id: "gift-tax",
    name: "증여세 계산기",
    description: "관계별 공제·누진세율 기반 증여세 계산",
    category: "tax",
    path: "/gift-tax",
  },
  {
    id: "daily-fortune",
    name: "오늘의 한마디",
    description: "생년월일로 보는 오늘의 응원 메시지와 행운의 숫자",
    category: "fun",
    path: "/daily-fortune",
  },
  {
    id: "lotto",
    name: "로또 번호 생성기",
    description: "고정·제외 번호 설정으로 최대 10게임 자동 생성",
    category: "fun",
    path: "/lotto",
  },
  // Phase 3
  {
    id: "bmi",
    name: "BMI 계산기",
    description: "키·몸무게로 체질량지수(BMI)와 비만도·적정 체중 범위 계산",
    category: "life",
    path: "/bmi",
  },
  {
    id: "dday",
    name: "D-day 계산기",
    description: "두 날짜 사이 일수·주·월·년 계산 및 D-day 표시",
    category: "life",
    path: "/dday",
  },
  {
    id: "car-tax",
    name: "자동차세 계산기",
    description: "배기량·차령별 자동차세·지방교육세·차령경감 계산",
    category: "life",
    path: "/car-tax",
  },
  {
    id: "electricity-bill",
    name: "전기요금 계산기",
    description: "월 사용량으로 누진 전기요금·부가세 포함 청구액 계산",
    category: "life",
    path: "/electricity-bill",
  },
  {
    id: "capital-gains-tax",
    name: "양도소득세 계산기",
    description: "주택 양도차익·장기보유공제·1주택 비과세 여부 계산",
    category: "tax",
    path: "/capital-gains-tax",
  },
  {
    id: "inheritance-tax",
    name: "상속세 계산기",
    description: "배우자·자녀 공제 후 상속세 누진세율 계산",
    category: "tax",
    path: "/inheritance-tax",
  },
  {
    id: "year-end-tax",
    name: "연말정산 계산기",
    description: "총급여·공제 항목으로 환급액 또는 추납액 추정",
    category: "tax",
    path: "/year-end-tax",
  },
  {
    id: "compatibility",
    name: "궁합 계산기",
    description: "두 이름의 한글 획수로 보는 재미 궁합 점수",
    category: "fun",
    path: "/compatibility",
  },
  {
    id: "random-menu",
    name: "랜덤 메뉴 추천",
    description: "한식·중식·일식 등 카테고리에서 오늘의 메뉴 랜덤 추천",
    category: "fun",
    path: "/random-menu",
  },
];
