import Transaction from '../models/Transaction';
import { buildQueryFilters, buildSortQuery } from '../utils/queryBuilder';

interface QueryParams {
  search?: string;
  customerRegion?: string;
  gender?: string;
  ageMin?: string;
  ageMax?: string;
  productCategory?: string;
  tags?: string;
  paymentMethod?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

export const getTransactionsService = async (queryParams: QueryParams) => {
  const page = parseInt(queryParams.page as string) || 1;
  const limit = parseInt(queryParams.limit as string) || 10;
  const skip = (page - 1) * limit;

  // Build filter query
  const filters = buildQueryFilters(queryParams);

  // Build sort query
  const sort = buildSortQuery(queryParams.sortBy);

  // Execute query
  const [transactions, total] = await Promise.all([
    Transaction.find(filters)
      .sort(sort as any)
      .skip(skip)
      .limit(limit)
      .lean(),
    Transaction.countDocuments(filters)
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

export const getFiltersService = async () => {
  const [
    regions,
    genders,
    categories,
    allTags,
    paymentMethods,
    dateRange
  ] = await Promise.all([
    Transaction.distinct('customerRegion'),
    Transaction.distinct('gender'),
    Transaction.distinct('productCategory'),
    Transaction.distinct('tags'),
    Transaction.distinct('paymentMethod'),
    Transaction.aggregate([
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
