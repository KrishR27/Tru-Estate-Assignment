# TruEstate Backend API

## Overview
RESTful API for TruEstate Sales Management System built with Node.js, Express, TypeScript, and MongoDB.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Tools:** csv-parser for data seeding

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```

### 3. Seed Database
Import the CSV data into MongoDB:
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
npm start
```

## API Endpoints

### GET /api/transactions
Fetch transactions with filters, search, sort, and pagination.

**Query Parameters:**
- `search` - Search by customer name or phone number
- `customerRegion` - Filter by region (comma-separated)
- `gender` - Filter by gender (comma-separated)
- `ageMin`, `ageMax` - Age range filter
- `productCategory` - Filter by category (comma-separated)
- `tags` - Filter by tags (comma-separated)
- `paymentMethod` - Filter by payment method (comma-separated)
- `dateFrom`, `dateTo` - Date range filter
- `sortBy` - Sort option (date-newest, date-oldest, quantity-high, quantity-low, name-asc, name-desc)
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 10)

### GET /api/transactions/filters
Get available filter options (regions, genders, categories, tags, payment methods, date range).

## Search Implementation
Case-insensitive regex search across `customerName` and `phoneNumber` fields using MongoDB text index.

## Filter Implementation
Multi-select filters using MongoDB `$in` operator with comma-separated values. Range filters for age and date.

## Sorting Implementation
Dynamic sort query builder supporting date, quantity, and customer name sorting in ascending/descending order.

## Pagination Implementation
Offset-based pagination with metadata including total pages, current page, and navigation flags.
