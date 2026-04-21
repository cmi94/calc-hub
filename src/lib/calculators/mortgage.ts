// 주택담보대출 이자 계산기 — 원리금균등상환 방식
// 출처: 금융감독원 https://www.fss.or.kr
//       한국은행 금융용어사전 https://www.bok.or.kr

export type MortgageInput = {
  loanAmount: number;   // 대출금액 (원)
  annualRate: number;   // 연 금리 (%, 예: 4.5)
  termYears: number;    // 대출 기간 (년)
};

export type MonthlySchedule = {
  month: number;
  payment: number;       // 월 상환액
  principal: number;     // 원금
  interest: number;      // 이자
  remainingBalance: number; // 잔금
};

export type MortgageResult = {
  monthlyPayment: number;    // 월 상환액
  totalPayment: number;      // 총 상환액
  totalInterest: number;     // 총 이자
  schedule: MonthlySchedule[]; // 월별 상환 스케줄
};

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { loanAmount, annualRate, termYears } = input;
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = termYears * 12;

  // 원리금균등상환 월 납입액 공식
  // M = P × r(1+r)^n / ((1+r)^n - 1)
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = Math.round(loanAmount / totalMonths);
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
  }

  const schedule: MonthlySchedule[] = [];
  let remainingBalance = loanAmount;

  for (let month = 1; month <= totalMonths; month++) {
    const interest = Math.round(remainingBalance * monthlyRate);
    const principal = monthlyPayment - interest;
    remainingBalance = Math.max(0, remainingBalance - principal);

    schedule.push({ month, payment: monthlyPayment, principal, interest, remainingBalance });
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  return { monthlyPayment, totalPayment, totalInterest, schedule };
}
