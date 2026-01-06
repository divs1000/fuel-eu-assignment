import React from "react";
import { BankingTab } from "../components/BankingTab";

interface BankingPageProps {
  year: number;
}

export const BankingPage: React.FC<BankingPageProps> = ({ year }) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Manage compliance balance banking under Fuel EU Article 20</p>
      <BankingTab year={year} />
    </div>
  );
};
