import React from 'react';
import NavBar from '../components/NavBar';

// --- Icon Components (using inline SVG) ---

const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ChevronLeftIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const EyeIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);


// Mock data for the farmers table
const farmersData = [
  { id: 1, name: 'Aarav Sharma', district: 'Kurnool', inputData: '20105 JM', predictedYield: '65deui', date: '2025-09-18' },
  { id: 2, name: 'Priya Patel', district: 'Guntur', inputData: '75205 JM', predictedYield: '60deui', date: '2025-09-17' },
  { id: 3, name: 'Rohan Das', district: 'Krishna', inputData: '72205 JM', predictedYield: '62deui', date: '2025-09-17' },
  { id: 4, name: 'Sneha Reddy', district: 'Chittoor', inputData: '12005 JM', predictedYield: '70deui', date: '2025-09-16' },
  { id: 5, name: 'Vikram Singh', district: 'Visakhapatnam', inputData: '3905 JM', predictedYield: '58deui', date: '2025-09-15' },
  { id: 6, name: 'Anjali Gupta', district: 'Anantapur', inputData: '5605 JM', predictedYield: '68deui', date: '2025-09-14' },
  { id: 7, name: 'Mohammed Khan', district: 'Kadapa', inputData: '81234 JM', predictedYield: '63deui', date: '2025-09-13' },
  { id: 8, name: 'Kavita Iyer', district: 'Prakasam', inputData: '90210 JM', predictedYield: '66deui', date: '2025-09-12' },
];


const Farmers = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar/>
      <div className="bg-white p-6 rounded-lg shadow-sm w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Farmers</h2>
            <p className="text-sm text-gray-500">Manage farmer predictions and data.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search farmers..."
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Yield</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {farmersData.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{farmer.district}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{farmer.inputData}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{farmer.predictedYield}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{farmer.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500 hover:text-gray-800"><EyeIcon /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{farmersData.length}</span> of <span className="font-medium">{farmersData.length}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmers;

