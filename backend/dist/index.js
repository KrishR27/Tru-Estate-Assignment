"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully');
    }
    catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};
connectDB();
// Routes
app.use('/api/transactions', transactionRoutes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
exports.default = app;
