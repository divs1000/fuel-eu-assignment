import React from "react";
import { RoutesTab } from "../components/RoutesTab";
import type { Route } from "../components/RoutesTable";

interface RoutesPageProps {
  routes: Route[];
  onSetBaseline: (routeId: string) => void;
}

export const RoutesPage: React.FC<RoutesPageProps> = ({ routes, onSetBaseline }) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">View and manage all shipping routes and their compliance data</p>
      <RoutesTab routes={routes} onSetBaseline={onSetBaseline} />
    </div>
  );
};
