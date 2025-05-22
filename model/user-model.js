import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  balance: {
    type: Number,
    default: 10,
  },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
