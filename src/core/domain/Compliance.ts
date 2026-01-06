/**
 * Target GHG intensity for 2025 in gCO2eq/MJ.
 */
const TARGET_INTENSITY_2025 = 89.3368; // gCO2eq/MJ

/**
 * Lower Calorific Value (LCV) constant in MJ per metric ton.
 */
const LCV_MJ_PER_TON = 41000; // MJ/t

/**
 * Calculates the compliance balance for a fuel based on its actual GHG intensity
 * and consumed amount.
 *
 * Formula:
 *   (Target - Actual) * (Consumption * LCV)
 *
 * Where:
 * - Target = TARGET_INTENSITY_2025 (gCO2eq/MJ)
 * - Actual = ghgIntensity (gCO2eq/MJ)
 * - Consumption = fuelConsumptionMetricTons (t)
 * - LCV = LCV_MJ_PER_TON (MJ/t)
 *
 * A positive result represents a surplus (better than target),
 * while a negative result represents a deficit (worse than target).
 *
 * @param ghgIntensity - Actual GHG intensity in gCO2eq/MJ.
 * @param fuelConsumptionMetricTons - Fuel consumption in metric tons.
 * @returns The compliance balance (can be positive for surplus or negative for deficit).
 */
export function calculateComplianceBalance(
  ghgIntensity: number,
  fuelConsumptionMetricTons: number
): number {
  const targetMinusActual = TARGET_INTENSITY_2025 - ghgIntensity;
  const energyContent = fuelConsumptionMetricTons * LCV_MJ_PER_TON;

  return targetMinusActual * energyContent;
}

