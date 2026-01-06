import React from "react";
import { ComparisonChart } from "./ComparisonChart";

interface ComparisonData {
  baseline: {
    ghgIntensity: number;
  };
  comparison: {
    ghgIntensity: number;
  };
}

interface CompareTabProps {
  comparisonData?: ComparisonData;
}

const TARGET_VALUE = 89.3368; // gCO2e/MJ

export const CompareTab: React.FC<CompareTabProps> = ({ comparisonData }) => {
  if (!comparisonData) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium text-lg">No comparison data available</p>
        <p className="text-sm text-gray-400 mt-2">Set a baseline route first from the Routes tab</p>
      </div>
    );
  }

  const { baseline, comparison } = comparisonData;
  const percentDiff = ((comparison.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
  const baselineCompliant = baseline.ghgIntensity <= TARGET_VALUE;
  const comparisonCompliant = comparison.ghgIntensity <= TARGET_VALUE;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-3"></div>
          <h3 className="text-xl font-bold text-gray-800">Comparison Table</h3>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Baseline
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Comparison
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <tr className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">GHG Intensity</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {baseline.ghgIntensity.toFixed(2)} gCO2e/MJ
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {comparison.ghgIntensity.toFixed(2)} gCO2e/MJ
                </td>
              </tr>
              <tr className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">% Difference</td>
                <td className="px-6 py-4 text-sm text-gray-500">-</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`font-semibold ${
                      percentDiff < 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {percentDiff >= 0 ? "+" : ""}
                    {percentDiff.toFixed(2)}%
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">Compliant</td>
                <td className="px-6 py-4 text-sm">
                  {baselineCompliant ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✔ Compliant
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      ❌ Non-compliant
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {comparisonCompliant ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✔ Compliant
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      ❌ Non-compliant
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Target:</span> {TARGET_VALUE} gCO2e/MJ (2% below 91.16)
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3"></div>
          <h3 className="text-xl font-bold text-gray-800">GHG Intensity Comparison Chart</h3>
        </div>
        <ComparisonChart baseline={baseline.ghgIntensity} comparison={comparison.ghgIntensity} />
      </div>
    </div>
  );
};
