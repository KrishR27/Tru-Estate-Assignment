"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const TransactionSchema = new mongoose_1.Schema({
    transactionId: { type: String, required: true },
    date: { type: Date, required: true },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    customerRegion: { type: String, required: true },
    customerType: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    productCategory: { type: String, required: true },
    tags: { type: [String], required: true },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    finalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    orderStatus: { type: String, required: true },
    deliveryType: { type: String, required: true },
    storeId: { type: String, required: true },
    storeLocation: { type: String, required: true },
    salespersonId: { type: String, required: true },
    employeeName: { type: String, required: true }
}, {
    timestamps: true
});
// Create only essential indexes for search and filtering
TransactionSchema.index({ customerName: 1, phoneNumber: 1 }); // For search
TransactionSchema.index({ date: -1 }); // For sorting by date
exports.default = mongoose_1.default.model('Transaction', TransactionSchema);
