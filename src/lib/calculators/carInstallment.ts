// 자동차 할부 계산기
// 공식: 원리금균등상환 (PMT 공식)

export type CarInstallmentInput = {
  vehiclePrice: number;   // 차량 가격 (원)
  downPaymentPct: number; // 선수금 비율 (%, 예: 20)
  annualRate: number;     // 연 금리 (%, 예: 6.5)
  termMonths: number;     // 할부 기간 (개월, 예: 36)
};

export type CarInstallmentResult = {
  vehiclePrice: number;
  downPayment: number;    // 선수금
  loanAmount: number;     // 할부원금
  monthlyPayment: number; // 월납입금
  totalPayment: number;   // 총납입금 (할부만)
  totalInterest: number;  // 총이자
  totalCost: number;      // 선수금 + 총납입금
};

export function calculateCarInstallment(input: CarInstallmentInput): CarInstallmentResult {
  const { vehiclePrice, downPaymentPct, annualRate, termMonths } = input;

  // 선수금
  const downPayment = Math.round(vehiclePrice * (downPaymentPct / 100));

  // 할부원금
  const loanAmount = vehiclePrice - downPayment;

  // 월금리
  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment: number;
  let totalPayment: number;
  let totalInterest: number;

  if (monthlyRate === 0) {
    // 무이자 할부
    monthlyPayment = Math.round(loanAmount / termMonths);
    totalPayment = monthlyPayment * termMonths;
    totalInterest = 0;
  } else {
    // 원리금균등상환 PMT 공식
    const factor = Math.pow(1 + monthlyRate, termMonths);
    const rawMonthly = loanAmount * (monthlyRate * factor) / (factor - 1);
    monthlyPayment = Math.round(rawMonthly);
    totalPayment = monthlyPayment * termMonths;
    totalInterest = totalPayment - loanAmount;
  }

  const totalCost = downPayment + totalPayment;

  return {
    vehiclePrice,
    downPayment,
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    totalCost,
  };
}
