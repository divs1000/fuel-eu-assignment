import React from "react";

type Page = "routes" | "compare" | "banking" | "pooling";

interface SidebarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

const pages: { id: Page; label: string; icon: string }[] = [
  { id: "routes", label: "Routes", icon: "🚢" },
  { id: "compare", label: "Compare", icon: "📊" },
  { id: "banking", label: "Banking", icon: "💰" },
  { id: "pooling", label: "Pooling", icon: "🤝" },
];

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          FuelEU
        </h2>
        <p className="text-xs text-gray-500 mt-1">Compliance Dashboard</p>
      </div>
      <nav className="p-4 space-y-2">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              activePage === page.id
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-xl mr-3">{page.icon}</span>
            <span className="font-medium">{page.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
