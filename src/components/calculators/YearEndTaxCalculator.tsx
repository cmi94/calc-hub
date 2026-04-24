"use client";

import { useState } from "react";
import { calculateYearEndTax, type YearEndTaxResult } from "@/lib/calculators/yearEndTax";

const fmt = (n: number) => n.toLocaleString() + "원";

export default function YearEndTaxCalculator() {
  const [totalSalary, setTotalSalary] = useState("");
  const [dependents, setDependents] = useState("1");
  const [dependentsUnder20, setDependentsUnder20] = useState("0");
  const [nationalPension, setNationalPension] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [employmentInsurance, setEmploymentInsurance] = useState("");
  const [creditCard, setCreditCard] = useState("0");
  const [debitCard, setDebitCard] = useState("0");
  const [medicalExpenses, setMedicalExpenses] = useState("0");
  const [educationExpenses, setEducationExpenses] = useState("0");
  const [donationAmount, setDonationAmount] = useState("0");
  const [alreadyWithheld, setAlreadyWithheld] = useState("");
  const [result, setResult] = useState<YearEndTaxResult | null>(null);
  const [error, setError] = useState("");

  function parseNum(s: string) {
    return parseFloat(s.replace(/,/g, "") || "0") || 0;
  }

  function handleCalculate() {
    const salary = parseNum(totalSalary);
    if (!totalSalary || salary <= 0) {
      setError("총급여를 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateYearEndTax({
      totalSalary: salary,
      dependents: Math.max(1, parseInt(dependents, 10) || 1),
      dependentsUnder20: parseInt(dependentsUnder20, 10) || 0,
      nationalPensionPaid: parseNum(nationalPension),
      healthInsurancePaid: parseNum(healthInsurance),
      employmentInsurancePaid: parseNum(employmentInsurance),
      creditCardUsage: parseNum(creditCard),
      debitCardUsage: parseNum(debitCard),
      medicalExpenses: parseNum(medicalExpenses),
      educationExpenses: parseNum(educationExpenses),
      donationAmount: parseNum(donationAmount),
      alreadyWithheld: parseNum(alreadyWithheld),
    }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <p className="text-sm text-gray-500">연말정산 환급액 또는 추납액을 간편하게 추정합니다.</p>

        {/* 기본 정보 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">총급여 (원)</label>
          <input type="text" value={totalSalary}
            onChange={(e) => { setTotalSalary(e.target.value); setResult(null); }}
            placeholder="예: 40000000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">부양가족 수 (본인 포함)</label>
            <input type="number" value={dependents} min="1"
              onChange={(e) => { setDependents(e.target.value); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">20세 이하 자녀</label>
            <input type="number" value={dependentsUnder20} min="0"
              onChange={(e) => { setDependentsUnder20(e.target.value); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 4대보험 */}
        <p className="text-sm font-medium text-gray-700 pt-2">4대보험 납부액 (연간, 원)</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "국민연금", val: nationalPension, set: setNationalPension },
            { label: "건강보험", val: healthInsurance, set: setHealthInsurance },
            { label: "고용보험", val: employmentInsurance, set: setEmploymentInsurance },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              <input type="text" value={val}
                onChange={(e) => { set(e.target.value); setResult(null); }}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* 카드 사용액 */}
        <p className="text-sm font-medium text-gray-700 pt-2">카드 사용액 (연간, 원)</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">신용카드</label>
            <input type="text" value={creditCard}
              onChange={(e) => { setCreditCard(e.target.value); setResult(null); }}
              placeholder="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">체크카드·현금영수증</label>
            <input type="text" value={debitCard}
              onChange={(e) => { setDebitCard(e.target.value); setResult(null); }}
              placeholder="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 기타 공제 */}
        <p className="text-sm font-medium text-gray-700 pt-2">세액공제 항목 (연간, 원)</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "의료비", val: medicalExpenses, set: setMedicalExpenses },
            { label: "교육비", val: educationExpenses, set: setEducationExpenses },
            { label: "기부금", val: donationAmount, set: setDonationAmount },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              <input type="text" value={val}
                onChange={(e) => { set(e.target.value); setResult(null); }}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* 기납부세액 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">기납부(원천징수) 세액 (연간, 원)</label>
          <input type="text" value={alreadyWithheld}
            onChange={(e) => { setAlreadyWithheld(e.target.value); setResult(null); }}
            placeholder="예: 1500000 (근로소득원천징수영수증 참고)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          {/* 환급/추납 강조 */}
          <div className={`rounded-xl p-4 text-center ${result.refundOrAdditional >= 0 ? "bg-green-50" : "bg-red-50"}`}>
            <p className={`text-sm font-medium mb-1 ${result.refundOrAdditional >= 0 ? "text-green-600" : "text-red-600"}`}>
              {result.refundOrAdditional >= 0 ? "예상 환급액" : "예상 추납액"}
            </p>
            <p className={`text-3xl font-bold ${result.refundOrAdditional >= 0 ? "text-green-700" : "text-red-700"}`}>
              {result.refundOrAdditional >= 0 ? "+" : ""}{fmt(result.refundOrAdditional)}
            </p>
          </div>

          {/* 공제 내역 */}
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">총급여</span>
              <span className="font-semibold">{fmt(result.totalSalary)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">근로소득공제</span>
              <span className="font-semibold text-green-600">- {fmt(result.employmentIncomeDeduction)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">근로소득금액</span>
              <span className="font-semibold">{fmt(result.employmentIncome)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">인적공제</span>
              <span className="font-semibold text-green-600">- {fmt(result.personalDeductionTotal)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">4대보험 공제</span>
              <span className="font-semibold text-green-600">- {fmt(result.socialInsuranceDeduction)}</span>
            </div>
            {result.creditCardDeduction > 0 && (
              <div className="flex justify-between py-2.5">
                <span className="text-gray-600">신용카드 공제</span>
                <span className="font-semibold text-green-600">- {fmt(result.creditCardDeduction)}</span>
              </div>
            )}
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">과세표준</span>
              <span className="font-semibold">{fmt(result.taxableIncome)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">산출세액</span>
              <span className="font-semibold">{fmt(result.calculatedTax)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">세액공제 합계</span>
              <span className="font-semibold text-green-600">- {fmt(result.totalTaxCredit)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">결정세액 (소득세)</span>
              <span className="font-semibold">{fmt(result.determinedTax)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">지방소득세 (10%)</span>
              <span className="font-semibold">{fmt(result.localIncomeTax)}</span>
            </div>
            <div className="flex justify-between py-2.5 font-semibold">
              <span>결정세액 합계</span>
              <span>{fmt(result.totalDetermined)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">기납부세액</span>
              <span className="font-semibold">{fmt(result.alreadyWithheld)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            소득세법 기준 간편 계산. 실제 결정세액은 국세청 홈택스에서 확인하세요.
          </p>
        </div>
      )}
    </div>
  );
}
