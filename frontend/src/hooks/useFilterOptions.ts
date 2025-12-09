import { useState, useEffect } from 'react';
import { transactionService } from '../services/api';
import { FilterOptions } from '../types';

export const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        const options = await transactionService.getFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return { filterOptions, loading };
};
