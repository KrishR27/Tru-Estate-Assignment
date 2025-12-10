"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
// Get all transactions with search, filter, sort, pagination
router.get('/', transactionController_1.getTransactions);
// Get available filter options
router.get('/filters', transactionController_1.getFilters);
exports.default = router;
