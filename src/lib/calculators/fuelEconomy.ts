// 연비 계산기

export type FuelEconomyInput = {
  distance: number;         // 주행거리 (km)
  fuelUsed: number;         // 주유량 (L)
  fuelPrice: number;        // 연료 단가 (원/L)
  monthlyDistance?: number; // 월 평균 주행거리 (km, 선택)
};

export type FuelEconomyResult = {
  fuelEfficiency: number;    // 연비 (km/L, 소수점 1자리)
  costPer100km: number;      // 100km당 연료비 (원, 반올림)
  costPerKm: number;         // km당 연료비 (원, 소수점 1자리)
  monthlyFuelCost?: number;  // 월 연료비 (monthlyDistance 입력 시)
  annualFuelCost?: number;   // 연간 연료비 추정
};

export function calculateFuelEconomy(input: FuelEconomyInput): FuelEconomyResult {
  const { distance, fuelUsed, fuelPrice, monthlyDistance } = input;

  // 연비 (km/L)
  const rawEfficiency = distance / fuelUsed;
  const fuelEfficiency = Math.round(rawEfficiency * 10) / 10;

  // km당 연료비
  const rawCostPerKm = fuelPrice / rawEfficiency;
  const costPerKm = Math.round(rawCostPerKm * 10) / 10;

  // 100km당 연료비
  const costPer100km = Math.round(rawCostPerKm * 100);

  const result: FuelEconomyResult = {
    fuelEfficiency,
    costPer100km,
    costPerKm,
  };

  // 월 연료비 및 연간 연료비 (선택)
  if (monthlyDistance !== undefined && monthlyDistance > 0) {
    const monthlyFuelCost = Math.round((monthlyDistance / rawEfficiency) * fuelPrice);
    const annualFuelCost = monthlyFuelCost * 12;
    result.monthlyFuelCost = monthlyFuelCost;
    result.annualFuelCost = annualFuelCost;
  }

  return result;
}
