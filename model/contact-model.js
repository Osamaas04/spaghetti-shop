import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  feedback: {
    required: true,
    type: String,
  },
});

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
