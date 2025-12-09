# TruEstate - Sales Management System

## Overview
A full-stack Retail Sales Management System built for TruEstate's SDE Intern assignment. The application handles 1 million+ transaction records with advanced search, filtering, sorting, and pagination capabilities.

## Tech Stack

### Backend
- **Node.js** + **Express.js** - RESTful API
- **TypeScript** - Type safety
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM

### Frontend
- **React 18** + **TypeScript** - Component-based UI
- **Vite** - Fast build tool
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

## Search Implementation Summary
- **Case-insensitive** text search across Customer Name and Phone Number
- Uses MongoDB **regex** with text indexes for performance
- Works alongside filters and sorting without conflicts
- Triggers on Enter key or search button click

## Filter Implementation Summary
- **Multi-select filters:** Customer Region, Gender, Product Category, Tags, Payment Method
- **Range filters:** Age (Min-Max), Date Range (From-To)
- Filters work independently and in combination
- Uses MongoDB `$in` operator for arrays and `$gte`/`$lte` for ranges
- State preservation across pagination

## Sorting Implementation Summary
- Sort options: Date (Newest/Oldest), Quantity (High/Low), Customer Name (A-Z/Z-A)
- Implemented with MongoDB sort queries
- Maintains active filters and search while sorting
- Default sort: Date (Newest First)

## Pagination Implementation Summary
- **10 records per page** as specified
- Offset-based pagination with skip/limit
- Shows current page, total pages, and record count
- Next/Previous navigation with page numbers
- Preserves all filters, search, and sort states

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 1. Clone Repository
```bash
git clone https://github.com/shourya0-0/TruEstate_vault.git
cd TruEstate_vault
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development" > .env

# Seed database with CSV data
npm run seed

# Start backend server
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
```

Frontend runs on `http://localhost:3000`

### 4. MongoDB Atlas Setup
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Whitelist your IP address (or use 0.0.0.0/0 for development)
4. Create database user with password
5. Get connection string and add to backend `.env`

## Project Structure
```
TruEstate_vault/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helper functions
│   │   └── index.ts          # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API client
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Helper functions
│   │   ├── styles/           # CSS files
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md       # Detailed architecture
│
├── truestate_assignment_dataset.csv  # 1M records
└── README.md
```

## API Endpoints

### GET `/api/transactions`
Fetch transactions with filters, search, sort, and pagination.

**Query Parameters:**
- `search` - Search by name or phone
- `customerRegion` - Filter by region (comma-separated)
- `gender` - Filter by gender (comma-separated)
- `ageMin`, `ageMax` - Age range
- `productCategory` - Filter by category (comma-separated)
- `tags` - Filter by tags (comma-separated)
- `paymentMethod` - Filter by payment method (comma-separated)
- `dateFrom`, `dateTo` - Date range
- `sortBy` - Sort option
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 10)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 100000,
    "totalRecords": 1000000,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### GET `/api/transactions/filters`
Get available filter options.

**Response:**
```json
{
  "customerRegion": ["North", "South", "East", "West", "Central"],
  "gender": ["Male", "Female"],
  "productCategory": ["Electronics", "Clothing", "Beauty"],
  "tags": ["wireless", "cotton", "organic", ...],
  "paymentMethod": ["UPI", "Credit Card", "Cash", ...],
  "dateRange": {
    "minDate": "2021-01-01",
    "maxDate": "2023-12-31"
  }
}
```

## Features Implemented

### ✅ Search
- Full-text search across Customer Name and Phone Number
- Case-insensitive matching
- Real-time results

### ✅ Filters
- Multi-select: Region, Gender, Category, Tags, Payment Method
- Range: Age, Date
- Combination support

### ✅ Sorting
- Date (Newest/Oldest)
- Quantity (High/Low)
- Customer Name (A-Z/Z-A)

### ✅ Pagination
- 10 items per page
- Next/Previous navigation
- State preservation

### ✅ UI/UX
- Responsive design
- Loading states
- Error handling
- Empty states
- Statistics cards

## Deployment

### Backend (Railway)
```bash
# Connect to Railway
railway login
railway init
railway add

# Set environment variables in Railway dashboard
# Deploy
git push railway main
```

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
```

## Live URLs
- **Frontend:** [https://truestate-frontend.vercel.app](https://truestate-frontend.vercel.app)
- **Backend API:** [https://truestate-backend.railway.app](https://truestate-backend.railway.app)

## Developer
**Shourya Gupta**
- GitHub: [@shourya0-0](https://github.com/shourya0-0)
- Repository: [TruEstate_vault](https://github.com/shourya0-0/TruEstate_vault)

## License
This project was created for TruEstate's SDE Intern assignment.
