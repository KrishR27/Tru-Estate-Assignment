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
}

export const buildQueryFilters = (queryParams: QueryParams) => {
  const filters: any = {};

  // Search functionality (Customer Name, Phone Number)
  if (queryParams.search) {
    filters.$or = [
      { customerName: { $regex: queryParams.search, $options: 'i' } },
      { phoneNumber: { $regex: queryParams.search, $options: 'i' } }
    ];
  }

  // Customer Region filter (multi-select)
  if (queryParams.customerRegion) {
    const regions = queryParams.customerRegion.split(',');
    filters.customerRegion = { $in: regions };
  }

  // Gender filter (multi-select)
  if (queryParams.gender) {
    const genders = queryParams.gender.split(',');
    filters.gender = { $in: genders };
  }

  // Age range filter
  if (queryParams.ageMin || queryParams.ageMax) {
    filters.age = {};
    if (queryParams.ageMin) filters.age.$gte = parseInt(queryParams.ageMin);
    if (queryParams.ageMax) filters.age.$lte = parseInt(queryParams.ageMax);
  }

  // Product Category filter (multi-select)
  if (queryParams.productCategory) {
    const categories = queryParams.productCategory.split(',');
    filters.productCategory = { $in: categories };
  }

  // Tags filter (multi-select)
  if (queryParams.tags) {
    const tagsList = queryParams.tags.split(',');
    filters.tags = { $in: tagsList };
  }

  // Payment Method filter (multi-select)
  if (queryParams.paymentMethod) {
    const methods = queryParams.paymentMethod.split(',');
    filters.paymentMethod = { $in: methods };
  }

  // Date range filter
  if (queryParams.dateFrom || queryParams.dateTo) {
    filters.date = {};
    if (queryParams.dateFrom) filters.date.$gte = new Date(queryParams.dateFrom);
    if (queryParams.dateTo) filters.date.$lte = new Date(queryParams.dateTo);
  }

  return filters;
};

export const buildSortQuery = (sortBy?: string) => {
  switch (sortBy) {
    case 'date-newest':
      return { date: -1 };
    case 'date-oldest':
      return { date: 1 };
    case 'quantity-high':
      return { quantity: -1 };
    case 'quantity-low':
      return { quantity: 1 };
    case 'name-asc':
      return { customerName: 1 };
    case 'name-desc':
      return { customerName: -1 };
    default:
      return { date: -1 }; // Default: newest first
  }
};
