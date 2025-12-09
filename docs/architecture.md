# TruEstate Sales Management System - Architecture

## System Overview

The TruEstate Sales Management System is a full-stack application designed to manage and analyze retail sales data efficiently. It handles 1 million+ transaction records with advanced search, filtering, sorting, and pagination capabilities.

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Data Import:** csv-parser

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Library:** Ant Design
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Date Handling:** Day.js

---

## Backend Architecture

### Folder Structure
```
backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   └── transactionController.ts
│   ├── models/              # Mongoose schemas
│   │   └── Transaction.ts
│   ├── routes/              # API endpoints
│   │   └── transactionRoutes.ts
│   ├── services/            # Business logic
│   │   └── transactionService.ts
│   ├── utils/               # Utility functions
│   │   ├── queryBuilder.ts  # Query construction
│   │   └── seedDatabase.ts  # Data import script
│   └── index.ts             # Entry point
├── package.json
├── tsconfig.json
└── .env
```

### Module Responsibilities

#### **Models (Data Layer)**
- Define MongoDB schema and indexes
- Enforce data validation
- Provide type safety with TypeScript interfaces

**Transaction Model:**
- 27 fields covering customer, product, and sales data
- Indexes on frequently queried fields (date, region, category, etc.)
- Text index for search functionality

#### **Controllers (Request Layer)**
- Handle HTTP requests and responses
- Validate input parameters
- Call appropriate service methods
- Return formatted responses

#### **Services (Business Logic Layer)**
- Implement core business logic
- Query database using Mongoose
- Process and transform data
- Handle errors gracefully

**transactionService:**
- `getTransactionsService()`: Fetches paginated, filtered, sorted data
- `getFiltersService()`: Returns available filter options

#### **Routes (API Layer)**
- Define API endpoints
- Map URLs to controller methods
- Middleware integration

**API Endpoints:**
- `GET /api/transactions` - Get transactions with filters
- `GET /api/transactions/filters` - Get filter options

#### **Utils (Helper Layer)**
- `queryBuilder.ts`: Constructs MongoDB queries from request params
- `seedDatabase.ts`: Imports CSV data into MongoDB

### Data Flow (Backend)

```
Request → Routes → Controller → Service → Model → MongoDB
                                                      ↓
Response ← Routes ← Controller ← Service ← Model ← MongoDB
```

### Database Schema Design

**Transaction Collection:**
```typescript
{
  transactionId: String (indexed)
  date: Date (indexed)
  customerId: String (indexed)
  customerName: String (indexed, text)
  phoneNumber: String (indexed, text)
  gender: String
  age: Number
  customerRegion: String (indexed)
  customerType: String
  productId: String
  productName: String
  brand: String
  productCategory: String (indexed)
  tags: [String] (indexed)
  quantity: Number
  pricePerUnit: Number
  discountPercentage: Number
  totalAmount: Number
  finalAmount: Number
  paymentMethod: String (indexed)
  orderStatus: String
  deliveryType: String
  storeId: String
  storeLocation: String
  salespersonId: String
  employeeName: String
}
```

**Indexes:**
- Single field indexes on frequently filtered fields
- Text index on customerName and phoneNumber for search
- Compound indexes for common query patterns

---

## Frontend Architecture

### Folder Structure
```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── SalesManagementSystem.tsx  # Main container
│   │   ├── SearchBar.tsx              # Search UI
│   │   ├── FilterPanel.tsx            # Filter UI
│   │   ├── SortDropdown.tsx           # Sort UI
│   │   └── TransactionTable.tsx       # Table & pagination
│   ├── hooks/               # Custom React hooks
│   │   ├── useTransactions.ts
│   │   └── useFilterOptions.ts
│   ├── services/            # API communication
│   │   └── api.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── utils/               # Helper functions
│   │   └── formatters.ts
│   ├── styles/              # CSS files
│   │   └── index.css
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### Component Hierarchy

```
App
└── SalesManagementSystem
    ├── Statistics Cards (3)
    ├── SearchBar
    ├── SortDropdown
    ├── FilterPanel
    └── TransactionTable
        └── Pagination
```

### Module Responsibilities

#### **Components (Presentation Layer)**
- Render UI elements
- Handle user interactions
- Manage local state
- Call custom hooks for data

**SalesManagementSystem:**
- Main container component
- Manages global state (filters, page, sort)
- Orchestrates child components
- Displays statistics

**SearchBar:**
- Search input field
- Triggers search on user input

**FilterPanel:**
- Multi-select dropdowns for filters
- Age range inputs
- Date range picker
- Apply/Clear filter actions

**SortDropdown:**
- Dropdown with sort options
- Triggers sort on selection

**TransactionTable:**
- Displays data in table format
- Handles pagination
- Shows loading and error states

#### **Hooks (Data Layer)**
- Fetch data from API
- Manage data state
- Handle loading and error states

**useTransactions:**
- Fetches transaction data
- Reacts to filter/sort/page changes
- Returns data, pagination, loading, error

**useFilterOptions:**
- Fetches available filter options
- Called once on mount

#### **Services (API Layer)**
- Centralized API client
- HTTP request methods
- Base URL configuration

**api.ts:**
- Axios instance configuration
- `getTransactions()`: Fetch transactions
- `getFilterOptions()`: Fetch filter options

#### **Types (Type Safety)**
- TypeScript interfaces for all data structures
- Ensures type safety across the app

#### **Utils (Helper Functions)**
- Format currency (INR)
- Format dates
- Format phone numbers

### Data Flow (Frontend)

```
User Action → Component → Hook → Service → API Request
                                              ↓
