const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/admin');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// GET /api/admin/users — get all users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/transactions — get all transactions
router.get('/transactions', protect, adminOnly, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'username accountName accountNumber')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/admin/users/:id/credit — credit a user's balance
router.patch('/users/:id/credit', protect, adminOnly, async (req, res) => {
  const { amount } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.balance += Number(amount);
    await user.save();

    await Transaction.create({
      userId: user._id,
      title: 'Admin Credit',
      category: 'Income',
      amount,
      type: 'credit',
      status: 'Successful',
    });

    res.json({ message: 'Balance credited', balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/users/:id — delete a user
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Transaction.deleteMany({ userId: req.params.id });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
