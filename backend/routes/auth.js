const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/auth')

// Generate a random account number
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validate required fields exist
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create user
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      accountNumber: generateAccountNumber(),
      accountName: `${firstName.trim()} ${lastName.trim()}`.trim(), 
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        balance: user.balance,
        accountNumber: user.accountNumber,
        accountName: user.accountName,
        isAdmin: user.isAdmin,
        bank: "SecureBank",
        pin: "",
      },
    });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        balance: user.balance,
        accountNumber: user.accountNumber,
        accountName: user.accountName,
        isAdmin: user.isAdmin,
        bank: "SecureBank",
      },
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

router.post('/set-pin', protect, async (req, res) => {
  try {
    const { pin } = req.body;

    // Validate input
    if (!pin) {
      return res.status(400).json({
        message: 'PIN is required'
      });
    }

    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).json({
        message: 'PIN must be exactly 4 digits'
      });
    }

    // Find current user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Prevent overwriting existing pin
    if (user.pin) {
      return res.status(400).json({
        message: 'PIN already exists. Use reset PIN instead.'
      });
    }

    // Hash pin
    const hashedPin = await bcrypt.hash(pin, 10);

    user.pin = hashedPin;

    await user.save();

    return res.status(200).json({
      message: 'PIN set successfully'
    });

  } catch (error) {
    console.error('SET PIN ERROR:', error);

    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;