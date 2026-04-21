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
    path: "/severance",
  },
  {
    id: "weekly-holiday-pay",
    name: "주휴수당 계산기",
    description: "시급·주간 근무시간으로 주휴수당 계산",
    category: "labor",
    path: "/weekly-holiday-pay",
  },
];
