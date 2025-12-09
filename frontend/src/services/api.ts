import axios from 'axios';
import { TransactionResponse, FilterOptions } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transactionService = {
  getTransactions: async (params: any): Promise<TransactionResponse> => {
    const response = await apiClient.get('/transactions', { params });
    return response.data;
  },

  getFilterOptions: async (): Promise<FilterOptions> => {
    const response = await apiClient.get('/transactions/filters');
    return response.data;
  },
};

export default apiClient;
