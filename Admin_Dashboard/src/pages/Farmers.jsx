
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { getFarmers } from '../services/apiService';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar/>
      <div className="bg-white p-6 rounded-lg shadow-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800">Farmers</h2>
        {error && <div className="text-red-500">{error}</div>}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmers.map((farmer) => (
              <tr key={farmer._id}>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Farmers;

