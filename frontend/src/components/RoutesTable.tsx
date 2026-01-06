import React from "react";

/**
 * Route entity type matching the domain model.
 */
export interface Route {
  id: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption?: number;
  distance?: number;
  totalEmissions?: number;
}

interface RoutesTableProps {
  routes: Route[];
  onSetBaseline?: (routeId: string) => void;
}

/**
 * React component that displays routes in a clean, modern table using Tailwind CSS.
 *
 * Columns: Route ID, Vessel Type, Fuel Type, Year, GHG Intensity.
 * Styled with gray-50 headers and white rows.
 */
export const RoutesTable: React.FC<RoutesTableProps> = ({ routes, onSetBaseline }) => {
  if (routes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">No routes found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Route ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Vessel Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Fuel Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              GHG Intensity
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Fuel Consumption (t)
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Distance (km)
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Emissions (t)
            </th>
            {onSetBaseline && (
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {routes.map((route, index) => (
            <tr
              key={route.id}
              className={`transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              } hover:bg-gray-50`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-semibold text-gray-900">{route.id}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {route.vesselType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {route.fuelType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-700">{route.year}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`text-sm font-mono ${
                    route.ghgIntensity <= 89.3368 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {route.ghgIntensity.toFixed(2)} <span className="text-gray-500">gCO2eq/MJ</span>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-mono text-gray-800">
                  {route.fuelConsumption?.toLocaleString() ?? "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-mono text-gray-800">
                  {route.distance?.toLocaleString() ?? "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-mono text-gray-800">
                  {route.totalEmissions?.toLocaleString() ?? "-"}
                </span>
              </td>
              {onSetBaseline && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onSetBaseline(route.id)}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-md shadow-sm hover:bg-blue-50 transition-colors"
                  >
                    Set Baseline
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

