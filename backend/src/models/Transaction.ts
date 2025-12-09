import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  transactionId: string;
  date: Date;
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

const TransactionSchema: Schema = new Schema({
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

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
