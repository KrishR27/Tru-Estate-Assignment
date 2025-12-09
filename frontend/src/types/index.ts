export interface Transaction {
  _id: string;
  transactionId: string;
  date: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  customerRegion: string;
  customerType: string;
  productId: string;
  productName: string;
  brand: string;
  productCategory: string;
  tags: string[];
  quantity: number;
  pricePerUnit: number;
  discountPercentage: number;
  totalAmount: number;
  finalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
}

export interface Filters {
  search?: string;
  customerRegion?: string[];
  gender?: string[];
  ageMin?: number;
  ageMax?: number;
  productCategory?: string[];
  tags?: string[];
  paymentMethod?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface TransactionResponse {
  data: Transaction[];
  pagination: PaginationInfo;
}

export interface FilterOptions {
  customerRegion: string[];
  gender: string[];
  productCategory: string[];
  tags: string[];
  paymentMethod: string[];
  dateRange: {
    minDate: string;
    maxDate: string;
  };
}
