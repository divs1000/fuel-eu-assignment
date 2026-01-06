import React, { useState } from "react";

interface BankingTabProps {
  year: number;
}

export const BankingTab: React.FC<BankingTabProps> = ({ year }) => {
  const [cb, setCb] = useState<number | null>(null);
  const [applied, setApplied] = useState<number | null>(null);
  const [cbAfter, setCbAfter] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComplianceBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/compliance/cb?year=${year}`);
      // const data = await response.json();
      // setCb(data.cb);
      
      // Mock data for now
      setCb(1500.5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch compliance balance");
    } finally {
      setLoading(false);
    }
  };

  const handleBank = async () => {
    if (!cb || cb <= 0) {
      setError("Compliance Balance must be greater than 0 to bank");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // await fetch("/api/banking/bank", { method: "POST", body: JSON.stringify({ cb }) });
      setError(null);
      alert("Compliance balance banked successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to bank compliance balance");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!cb || cb <= 0) {
      setError("Compliance Balance must be greater than 0 to apply");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch("/api/banking/apply", { method: "POST", body: JSON.stringify({ cb }) });
      // const data = await response.json();
      // setApplied(data.applied);
      // setCbAfter(data.cb_after);
      
      // Mock data for now
      setApplied(500.0);
      setCbAfter(1000.5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply banked surplus");
    } finally {
      setLoading(false);
    }
  };

  const canPerformAction = cb !== null && cb > 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-green-50/30 rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
          <h3 className="text-xl font-bold text-gray-800">Fuel EU Article 20 - Banking</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
            <input
              type="number"
              value={year}
              readOnly
              className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium"
            />
          </div>
          <button
            onClick={fetchComplianceBalance}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Fetch Compliance Balance"
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {cb !== null && (
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl shadow-lg border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
            Key Performance Indicators
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
              <div className="text-sm font-medium text-gray-600 mb-2">CB Before</div>
              <div className={`text-3xl font-bold ${cb > 0 ? "text-green-600" : "text-red-600"}`}>
                {cb.toFixed(2)}
              </div>
            </div>
            {applied !== null && (
              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-600 mb-2">Applied</div>
                <div className="text-3xl font-bold text-purple-600">{applied.toFixed(2)}</div>
              </div>
            )}
            {cbAfter !== null && (
              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-600 mb-2">CB After</div>
                <div className={`text-3xl font-bold ${cbAfter > 0 ? "text-green-600" : "text-red-600"}`}>
                  {cbAfter.toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-xl shadow-lg border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
          <span className="w-1 h-6 bg-purple-500 rounded-full mr-3"></span>
          Actions
        </h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleBank}
            disabled={!canPerformAction || loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Bank Compliance Balance
          </button>
          <button
            onClick={handleApply}
            disabled={!canPerformAction || loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Apply Banked Surplus
          </button>
        </div>
        {!canPerformAction && cb !== null && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Note:</span> Actions disabled - Compliance Balance must be greater than 0
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
