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
    id: "used-car-tax",
    name: "중고차 취득세 계산기",
    description: "차량 가격·차종별 취득세·지방교육세 계산",
    category: "tax",
    path: "/used-car-tax",
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
];
