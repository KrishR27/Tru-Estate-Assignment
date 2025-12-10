"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiltersService = exports.getTransactionsService = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const queryBuilder_1 = require("../utils/queryBuilder");
const getTransactionsService = async (queryParams) => {
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const skip = (page - 1) * limit;
    // Build filter query
    const filters = (0, queryBuilder_1.buildQueryFilters)(queryParams);
    // Build sort query
    const sort = (0, queryBuilder_1.buildSortQuery)(queryParams.sortBy);
    // Execute query
    const [transactions, total] = await Promise.all([
        Transaction_1.default.find(filters)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
        Transaction_1.default.countDocuments(filters)
    ]);
    return {
        data: transactions,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            recordsPerPage: limit,
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1
        }
    };
};
exports.getTransactionsService = getTransactionsService;
const getFiltersService = async () => {
    const [regions, genders, categories, allTags, paymentMethods, dateRange] = await Promise.all([
        Transaction_1.default.distinct('customerRegion'),
        Transaction_1.default.distinct('gender'),
        Transaction_1.default.distinct('productCategory'),
        Transaction_1.default.distinct('tags'),
        Transaction_1.default.distinct('paymentMethod'),
        Transaction_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    minDate: { $min: '$date' },
                    maxDate: { $max: '$date' }
                }
            }
        ])
    ]);
    return {
        customerRegion: regions.sort(),
        gender: genders.sort(),
        productCategory: categories.sort(),
        tags: allTags.sort(),
        paymentMethod: paymentMethods.sort(),
        dateRange: dateRange[0] || { minDate: null, maxDate: null }
    };
};
exports.getFiltersService = getFiltersService;
