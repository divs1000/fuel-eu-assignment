import React, { useState } from "react";

interface PoolMember {
  shipId: string;
  adjustedCB: number;
  cbAfter?: number;
}

interface PoolingTabProps {
  year: number;
}

export const PoolingTab: React.FC<PoolingTabProps> = ({ year }) => {
  const [members, setMembers] = useState<PoolMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdjustedCB = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/compliance/adjusted-cb?year=${year}`);
      // const data = await response.json();
      // setMembers(data.members);
      
      // Mock data for now
      setMembers([
        { shipId: "SHIP001", adjustedCB: 500.5 },
        { shipId: "SHIP002", adjustedCB: -200.3 },
        { shipId: "SHIP003", adjustedCB: 300.2 },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch adjusted compliance balance");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePool = async () => {
    const poolSum = members.reduce((sum, m) => sum + m.adjustedCB, 0);
    
    // Validation rules
    if (poolSum < 0) {
      setError("Pool sum must be greater than or equal to 0");
      return;
    }

    // Check if any deficit ship would exit in worse state
    const hasInvalidExit = members.some((m) => {
      if (m.adjustedCB < 0 && m.cbAfter !== undefined && m.cbAfter < m.adjustedCB) {
        return true;
      }
      return false;
    });

    if (hasInvalidExit) {
      setError("A deficit ship cannot exit the pool in a worse state");
      return;
    }

    // Check if any surplus ship would exit with negative balance
    const hasInvalidSurplus = members.some((m) => {
      if (m.adjustedCB > 0 && m.cbAfter !== undefined && m.cbAfter < 0) {
        return true;
      }
      return false;
    });

    if (hasInvalidSurplus) {
      setError("A surplus ship cannot exit the pool with a negative balance");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // await fetch("/api/pools", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ members, year }),
      // });
      alert("Pool created successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create pool");
    } finally {
      setLoading(false);
    }
  };

  const poolSum = members.reduce((sum, m) => sum + m.adjustedCB, 0);
  const isValidPool = poolSum >= 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3"></div>
          <h3 className="text-xl font-bold text-gray-800">Fuel EU Article 21 - Pooling</h3>
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
            onClick={fetchAdjustedCB}
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
              "Fetch Adjusted Compliance Balance"
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

      {members.length > 0 && (
        <>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-1 h-6 bg-gray-500 rounded-full mr-3"></span>
              Pool Members
            </h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Ship ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Adjusted CB (Before)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Adjusted CB (After)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {members.map((member, index) => (
                    <tr
                      key={member.shipId}
                      className={`transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-indigo-50`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">{member.shipId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {member.adjustedCB >= 0 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {member.adjustedCB.toFixed(2)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            {member.adjustedCB.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {member.cbAfter !== undefined ? (
                          member.cbAfter >= 0 ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {member.cbAfter.toFixed(2)}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              {member.cbAfter.toFixed(2)}
                            </span>
                          )
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50/30 rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
                Pool Sum
              </h4>
              <div
                className={`text-4xl font-bold ${
                  isValidPool ? "text-green-600" : "text-red-600"
                }`}
              >
                {poolSum.toFixed(2)}
              </div>
            </div>
            <button
              onClick={handleCreatePool}
              disabled={!isValidPool || loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Pool"
              )}
            </button>
            {!isValidPool && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium">
                  Pool sum must be greater than or equal to 0
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
