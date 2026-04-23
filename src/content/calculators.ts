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
];
