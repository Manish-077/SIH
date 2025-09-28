import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { getFarmers, deleteFarmer } from '../services/apiService';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const data = await getFarmers();
        setFarmers(data);
      } catch (err) {
        setError('Failed to fetch farmers.');
      }
    };

    fetchFarmers();
  }, []);

  const handleRemove = async (farmerId) => {
    if (window.confirm('Are you sure you want to remove this farmer?')) {
      try {
        await deleteFarmer(farmerId);
        setFarmers(farmers.filter(farmer => farmer._id !== farmerId));
      } catch (err) {
        setError('Failed to remove farmer.');
      }
    }
  };

  const filteredFarmers = farmers.filter(farmer =>
    (farmer.name && farmer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (farmer.location && farmer.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <h1 className="text-2xl font-bold">Farmer Management</h1>
          <input
            type="text"
            placeholder="Search by name or district..."
            className="border border-gray-300 rounded px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {error && <div className="text-red-500">{error}</div>}
          <div className="bg-white p-6 rounded-lg shadow-sm w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFarmers.map((farmer) => (
                  <tr key={farmer._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{farmer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{farmer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{farmer.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleRemove(farmer._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Farmers;
