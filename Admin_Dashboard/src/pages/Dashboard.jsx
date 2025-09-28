import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CropChart from '../components/CropChart';
import SoilTypePieChart from '../components/SoilTypePieChart';
import { getAnalytics } from '../services/apiService';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAnalytics()
      .then(data => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch analytics data.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar />

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <button
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {loading && <p>Loading analytics...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {analytics && (
            <>
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Quick Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded border border-gray-200 bg-white p-4">
                    <p className="text-sm text-gray-500">Total Farmers</p>
                    <p className="text-3xl font-bold">{analytics.usageStats.totalFarmers}</p>
                  </div>
                  <div className="rounded border border-gray-200 bg-white p-4">
                    <p className="text-sm text-gray-500">Total Predictions</p>
                    <p className="text-3xl font-bold">{analytics.usageStats.totalPredictions}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">Monthly Yield Trends</h2>
                  <div className="rounded border border-gray-200 bg-white p-4">
                    <CropChart data={analytics.yieldTrends} />
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">Predictions by Soil Type</h2>
                  <div className="rounded border border-gray-200 bg-white p-4">
                    <SoilTypePieChart data={analytics.predictionsBySoilType} />
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
