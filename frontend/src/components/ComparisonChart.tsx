import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface ComparisonChartProps {
  /**
   * Baseline GHG intensity value in gCO2eq/MJ.
   */
  baseline: number;

  /**
   * Comparison GHG intensity value in gCO2eq/MJ.
   */
  comparison: number;
}

const TARGET_2025_INTENSITY = 89.34;

/**
 * Bar chart comparing two GHG intensity values (Baseline vs Comparison)
 * with a reference line at the 2025 FuelEU target.
 */
export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  baseline,
  comparison,
}) => {
  const data = [
    { label: "Baseline", ghgIntensity: baseline },
    { label: "Comparison", ghgIntensity: comparison },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis
            label={{
              value: "GHG Intensity (gCO2eq/MJ)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value: number | undefined) => [
              value !== undefined ? `${value.toFixed(2)} gCO2eq/MJ` : "",
              "GHG Intensity",
            ]}
          />
          <Legend />
          <ReferenceLine
            y={TARGET_2025_INTENSITY}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{
              value: `2025 Target (${TARGET_2025_INTENSITY} gCO2eq/MJ)`,
              position: "top",
              fill: "#ef4444",
            }}
          />
          <Bar dataKey="ghgIntensity" name="GHG Intensity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

