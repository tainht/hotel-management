import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  room: mongoose.Types.ObjectId;
  guest: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  totalNights: number;
  pricePerNight: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  specialRequests?: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(\n  {\n    room: {\n      type: Schema.Types.ObjectId,\n      ref: 'Room',\n      required: [true, 'Room is required'],\n    },\n    guest: {\n      type: Schema.Types.ObjectId,\n      ref: 'User',\n      required: [true, 'Guest is required'],\n    },\n    property: {\n      type: Schema.Types.ObjectId,\n      ref: 'Property',\n      required: [true, 'Property is required'],\n    },\n    checkInDate: {\n      type: Date,\n      required: [true, 'Check-in date is required'],\n    },\n    checkOutDate: {\n      type: Date,\n      required: [true, 'Check-out date is required'],\n    },\n    totalNights: {\n      type: Number,\n      required: true,\n      min: 1,\n    },\n    pricePerNight: {\n      type: Number,\n      required: true,\n      min: 0,\n    },\n    totalPrice: {\n      type: Number,\n      required: true,\n      min: 0,\n    },\n    status: {\n      type: String,\n      enum: {\n        values: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'],\n        message: 'Invalid booking status',\n      },\n      default: 'pending',\n    },\n    specialRequests: String,\n    paymentStatus: {\n      type: String,\n      enum: {\n        values: ['unpaid', 'partial', 'paid'],\n        message: 'Invalid payment status',\n      },\n      default: 'unpaid',\n    },\n    notes: String,\n  },\n  { timestamps: true }\n);\n\n// Index for better query performance\nBookingSchema.index({ room: 1 });\nBookingSchema.index({ guest: 1 });\nBookingSchema.index({ property: 1 });\nBookingSchema.index({ status: 1 });\nBookingSchema.index({ checkInDate: 1, checkOutDate: 1 });\n\nexport default mongoose.model<IBooking>('Booking', BookingSchema);
