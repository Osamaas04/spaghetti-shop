import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
  total: {
    required: true,
    type: Number,
  },
});

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
