# TruEstate Frontend

## Overview
Modern, responsive frontend for TruEstate Sales Management System built with React, TypeScript, and Ant Design.

## Tech Stack
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Library:** Ant Design
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Date Handling:** Day.js

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```
Application will run on `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

## Features Implemented

### Search Implementation
- **Real-time search** across Customer Name and Phone Number
- **Case-insensitive** matching
- **Debounced** for performance
- Works alongside filters and sorting

### Filter Implementation
- **Multi-select filters** for:
  - Customer Region
  - Gender
  - Product Category
  - Tags
  - Payment Method
- **Range filters** for:
  - Age (Min-Max)
  - Date Range (From-To)
- Filters work independently and in combination
- State preservation across pagination

### Sorting Implementation
- Sort by:
  - Date (Newest/Oldest First)
  - Quantity (High to Low / Low to High)
  - Customer Name (A-Z / Z-A)
- Maintains active filters and search while sorting
- Default sort: Date (Newest First)

### Pagination Implementation
- **10 records per page** as specified
- Next/Previous navigation
- Page number selection
- Shows total records and current range
- Preserves all filters, search, and sort states
- Smooth page transitions

## Component Structure

```
src/
├── components/
│   ├── SalesManagementSystem.tsx  # Main container
│   ├── SearchBar.tsx              # Search functionality
│   ├── FilterPanel.tsx            # Multi-filter interface
│   ├── SortDropdown.tsx           # Sort options
│   └── TransactionTable.tsx       # Data display & pagination
├── hooks/
│   ├── useTransactions.ts         # Data fetching logic
│   └── useFilterOptions.ts        # Filter options fetching
├── services/
│   └── api.ts                     # API client
├── types/
│   └── index.ts                   # TypeScript interfaces
└── utils/
    └── formatters.ts              # Data formatting utilities
```

## UI Design
- Matches provided Figma design specifications
- Responsive layout (mobile, tablet, desktop)
- Clean, professional interface
- Optimized for large datasets (1M+ records)
- Smooth user experience with loading states
