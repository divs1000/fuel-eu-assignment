import React from "react";
import { CompareTab } from "../components/CompareTab";

interface ComparisonData {
  baseline: {
    ghgIntensity: number;
  };
  comparison: {
    ghgIntensity: number;
  };
}

interface ComparePageProps {
  comparisonData?: ComparisonData;
}

export const ComparePage: React.FC<ComparePageProps> = ({ comparisonData }) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Compare baseline and comparison routes against the 2025 FuelEU target</p>
      <CompareTab comparisonData={comparisonData} />
    </div>
  );
};
