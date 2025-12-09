import express from 'express';
import { 
  getTransactions, 
  getFilters 
} from '../controllers/transactionController';

const router = express.Router();

// Get all transactions with search, filter, sort, pagination
router.get('/', getTransactions);

// Get available filter options
router.get('/filters', getFilters);

export default router;
