import React from 'react';
import { Link } from 'react-router-dom';
import FarmerTable from '../components/NavBar';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <FarmerTable />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button className="rounded border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Logout
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Quick Stats */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Quick Stats</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="rounded border border-gray-200 bg-white p-4">
                <p className="text-3xl font-bold">120</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 w-3/4 rounded-full bg-black"></div>
                </div>
              </div>
              <div className="rounded border border-gray-200 bg-white p-4">
                <p className="text-3xl font-bold">30</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 w-1/2 rounded-full bg-black"></div>
                </div>
              </div>
              <div className="rounded border border-gray-200 bg-white p-4">
                <p className="text-3xl font-bold">5</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 w-1/4 rounded-full bg-black"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Predictions Table */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Recent Farmer Predictions</h2>
            <div className="rounded border border-gray-200 bg-white p-4">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Farmer Name</th>
                    <th className="px-6 py-3">District</th>
                    <th className="px-6 py-3">Input Data</th>
                    <th className="px-6 py-3">Predicted Yield</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4">Farmer Fornut</td>
                    <td className="px-6 py-4">12005 JM</td>
                    <td className="px-6 py-4">20005 JM</td>
                    <td className="px-6 py-4">60deui</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4">Farmer Fornut</td>
                    <td className="px-6 py-4">39.05 JM</td>
                    <td className="px-6 py-4">75205 JM</td>
                    <td className="px-6 py-4">60deui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Farmer Fornut</td>
                    <td className="px-6 py-4">56.05 JM</td>
                    <td className="px-6 py-4">72205 JM</td>
                    <td className="px-6 py-4">60deui</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Crop Suggestions Trends</h2>
            <div className="flex h-64 items-center justify-center rounded border border-gray-200 bg-white p-4 text-gray-400">
              Chart Area
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

