
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        if (data && data.predictions) {
          setFarmers(data.predictions);
        }
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar/>
      <div className="bg-white p-6 rounded-lg shadow-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800">Farmers</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>Farmer Name</th>
              <th>District</th>
              <th>Input Data</th>
              <th>Predicted Yield</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((item, idx) => (
              <tr key={idx}>
                <td>{item.farmer?.name}</td>
                <td>{item.farmer?.location}</td>
                <td>{JSON.stringify(item.input)}</td>
                <td>{item.result}</td>
                <td>{item.timestamp?.slice(0,10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Farmers;

