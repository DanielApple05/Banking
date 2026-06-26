const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const adminOnly = require('../middleware/admin')

router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('Admin users error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/transactions', protect, adminOnly, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('user._id', 'username email')
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.error('Admin transactions error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/users/:id/credit', protect, adminOnly, async (req, res) => {
  const { amount } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.balance += Number(amount);
    await user.save();

    const transaction = await Transaction.create({
      userId: user._id,
      title: `Admin credit to ${user.username}`,
      category: 'Income',
      amount: Number(amount),
      type: 'credit',
      status: 'Successful',
    });

    res.json({ message: 'Credit successful', user, transaction });
  } catch (err) {
    console.error('Admin credit error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (String(user._id) === String(req.user.id)) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await Transaction.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Admin delete user error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
