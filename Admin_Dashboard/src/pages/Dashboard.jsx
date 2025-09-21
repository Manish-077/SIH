import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerTable from '../components/NavBar';

export default function Dashboard() {
  const [predictions, setPredictions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        if (data && data.predictions) {
          setPredictions(data.predictions);
        }
      });
  }, []);

  const handleLogout = () => {
    // Clear any auth state here (e.g., localStorage.removeItem('token'))
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <FarmerTable />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={handleLogout}
          >
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
                <p className="text-3xl font-bold">{predictions.length}</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 w-3/4 rounded-full bg-black"></div>
                </div>
              </div>
              {/* Add more stats as needed */}
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
                  {predictions.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-6 py-4">{item.farmer?.name}</td>
                      <td className="px-6 py-4">{item.farmer?.location}</td>
                      <td className="px-6 py-4">{JSON.stringify(item.input)}</td>
                      <td className="px-6 py-4">{item.result}</td>
                    </tr>
                  ))}
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

