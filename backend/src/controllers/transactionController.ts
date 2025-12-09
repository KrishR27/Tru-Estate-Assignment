import { Request, Response } from 'express';
import { getTransactionsService, getFiltersService } from '../services/transactionService';

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getTransactionsService(req.query);
    res.json(result);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch transactions',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getFilters = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = await getFiltersService();
    res.json(filters);
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({ 
      error: 'Failed to fetch filters',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
