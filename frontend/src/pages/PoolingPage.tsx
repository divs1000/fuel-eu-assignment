import React from "react";
import { PoolingTab } from "../components/PoolingTab";

interface PoolingPageProps {
  year: number;
}

export const PoolingPage: React.FC<PoolingPageProps> = ({ year }) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Create and manage pooling arrangements under Fuel EU Article 21</p>
      <PoolingTab year={year} />
    </div>
  );
};
