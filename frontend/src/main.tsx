import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Sidebar } from "./components/Sidebar";
import { RoutesPage } from "./pages/RoutesPage";
import { ComparePage } from "./pages/ComparePage";
import { BankingPage } from "./pages/BankingPage";
import { PoolingPage } from "./pages/PoolingPage";
import type { Route } from "./components/RoutesTable";

const mockRoutes: Route[] = [
  {
    id: "R001",
    vesselType: "Container",
    fuelType: "HFO",
    year: 2024,
    ghgIntensity: 91.0,
    fuelConsumption: 5000,
    distance: 12000,
    totalEmissions: 4500,
  },
  {
    id: "R002",
    vesselType: "BulkCarrier",
    fuelType: "LNG",
    year: 2024,
    ghgIntensity: 88.0,
    fuelConsumption: 4800,
    distance: 11500,
    totalEmissions: 4200,
  },
  {
    id: "R003",
    vesselType: "Tanker",
    fuelType: "MGO",
    year: 2024,
    ghgIntensity: 93.5,
    fuelConsumption: 5100,
    distance: 12500,
    totalEmissions: 4700,
  },
  {
    id: "R004",
    vesselType: "RoRo",
    fuelType: "HFO",
    year: 2025,
    ghgIntensity: 89.2,
    fuelConsumption: 4900,
    distance: 11800,
    totalEmissions: 4300,
  },
  {
    id: "R005",
    vesselType: "Container",
    fuelType: "LNG",
    year: 2025,
    ghgIntensity: 90.5,
    fuelConsumption: 4950,
    distance: 11900,
    totalEmissions: 4400,
  },
];

type Page = "routes" | "compare" | "banking" | "pooling";

function App() {
  const [activePage, setActivePage] = useState<Page>("routes");
  const [baselineRouteId, setBaselineRouteId] = useState<string | null>(null);
  const [comparisonRouteId] = useState<string | null>(null);

  const handleSetBaseline = async (routeId: string) => {
    // TODO: Replace with actual API call
    // await fetch(`/api/routes/${routeId}/baseline`, { method: "POST" });
    setBaselineRouteId(routeId);
    alert(`Baseline set to ${routeId}`);
  };

  const baselineRoute = baselineRouteId ? mockRoutes.find((r) => r.id === baselineRouteId) : null;
  const comparisonRoute = comparisonRouteId
    ? mockRoutes.find((r) => r.id === comparisonRouteId)
    : mockRoutes.find((r) => r.id === "R002");

  const comparisonData =
    baselineRoute && comparisonRoute
      ? {
          baseline: { ghgIntensity: baselineRoute.ghgIntensity },
          comparison: { ghgIntensity: comparisonRoute.ghgIntensity },
        }
      : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-5 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">FuelEU Compliance Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage vessel compliance and baselines</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {activePage === "routes" && (
              <RoutesPage routes={mockRoutes} onSetBaseline={handleSetBaseline} />
            )}
            {activePage === "compare" && <ComparePage comparisonData={comparisonData} />}
            {activePage === "banking" && <BankingPage year={2025} />}
            {activePage === "pooling" && <PoolingPage year={2025} />}
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
