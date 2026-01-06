import { describe, it, expect } from "vitest";
import { calculateComplianceBalance } from "./Compliance";

describe("calculateComplianceBalance", () => {
  const TARGET_2025 = 89.3368; // gCO2eq/MJ
  const LCV = 41000; // MJ/t
  const FUEL_CONSUMPTION = 100; // metric tons (using a fixed value for testing)

  it("should return negative value (deficit) when intensity is above target (91.0)", () => {
    const ghgIntensity = 91.0; // Above target of 89.3368
    const result = calculateComplianceBalance(ghgIntensity, FUEL_CONSUMPTION);

    // Expected: (89.3368 - 91.0) * (100 * 41000) = -1.6632 * 4100000 = -6819120
    const expected = (TARGET_2025 - ghgIntensity) * (FUEL_CONSUMPTION * LCV);
    
    expect(result).toBe(expected);
    expect(result).toBeLessThan(0); // Should be negative (deficit)
  });

  it("should return positive value (surplus) when intensity is below target (88.0)", () => {
    const ghgIntensity = 88.0; // Below target of 89.3368
    const result = calculateComplianceBalance(ghgIntensity, FUEL_CONSUMPTION);

    // Expected: (89.3368 - 88.0) * (100 * 41000) = 1.3368 * 4100000 = 5480880
    const expected = (TARGET_2025 - ghgIntensity) * (FUEL_CONSUMPTION * LCV);
    
    expect(result).toBe(expected);
    expect(result).toBeGreaterThan(0); // Should be positive (surplus)
  });
});
