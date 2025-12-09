import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS configuration for production
// Supports single URL, comma-separated URLs, or '*' for all origins
const getCorsOrigin = () => {
  if (process.env.FRONTEND_URL) {
    const origins = process.env.FRONTEND_URL.split(',').map(url => url.trim());
    return origins.length === 1 ? origins[0] : origins;
  }
  if (process.env.CORS_ORIGIN) {
    const origins = process.env.CORS_ORIGIN.split(',').map(url => url.trim());
    return origins.length === 1 ? origins[0] : origins;
  }
  return '*'; // Allow all origins in development
};

const corsOptions = {
  origin: getCorsOrigin(),
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/transactions', transactionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
