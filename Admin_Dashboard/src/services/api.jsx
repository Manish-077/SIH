import axios from 'axios';
import { API_BASE_URL } from '../config';

export const fetchAnalytics = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/admin/analytics`);
    return res.data;
};

export const uploadDataset = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(`${API_BASE_URL}/api/admin/upload`, formData);
    return res.data;
};