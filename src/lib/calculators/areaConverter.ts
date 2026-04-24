// 평수 변환기
// 공식: 1평 = 3.30579 m²
// 출처: 국토교통부 면적 환산 기준

export type AreaConverterInput = {
  value: number;
  unit: "pyeong" | "sqm"; // 입력 단위
};

export type AreaConverterResult = {
  inputValue: number;
  inputUnit: "pyeong" | "sqm";
  pyeong: number; // 평 (소수점 2자리)
  sqm: number;    // ㎡ (소수점 2자리)
  sqft: number;   // 제곱피트 (1㎡ = 10.7639 sqft)
};

const PYEONG_TO_SQM = 3.30579;
const SQM_TO_SQFT = 10.7639;

export function calculateAreaConverter(input: AreaConverterInput): AreaConverterResult {
  const { value, unit } = input;

  let pyeong: number;
  let sqm: number;

  if (unit === "pyeong") {
    pyeong = value;
    sqm = value * PYEONG_TO_SQM;
  } else {
    sqm = value;
    pyeong = value / PYEONG_TO_SQM;
  }

  const sqft = sqm * SQM_TO_SQFT;

  return {
    inputValue: value,
    inputUnit: unit,
    pyeong: Math.round(pyeong * 100) / 100,
    sqm: Math.round(sqm * 100) / 100,
    sqft: Math.round(sqft * 100) / 100,
  };
}
