const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    accountName: { type: String, required: true, trim: true }, // ← add this
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 4250.0 },
    accountNumber: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
    pin: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
