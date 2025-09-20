import React from 'react';
import NavBar from '../components/NavBar';

// To make this component self-contained, we load the Recharts library from a CDN.
// In a real Vite/React project, you would `npm install recharts` and import it.
const loadRechartsScript = () => {
  if (!document.getElementById('recharts-script')) {
    const script = document.createElement('script');
    script.id = 'recharts-script';
    script.src = "https://unpkg.com/recharts/umd/Recharts.min.js";
    script.async = true;
    document.head.appendChild(script);
  }
};

// Mock Data for the chart and table
const cropSuggestionData = [
  { name: 'N1010', suggestions: 2200, predictions: 1800 },
  { name: 'N1020', suggestions: 2800, predictions: 2400 },
  { name: 'N1030', suggestions: 3200, predictions: 2900 },
  { name: 'N1040', suggestions: 900, predictions: 700 },
  { name: 'N1050', suggestions: 2500, predictions: 2100 },
  { name: 'N1060', suggestions: 3100, predictions: 2800 },
  { name: 'N1070', suggestions: 3400, predictions: 3000 },
  { name: 'W100', suggestions: 2300, predictions: 2000 },
  { name: 'J300', suggestions: 2800, predictions: 2500 },
  { name: 'N1080', suggestions: 1200, predictions: 1000 },
  { name: 'N1090', suggestions: 2900, predictions: 2600 },
];

const districtData = [
    { id: 1, district: 'Kurnool', topCrop: 'Paddy (N1020)', predictionCount: 450, accuracy: '92%' },
    { id: 2, district: 'Guntur', topCrop: 'Cotton (W100)', predictionCount: 620, accuracy: '88%' },
    { id: 3, district: 'Krishna', topCrop: 'Chilli (J300)', predictionCount: 380, accuracy: '95%' },
    { id: 4, district: 'Chittoor', topCrop: 'Mango (N1070)', predictionCount: 510, accuracy: '91%' },
];

// --- Reusable Components ---

const StatCard = ({ title, value, change, changeType }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    {change && (
      <p className={`text-xs mt-1 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
        {change} from last month
      </p>
    )}
  </div>
);

const Analytics = () => {
    // Load the chart library when the component mounts
    React.useEffect(() => {
        loadRechartsScript();
    }, []);
    
    // Check if the Recharts library is loaded before rendering the chart
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = window.Recharts || {};

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
          <NavBar/>
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6 font-sans">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

            {/* --- Key Metrics Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Predictions" value="12,450" change="+5.4%" changeType="increase" />
                <StatCard title="Overall Accuracy" value="91.2%" change="+1.2%" changeType="increase" />
                <StatCard title="Most Suggested Crop" value="Paddy (N1070)" />
                <StatCard title="Active Districts" value="8" change="-2" changeType="decrease"/>
            </div>

            {/* --- Crop Suggestion Trends Chart --- */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                 <h3 className="text-lg font-semibold text-gray-700 mb-4">Crop Suggestion Trends</h3>
                 <div className="h-80 w-full">
                 {BarChart ? (
                     <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={cropSuggestionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} />
                             <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                             <YAxis tick={{ fontSize: 12 }} />
                             <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#fff', 
                                    border: '1px solid #ddd',
                                    borderRadius: '0.5rem'
                                }}
                             />
                             <Legend wrapperStyle={{ fontSize: '14px' }} />
                             <Bar dataKey="suggestions" fill="#6b7280" name="Suggestions" radius={[4, 4, 0, 0]} />
                             <Bar dataKey="predictions" fill="#d1d5db" name="Predictions Made" radius={[4, 4, 0, 0]} />
                         </BarChart>
                     </ResponsiveContainer>
                 ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Loading Chart...
                    </div>
                 )}
                 </div>
            </div>

             {/* --- Suggestions by District Table --- */}
             <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance by District</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Suggested Crop</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction Count</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Accuracy</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {districtData.map((d) => (
                                <tr key={d.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.district}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{d.topCrop}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{d.predictionCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">{d.accuracy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Analytics;
