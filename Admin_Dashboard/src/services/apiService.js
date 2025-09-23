import axios from 'axios';
import { API_BASE_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
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
