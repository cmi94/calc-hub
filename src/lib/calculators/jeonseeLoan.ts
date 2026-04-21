// 전세대출 이자 계산기 — 이자만납입(만기 일시상환) 방식
// 출처: 금융감독원 https://www.fss.or.kr
//       한국주택금융공사 https://www.hf.go.kr

export type JeonseLoanInput = {
  loanAmount: number;  // 대출금액 (원)
  annualRate: number;  // 연 금리 (%, 예: 3.5)
  termYears: number;   // 대출 기간 (년)
};

export type JeonseLoanResult = {
  loanAmount: number;
  monthlyInterest: number;  // 월 이자
  totalInterest: number;    // 총 이자 (기간 전체)
  annualInterest: number;   // 연 이자
};

export function calculateJeonseLoan(input: JeonseLoanInput): JeonseLoanResult {
  const { loanAmount, annualRate, termYears } = input;

  // 월 이자 = 대출금액 × 연 금리 / 12
  const monthlyInterest = Math.round(loanAmount * (annualRate / 100) / 12);
  const annualInterest = monthlyInterest * 12;
  const totalInterest = monthlyInterest * termYears * 12;

  return { loanAmount, monthlyInterest, totalInterest, annualInterest };
}
