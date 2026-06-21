const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:     { type: String, required: true },
  category:  { type: String, enum: ['Income', 'Transfer', 'Expense'], required: true },
  amount:    { type: Number, required: true },
  type:      { type: String, enum: ['credit', 'debit'], required: true },
  status:    { type: String, enum: ['Successful', 'Failed'], default: 'Successful' },
  recipient: { type: String },
  bank:      { type: String },
  narration: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);