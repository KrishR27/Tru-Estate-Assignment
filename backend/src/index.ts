import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// ============================================
// 1. CORS MIDDLEWARE - MUST BE FIRST
// ============================================
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ============================================
// 2. DEBUG MIDDLEWARE - Log all incoming requests
// ============================================
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Incoming:', req.method, req.url);
  next();
});

// ============================================
// 3. BODY PARSING MIDDLEWARE
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// 4. MONGODB CONNECTION - Non-blocking
// ============================================
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    // Don't exit - allow server to start even if DB fails
    // Routes will handle DB errors gracefully
  }
};

connectDB();

// ============================================
// 5. ROUTES - Must be after CORS middleware
// ============================================
// Health check (no DB required)
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/transactions', transactionRoutes);

// ============================================
// 6. GLOBAL ERROR HANDLER - With CORS headers
// ============================================
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global Error Handler:', err);
  
  // Apply CORS headers even in error responses
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  res.status(500).json({ 
    error: 'Server error', 
    details: err.message,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// 7. 404 HANDLER - For undefined routes
// ============================================
app.use((req: Request, res: Response) => {
  // Apply CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  res.status(404).json({ 
    error: 'Route not found',
    path: req.url,
    method: req.method
  });
});

// ============================================
// 8. START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/transactions`);
});

export default app;
