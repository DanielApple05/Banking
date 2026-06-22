const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  balance:  { type: Number, default: 0.00 },
  accountNumber: { type: String, unique: true },
  accountName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);