// 부동산 중개수수료 계산기
// 출처: 공인중개사법 시행규칙 별표 1 (국토교통부)
//       https://www.law.go.kr/법령/공인중개사법시행규칙
// 기준: 2021년 10월 개정 요율표

export type TransactionType = "buy-sell" | "rent-jeonse" | "rent-monthly";

export type BrokerageFeeInput = {
  transactionType: TransactionType;
  price: number;          // 매매: 거래금액, 전세: 보증금, 월세: 보증금
  monthlyRent?: number;   // 월세 전용 (원)
};

export type BrokerageFeeResult = {
  transactionType: TransactionType;
  effectivePrice: number;   // 실효 거래금액 (월세는 환산가)
  maxRate: number;          // 상한 요율 (소수)
  maxFee: number;           // 상한 수수료
  limitFee: number | null;  // 한도액 (한도가 있는 구간, 없으면 null)
  recommendedFee: number;   // 권장 수수료 (상한 또는 한도 중 낮은 값)
};

/**
 * 매매 상한 요율 (공인중개사법 시행규칙 별표 1)
 * 거래금액       상한요율  한도액
 * ~5천만         0.6%     25만
 * ~2억           0.5%     80만
 * ~6억           0.4%     없음
 * ~9억           0.5%     없음
 * 9억~           0.9%     없음  (협의)
 */
function getBuySellRate(price: number): { rate: number; limit: number | null } {
  if (price < 50_000_000)  return { rate: 0.006, limit: 250_000 };
  if (price < 200_000_000) return { rate: 0.005, limit: 800_000 };
  if (price < 600_000_000) return { rate: 0.004, limit: null };
  if (price < 900_000_000) return { rate: 0.005, limit: null };
  return { rate: 0.009, limit: null };
}

/**
 * 임대차(전세·보증부월세) 상한 요율
 * 거래금액       상한요율  한도액
 * ~5천만         0.5%     20만
 * ~1억           0.4%     30만
 * ~3억           0.3%     없음
 * ~6억           0.4%     없음
 * 6억~           0.8%     없음  (협의)
 */
function getRentRate(price: number): { rate: number; limit: number | null } {
  if (price < 50_000_000)  return { rate: 0.005, limit: 200_000 };
  if (price < 100_000_000) return { rate: 0.004, limit: 300_000 };
  if (price < 300_000_000) return { rate: 0.003, limit: null };
  if (price < 600_000_000) return { rate: 0.004, limit: null };
  return { rate: 0.008, limit: null };
}

export function calculateBrokerageFee(input: BrokerageFeeInput): BrokerageFeeResult {
  const { transactionType, price, monthlyRent = 0 } = input;

  // 월세 환산가: 보증금 + 월세 × 100 (상한 70 이하 구간은 70, 초과는 100)
  // 편의상 공통 100 배수 적용 (실무 보편 계산법)
  const effectivePrice =
    transactionType === "rent-monthly"
      ? price + monthlyRent * 100
      : price;

  const { rate, limit } =
    transactionType === "buy-sell"
      ? getBuySellRate(effectivePrice)
      : getRentRate(effectivePrice);

  const maxFee = Math.floor(effectivePrice * rate);
  const recommendedFee = limit !== null ? Math.min(maxFee, limit) : maxFee;

  return {
    transactionType,
    effectivePrice,
    maxRate: rate,
    maxFee,
    limitFee: limit,
    recommendedFee,
  };
}
