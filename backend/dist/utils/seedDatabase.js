"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        // Clear existing data
        await Transaction_1.default.deleteMany({});
        console.log('🗑️  Cleared existing transactions');
        const csvPath = path_1.default.join(__dirname, '../../../truestate_assignment_dataset.csv');
        const BATCH_SIZE = 10000;
        let transactions = [];
        let totalInserted = 0;
        // Create readable stream
        const stream = fs_1.default.createReadStream(csvPath).pipe((0, csv_parser_1.default)());
        // Use async iteration to properly handle backpressure
        for await (const row of stream) {
            // Parse tags (comma-separated in CSV)
            const tags = row.Tags ? row.Tags.split(',').map((tag) => tag.trim()) : [];
            transactions.push({
                transactionId: row['Transaction ID'],
                date: new Date(row.Date),
                customerId: row['Customer ID'],
                customerName: row['Customer Name'],
                phoneNumber: row['Phone Number'],
                gender: row.Gender,
                age: parseInt(row.Age),
                customerRegion: row['Customer Region'],
                customerType: row['Customer Type'],
                productId: row['Product ID'],
                productName: row['Product Name'],
                brand: row.Brand,
                productCategory: row['Product Category'],
                tags: tags,
                quantity: parseInt(row.Quantity),
                pricePerUnit: parseFloat(row['Price per Unit']),
                discountPercentage: parseFloat(row['Discount Percentage']),
                totalAmount: parseFloat(row['Total Amount']),
                finalAmount: parseFloat(row['Final Amount']),
                paymentMethod: row['Payment Method'],
                orderStatus: row['Order Status'],
                deliveryType: row['Delivery Type'],
                storeId: row['Store ID'],
                storeLocation: row['Store Location'],
                salespersonId: row['Salesperson ID'],
                employeeName: row['Employee Name']
            });
            // Insert when batch is full
            if (transactions.length >= BATCH_SIZE) {
                await Transaction_1.default.insertMany(transactions, { ordered: false });
                totalInserted += transactions.length;
                console.log(`✅ Progress: ${totalInserted.toLocaleString()} records inserted`);
                transactions = []; // Clear the array
            }
        }
        // Insert remaining records
        if (transactions.length > 0) {
            await Transaction_1.default.insertMany(transactions, { ordered: false });
            totalInserted += transactions.length;
            console.log(`✅ Final batch: ${transactions.length.toLocaleString()} records inserted`);
        }
        const total = await Transaction_1.default.countDocuments();
        console.log(`\n🎉 Database seeding completed!`);
        console.log(`📊 Total records in database: ${total.toLocaleString()}`);
        await mongoose_1.default.connection.close();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding error:', error);
        await mongoose_1.default.connection.close();
        process.exit(1);
    }
};
seedDatabase();
