import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FileUploader from '../components/FileUploader';
import { getFarmers, deleteFarmer, getSchemes, createScheme, deleteScheme } from '../services/apiService';

const Data = () => {
  const [activeTab, setActiveTab] = useState('retrain');
  const [farmers, setFarmers] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [newScheme, setNewScheme] = useState({ title: '', description: '' });

  useEffect(() => {
    if (activeTab === 'farmers') {
      fetchFarmers();
    }
    if (activeTab === 'schemes') {
      fetchSchemes();
    }
  }, [activeTab]);

  const fetchFarmers = async () => {
    try {
      const data = await getFarmers();
      setFarmers(data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }
  };

  const handleDeleteFarmer = async (farmerId) => {
    try {
      await deleteFarmer(farmerId);
      fetchFarmers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting farmer:', error);
    }
  };

  const fetchSchemes = async () => {
    try {
      const data = await getSchemes();
      setSchemes(data);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
  };

  const handleCreateScheme = async (e) => {
    e.preventDefault();
    try {
      await createScheme(newScheme);
      setNewScheme({ title: '', description: '' });
      fetchSchemes(); // Refresh the list
    } catch (error) {
      console.error('Error creating scheme:', error);
    }
  };

  const handleDeleteScheme = async (schemeId) => {
    try {
      await deleteScheme(schemeId);
      fetchSchemes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting scheme:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6 font-sans">
        <h1 className="text-3xl font-bold mb-8">Data Management</h1>
        
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('retrain')}
              className={`${activeTab === 'retrain' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Retrain AI Model
            </button>
            <button
              onClick={() => setActiveTab('farmers')}
              className={`${activeTab === 'farmers' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Manage Farmers
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className={`${activeTab === 'schemes' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Manage Schemes
            </button>
          </nav>
        </div>

        <div>
          {activeTab === 'retrain' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Upload New Dataset</h2>
              <p className="mb-4">
                Upload a new CSV file to retrain the AI model. The file should have the following columns: `Soil_Type`, `Rainfall_mm`, `Temperature_C`, `Fertilizer_Used_kg_per_acre`, `Crop`, `Yield_quintals_per_acre`.
              </p>
              <FileUploader />
            </div>
          )}

          {activeTab === 'farmers' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Farmers</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {farmers.map((farmer) => (
                      <tr key={farmer._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDeleteFarmer(farmer._id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'schemes' && (
            <div>
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-bold mb-4">Create New Scheme</h2>
                <form onSubmit={handleCreateScheme}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      id="title"
                      value={newScheme.title}
                      onChange={(e) => setNewScheme({ ...newScheme, title: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      rows="3"
                      value={newScheme.description}
                      onChange={(e) => setNewScheme({ ...newScheme, description: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create Scheme
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Existing Schemes</h2>
                <div className="space-y-4">
                  {schemes.map((scheme) => (
                    <div key={scheme._id} className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold">{scheme.title}</h3>
                        <p className="text-sm text-gray-600">{scheme.description}</p>
                      </div>
                      <button onClick={() => handleDeleteScheme(scheme._id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Data;
