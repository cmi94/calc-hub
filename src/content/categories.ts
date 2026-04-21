export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "tax", name: "세금", description: "세금 관련 계산기" },
  { slug: "finance", name: "금융", description: "금융 관련 계산기" },
  { slug: "realestate", name: "부동산", description: "부동산 관련 계산기" },
  { slug: "labor", name: "근로", description: "근로 관련 계산기" },
];
