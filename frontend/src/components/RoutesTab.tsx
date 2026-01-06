import React, { useState, useMemo } from "react";
import { RoutesTable, type Route } from "./RoutesTable";

interface RoutesTabProps {
  routes: Route[];
  onSetBaseline: (routeId: string) => void;
}

export const RoutesTab: React.FC<RoutesTabProps> = ({ routes, onSetBaseline }) => {
  const [vesselTypeFilter, setVesselTypeFilter] = useState<string>("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");

  const vesselTypes = useMemo(() => Array.from(new Set(routes.map((r) => r.vesselType))), [routes]);
  const fuelTypes = useMemo(() => Array.from(new Set(routes.map((r) => r.fuelType))), [routes]);
  const years = useMemo(() => Array.from(new Set(routes.map((r) => r.year.toString()))).sort(), [routes]);

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      if (vesselTypeFilter && route.vesselType !== vesselTypeFilter) return false;
      if (fuelTypeFilter && route.fuelType !== fuelTypeFilter) return false;
      if (yearFilter && route.year.toString() !== yearFilter) return false;
      return true;
    });
  }, [routes, vesselTypeFilter, fuelTypeFilter, yearFilter]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Filters Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <p className="text-sm text-gray-500">Narrow down routes by vessel, fuel, or year</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Vessel Type</label>
              <select
                value={vesselTypeFilter}
                onChange={(e) => setVesselTypeFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                {vesselTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
              <select
                value={fuelTypeFilter}
                onChange={(e) => setFuelTypeFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Fuels</option>
                {fuelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {(vesselTypeFilter || fuelTypeFilter || yearFilter) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setVesselTypeFilter("");
                    setFuelTypeFilter("");
                    setYearFilter("");
                  }}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <RoutesTable routes={filteredRoutes} onSetBaseline={onSetBaseline} />
      </div>
    </div>
  );
};