User sees update ← Component ← Hook ← Service ← API Response
```

### State Management

**Local State (useState):**
- Filter values
- Current page
- Sort option
- Search query

**Server State (Custom Hooks):**
- Transaction data
- Pagination info
- Filter options
- Loading states
- Error states

---

## Search Implementation

### Backend
1. User enters search query
2. Query builder constructs MongoDB `$or` query
3. Searches across `customerName` and `phoneNumber` fields
4. Uses regex with case-insensitive flag (`$options: 'i'`)
5. Text index on these fields improves performance

**Code:**
```typescript
if (queryParams.search) {
  filters.$or = [
    { customerName: { $regex: queryParams.search, $options: 'i' } },
    { phoneNumber: { $regex: queryParams.search, $options: 'i' } }
  ];
}
```

### Frontend
- Ant Design Search component
- Triggers search on Enter or button click
- Updates filter state
- Resets page to 1

---

## Filter Implementation

### Backend
1. Parse query parameters
2. Convert comma-separated values to arrays
3. Use MongoDB `$in` operator for multi-select filters
4. Use `$gte`/`$lte` for range filters
5. Combine all filters with implicit `$and`

**Multi-select Example:**
```typescript
if (queryParams.productCategory) {
  const categories = queryParams.productCategory.split(',');
  filters.productCategory = { $in: categories };
}
```

**Range Example:**
```typescript
if (queryParams.ageMin || queryParams.ageMax) {
  filters.age = {};
  if (queryParams.ageMin) filters.age.$gte = parseInt(queryParams.ageMin);
  if (queryParams.ageMax) filters.age.$lte = parseInt(queryParams.ageMax);
}
```

### Frontend
- Multi-select dropdowns for categorical filters
- Input fields for range filters
- Date range picker for date filters
- "Apply Filters" button triggers API call
- Filters stored in component state
- Converted to query params before API call

---

## Sorting Implementation

### Backend
1. Parse `sortBy` query parameter
2. Map to MongoDB sort object
3. Apply sort in query pipeline

**Code:**
```typescript
switch (sortBy) {
  case 'date-newest': return { date: -1 };
  case 'quantity-high': return { quantity: -1 };
  case 'name-asc': return { customerName: 1 };
  default: return { date: -1 };
}
```

### Frontend
- Dropdown with predefined sort options
- On change, updates sort state
- Triggers new API call
- Maintains filters and search

---

## Pagination Implementation

### Backend
1. Parse `page` and `limit` query params
2. Calculate `skip` value: `(page - 1) * limit`
3. Use Mongoose `.skip()` and `.limit()`
4. Count total documents matching filters
5. Return data + pagination metadata

**Response Structure:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 100,
    "totalRecords": 1000,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Frontend
- Ant Design Pagination component
- Shows current page, total records, and range
- On page change, updates page state
- Triggers new API call
- Maintains filters, search, and sort

---

## Performance Optimizations

### Backend
- **Database Indexes:** Speed up queries
- **Lean Queries:** Use `.lean()` to return plain objects
- **Batch Inserts:** Import CSV data in batches of 1000
- **Query Optimization:** Limit fields returned if needed

### Frontend
- **Code Splitting:** Vite's automatic code splitting
- **Lazy Loading:** Load components as needed
- **Memoization:** Use React.memo for expensive components
- **Debouncing:** Debounce search input

---

## Security Considerations

### Backend
- **CORS:** Configured for specific origins
- **Environment Variables:** Sensitive data in `.env`
- **Input Validation:** Sanitize user inputs
- **Error Handling:** Don't expose internal errors

### Frontend
- **API URL:** Configured via environment variable
- **No Sensitive Data:** Don't store secrets in frontend
- **HTTPS:** Use HTTPS in production

---

## Deployment Strategy

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy backend service
4. Seed database with CSV data

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Set environment variables
5. Deploy

### Database (MongoDB Atlas)
1. Create free cluster
2. Whitelist IP addresses
3. Create database user
4. Get connection string
5. Update backend `.env`

---

## Error Handling

### Backend
- Try-catch blocks in all async functions
- Return meaningful error messages
- Log errors for debugging
- Use HTTP status codes correctly

### Frontend
- Display error messages to user
- Handle network errors gracefully
- Show loading states
- Fallback UI for empty states

---

## Testing Strategy

### Backend
- **Unit Tests:** Test individual functions
- **Integration Tests:** Test API endpoints
- **Load Tests:** Test with large datasets

### Frontend
- **Component Tests:** Test UI components
- **Hook Tests:** Test custom hooks
- **E2E Tests:** Test user flows

---

## Future Enhancements

1. **Export Functionality:** Export filtered data to CSV/Excel
2. **Advanced Analytics:** Charts and graphs
3. **Real-time Updates:** WebSocket for live data
4. **User Authentication:** Login and role-based access
5. **Caching:** Redis for frequently accessed data
6. **Advanced Search:** Elasticsearch integration

---

## Conclusion

This architecture ensures:
- ✅ **Scalability:** Handles millions of records
- ✅ **Maintainability:** Clean, modular code
- ✅ **Performance:** Fast queries and responsive UI
- ✅ **Type Safety:** TypeScript throughout
- ✅ **Best Practices:** Industry-standard patterns
