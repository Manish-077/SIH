import axios from 'axios';
import { API_BASE_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getAnalytics = async () => {
  try {
    const response = await apiClient.get('/admin/analytics');
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export const loginAdmin = async (credentials) => {
  try {
    const response = await apiClient.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerAdmin = async (adminData) => {
  try {
    const response = await apiClient.post('/admin/register', adminData);
    return response.data;
  } catch (error) {
    console.error('Error registering admin:', error);
    throw error;
  }
};

export const getFarmers = async () => {
  try {
    const response = await apiClient.get('/farmers');
    return response.data;
  } catch (error) {
    console.error('Error fetching farmers:', error);
    throw error;
  }
};

export const deleteFarmer = async (farmerId) => {
  try {
    const response = await apiClient.delete(`/farmers/${farmerId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting farmer:', error);
    throw error;
  }
};

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append('dataset', file);

  try {
    const response = await apiClient.post('/admin/dataset', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading dataset:', error);
    throw error;
  }
};

export const getSchemes = async () => {
  try {
    const response = await apiClient.get('/schemes');
    return response.data;
  } catch (error) {
    console.error('Error fetching schemes:', error);
    throw error;
  }
};

export const createScheme = async (schemeData) => {
  try {
    const response = await apiClient.post('/schemes', schemeData);
    return response.data;
  } catch (error) {
    console.error('Error creating scheme:', error);
    throw error;
  }
};

export const deleteScheme = async (schemeId) => {
  try {
    const response = await apiClient.delete(`/schemes/${schemeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting scheme:', error);
    throw error;
  }
};
