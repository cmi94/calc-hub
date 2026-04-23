// BMI (체질량지수) 계산기
// 공식: BMI = 체중(kg) / 신장(m)²
// 출처: WHO 비만 분류 기준, 대한비만학회 아시아-태평양 기준
// https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight
// https://www.kosso.or.kr (대한비만학회)

export type BmiCategory =
  | "underweight"   // 저체중: < 18.5
  | "normal"        // 정상: 18.5~22.9
  | "overweight"    // 과체중: 23~24.9
  | "obese1"        // 비만 1단계: 25~29.9
  | "obese2"        // 비만 2단계: 30~34.9
  | "obese3";       // 고도비만: >= 35

export type BmiInput = {
  heightCm: number;   // 신장 (cm)
  weightKg: number;   // 체중 (kg)
};

export type BmiResult = {
  bmi: number;
  category: BmiCategory;
  categoryLabel: string;
  categoryColor: string;
  // 정상 BMI(18.5~22.9) 기준 적정 체중 범위
  idealWeightMin: number;  // 18.5 기준
  idealWeightMax: number;  // 22.9 기준
  // 현재 체중 대비 목표 체중 차이
  weightDiff: number;      // 정상 상한(22.9) 대비 (음수면 감량 필요)
};

// 아시아-태평양 기준 (대한비만학회)
export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "underweight";
  if (bmi < 23.0) return "normal";
  if (bmi < 25.0) return "overweight";
  if (bmi < 30.0) return "obese1";
  if (bmi < 35.0) return "obese2";
  return "obese3";
}

const CATEGORY_LABELS: Record<BmiCategory, string> = {
  underweight: "저체중",
  normal: "정상",
  overweight: "과체중",
  obese1: "비만 1단계",
  obese2: "비만 2단계",
  obese3: "고도비만",
};

const CATEGORY_COLORS: Record<BmiCategory, string> = {
  underweight: "blue",
  normal: "green",
  overweight: "yellow",
  obese1: "orange",
  obese2: "red",
  obese3: "red",
};

export function calculateBmi(input: BmiInput): BmiResult {
  const { heightCm, weightKg } = input;

  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

  const category = getBmiCategory(bmi);
  const categoryLabel = CATEGORY_LABELS[category];
  const categoryColor = CATEGORY_COLORS[category];

  // 적정 체중 범위 (18.5 ~ 22.9 기준)
  const idealWeightMin = Math.round(18.5 * heightM * heightM * 10) / 10;
  const idealWeightMax = Math.round(22.9 * heightM * heightM * 10) / 10;

  // 정상 범위 내 목표 대비 차이 (양수: 체중 감량 필요, 음수: 체중 증가 필요)
  let weightDiff = 0;
  if (weightKg > idealWeightMax) {
    weightDiff = Math.round((weightKg - idealWeightMax) * 10) / 10;
  } else if (weightKg < idealWeightMin) {
    weightDiff = Math.round((weightKg - idealWeightMin) * 10) / 10;
  }

  return {
    bmi,
    category,
    categoryLabel,
    categoryColor,
    idealWeightMin,
    idealWeightMax,
    weightDiff,
  };
}
