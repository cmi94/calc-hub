"use client";

import { useState } from "react";
import { calculateCarTax, type CarType, type CarTaxResult } from "@/lib/calculators/carTax";

const fmt = (n: number) => n.toLocaleString() + "원";

export default function CarTaxCalculator() {
  const [carType, setCarType] = useState<CarType>("passenger");
  const [displacement, setDisplacement] = useState("");
  const [vehicleAge, setVehicleAge] = useState("1");
  const [isElectric, setIsElectric] = useState(false);
  const [result, setResult] = useState<CarTaxResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const d = parseFloat(displacement);
    const age = parseInt(vehicleAge, 10);

    if (!isElectric && (carType === "passenger" || carType === "passenger-business")) {
      if (!displacement || isNaN(d) || d <= 0) {
        setError("배기량을 입력해주세요.");
        return;
      }
    }
    if (!vehicleAge || isNaN(age) || age < 1) {
      setError("차령(년수)을 입력해주세요.");
      return;
    }

    setError("");
    setResult(calculateCarTax({
      carType,
      displacement: isElectric ? 0 : d,
      vehicleAge: age,
      isElectric,
    }));
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">

        {/* 차종 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">차종</label>
          <div className="grid grid-cols-2 gap-2">
            {([
              { value: "passenger", label: "승용차 (비영업용)" },
              { value: "passenger-business", label: "승용차 (영업용)" },
              { value: "van", label: "승합차 (비영업용)" },
              { value: "van-business", label: "승합차 (영업용)" },
            ] as { value: CarType; label: string }[]).map((item) => (
              <button
                key={item.value}
                onClick={() => { setCarType(item.value); setResult(null); }}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  carType === item.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 전기차 토글 */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">전기차</label>
          <button
            onClick={() => { setIsElectric(!isElectric); setResult(null); }}
            className={`relative w-12 h-6 rounded-full overflow-hidden transition-colors ${isElectric ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${isElectric ? "left-7" : "left-1"}`} />
          </button>
          {isElectric && <span className="text-xs text-blue-600">전기차 정액 100,000원 적용</span>}
        </div>

        {/* 배기량 */}
        {!isElectric && (carType === "passenger" || carType === "passenger-business") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">배기량 (cc)</label>
            <input
              type="number"
              value={displacement}
              onChange={(e) => { setDisplacement(e.target.value); setResult(null); }}
              placeholder="예: 2000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* 차령 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">차령 (년차)</label>
          <input
            type="number"
            value={vehicleAge}
            min="1"
            onChange={(e) => { setVehicleAge(e.target.value); setResult(null); }}
            placeholder="예: 3"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">3년차부터 연 5% 경감 (최대 50%)</p>
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
          {/* 총 납부액 강조 */}
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">연간 자동차세 (납부 합계)</p>
            <p className="text-3xl font-bold text-blue-700">{fmt(result.totalTax)}</p>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">기본 세액</span>
              <span className="font-semibold">{fmt(result.baseTax)}</span>
            </div>
            {result.reductionRate > 0 && (
              <div className="flex justify-between py-2.5">
                <span className="text-gray-600">차령 경감 ({(result.reductionRate * 100).toFixed(0)}%)</span>
                <span className="font-semibold text-green-600">- {fmt(result.reductionAmount)}</span>
              </div>
            )}
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">자동차세</span>
              <span className="font-semibold">{fmt(result.annualTax)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600">지방교육세 (30%)</span>
              <span className="font-semibold">{fmt(result.educationTax)}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
            <p className="font-medium text-gray-700">납부 일정</p>
            <div className="flex justify-between">
              <span className="text-gray-600">1기분 (6월 납부)</span>
              <span className="font-semibold">{fmt(result.firstHalf)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">2기분 (12월 납부)</span>
              <span className="font-semibold">{fmt(result.secondHalf)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            2026년 지방세법 기준. 실제 세액은 지방자치단체별로 다를 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
