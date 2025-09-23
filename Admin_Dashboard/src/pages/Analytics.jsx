import { useEffect, useState } from 'react';
import { getAnalytics } from '../services/apiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import NavBar from '../components/NavBar';

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError('Failed to fetch analytics data. Is the backend server running?');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!analytics) {
    return <div className="p-4">Loading...</div>;
  }

  const { usageStats, yieldTrends, predictionsBySoilType } = analytics;

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6 font-sans">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Total Predictions</h2>
            <p className="text-4xl">{usageStats.totalPredictions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Total Farmers</h2>
            <p className="text-4xl">{usageStats.totalFarmers}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Predictions by Soil Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={predictionsBySoilType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="soilType" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Yield Trends (Monthly Avg)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yieldTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="yield" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;