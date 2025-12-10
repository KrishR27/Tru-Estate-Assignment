"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilters = exports.getTransactions = void 0;
const transactionService_1 = require("../services/transactionService");
const getTransactions = async (req, res) => {
    try {
        const result = await (0, transactionService_1.getTransactionsService)(req.query);
        res.json(result);
    }
    catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({
            error: 'Failed to fetch transactions',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getTransactions = getTransactions;
const getFilters = async (req, res) => {
    try {
        const filters = await (0, transactionService_1.getFiltersService)();
        res.json(filters);
    }
    catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({
            error: 'Failed to fetch filters',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getFilters = getFilters;
