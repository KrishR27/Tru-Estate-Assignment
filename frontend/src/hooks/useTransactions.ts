import { useState, useEffect } from 'react';
import { transactionService } from '../services/api';
import { Transaction, PaginationInfo, Filters } from '../types';

export const useTransactions = (filters: Filters, page: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: any = {
          page,
          limit: 10,
          ...filters,
        };

        // Convert arrays to comma-separated strings
        if (filters.customerRegion?.length) {
          params.customerRegion = filters.customerRegion.join(',');
        }
        if (filters.gender?.length) {
          params.gender = filters.gender.join(',');
        }
        if (filters.productCategory?.length) {
          params.productCategory = filters.productCategory.join(',');
        }
        if (filters.tags?.length) {
          params.tags = filters.tags.join(',');
        }
        if (filters.paymentMethod?.length) {
          params.paymentMethod = filters.paymentMethod.join(',');
        }

        const response = await transactionService.getTransactions(params);
        setTransactions(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filters, page]);

  return { transactions, pagination, loading, error };
};
