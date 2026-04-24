"use client";

import { useState } from "react";
import { calculateInheritanceTax, type InheritanceTaxResult } from "@/lib/calculators/inheritanceTax";

const fmt = (n: number) => n.toLocaleString() + "원";

export default function InheritanceTaxCalculator() {
  const [totalAssets, setTotalAssets] = useState("");
  const [debts, setDebts] = useState("0");
  const [hasSpouse, setHasSpouse] = useState(false);
  const [spouseInheritance, setSpouseInheritance] = useState("0");
  const [childrenCount, setChildrenCount] = useState("0");
  const [result, setResult] = useState<InheritanceTaxResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const assets = parseFloat(totalAssets.replace(/,/g, ""));
    const debt = parseFloat(debts.replace(/,/g, "") || "0");
    const spouseAmt = parseFloat(spouseInheritance.replace(/,/g, "") || "0");
    const children = parseInt(childrenCount, 10);

    if (!totalAssets || isNaN(assets) || assets <= 0) {
      setError("상속 재산을 입력해주세요.");
      return;
    }
    setError("");
    setResult(calculateInheritanceTax({
      totalAssets: assets,
      debts: isNaN(debt) ? 0 : debt,
      hasSpouse,
      spouseInheritance: isNaN(spouseAmt) ? 0 : spouseAmt,
      childrenCount: isNaN(children) ? 0 : Math.max(0, children),
    }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">상속 재산 총액 (원)</label>
          <input
            type="text"
            value={totalAssets}
            onChange={(e) => { setTotalAssets(e.target.value); setResult(null); setError(""); }}
            placeholder="예: 2000000000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">채무·장례비 등 공제 (원)</label>
          <input
            type="text"
            value={debts}
            onChange={(e) => { setDebts(e.target.value); setResult(null); setError(""); }}
            placeholder="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 배우자 여부 */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">배우자 상속</label>
          <button
            onClick={() => { setHasSpouse(!hasSpouse); setResult(null); }}
            className={`relative w-12 h-6 rounded-full overflow-hidden transition-colors ${hasSpouse ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${hasSpouse ? "left-7" : "left-1"}`} />
          </button>
        </div>

        {hasSpouse && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">배우자 실제 상속액 (원, 0=최소 5억 적용)</label>
            <input
              type="text"
              value={spouseInheritance}
              onChange={(e) => { setSpouseInheritance(e.target.value); setResult(null); }}
              placeholder="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">자녀 수</label>
          <input
            type="number"
            value={childrenCount}
            min="0"
            onChange={(e) => { setChildrenCount(e.target.value); setResult(null); }}
            placeholder="0"
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
          {/* 총 납부세액 강조 */}
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">납부세액 (신고세액공제 후)</p>
            <p className="text-3xl font-bold text-blue-700">{fmt(result.totalTax)}</p>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">상속 재산</span>
              <span className="font-semibold">{fmt(result.totalAssets)}</span>
            </div>
            {result.debts > 0 && (
              <div className="flex justify-between py-2.5">
                <span className="text-gray-600">채무 등 공제</span>
                <span className="font-semibold text-green-600">- {fmt(result.debts)}</span>
              </div>
            )}
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">순재산</span>
              <span className="font-semibold">{fmt(result.netAssets)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">
                적용 공제 (일괄 {fmt(result.lumpSumDeduction)} vs 개별공제 중 큰 것)
              </span>
              <span className="font-semibold text-green-600">- {fmt(result.appliedDeduction)}</span>
            </div>
            {result.spouseDeduction > 0 && (
              <div className="flex justify-between py-2.5 text-xs text-gray-500">
                <span className="pl-4">└ 배우자공제 포함</span>
                <span>{fmt(result.spouseDeduction)}</span>
              </div>
            )}
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">과세표준</span>
              <span className="font-semibold">{fmt(result.taxableBase)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">최고 세율</span>
              <span className="font-semibold">{(result.taxRate * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">산출세액</span>
              <span className="font-semibold">{fmt(result.calculatedTax)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">신고세액공제 (3%)</span>
              <span className="font-semibold text-green-600">- {fmt(result.discountCredit)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            상속세및증여세법 제18조·제19조·제26조 기준. 미성년자·장애인 등 추가 공제는 반영되지 않습니다. 세무사 상담을 권장합니다.
          </p>
        </div>
      )}
    </div>
  );
}
