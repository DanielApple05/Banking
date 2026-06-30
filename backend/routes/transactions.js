const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const bcrypt = require('bcryptjs'); 

// GET /api/transactions — get logged-in user's transactions
router.get("/", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (err) {
    console.error("Get transactions error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/transactions/transfer — send money
router.post("/transfer", protect, async (req, res) => {
  const { recipientAccount, bank, amount, narration, type, pin } = req.body;

  try {
    const sender = await User.findById(req.user.id);
    if (!sender) return res.status(404).json({ message: "User not found" });
    if (!recipientAccount)
      return res.status(401).json({ message: "Recipient account is required" });
    // Validate PIN
    if (!sender.pin) {
      return res
        .status(401)
        .json({ message: "Please set a transaction PIN first." });
    }

    const isPinValid = await bcrypt.compare(pin, sender.pin);
    if (!isPinValid) {
      return res.status(401).json({ message: "Incorrect PIN." });
    }

    const recipient = await User.findOne({ accountNumber: recipientAccount });
    if (!recipient)
      return res.status(404).json({ message: "Recipient account not found" });

    // Prevent self transfer
    if (sender.accountNumber === recipientAccount) {
      return res
        .status(400)
        .json({ message: "You cannot transfer to yourself" });
    }

    const transferAmount = Number(amount);

    if (sender.balance < transferAmount) {
      await Transaction.create({
        userId: sender._id,
        title: `Transfer to ${recipient.accountName}`,
        category: "Transfer",
        amount: transferAmount,
        type: "debit",
        status: "Failed",
        recipient: recipientAccount,
        bank,
        narration,
      });
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Deduct from sender, credit recipient
    sender.balance -= transferAmount;
    recipient.balance += transferAmount;
    await sender.save();
    await recipient.save();

    // Sender's debit transaction
    const transaction = await Transaction.create({
      userId: sender._id,
      title: `Transfer to ${recipient.accountName || recipient.accountNumber}`,
      category: "Transfer",
      amount: transferAmount,
      type: "debit",
      status: "Successful",
      recipient: sender.recipient,
      bank,
      narration,
    });

    // Recipient's credit transaction — this is what shows as a notification
    await Transaction.create({
      userId: recipient._id,
      title: `Transfer from ${sender.accountName}`,
      category: "Income",
      amount: transferAmount,
      type: "credit",
      status: "Successful",
      recipient: recipient.accountName || "YOU",
      bank,
      narration,
    });

    res.status(201).json({
      message: "Transfer successful",
      balance: sender.balance,
      transaction,
    });
  } catch (err) {
    console.error("Transfer error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/transactions/balance — get current balance
router.get("/balance", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "balance accountNumber accountName firstName lastName",
    );
    res.json(user);
  } catch (err) {
    console.error("Balance error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/transactions/lookup/:accountNumber
router.get("/lookup/:accountNumber", protect, async (req, res) => {
  try {
    const user = await User.findOne({
      accountNumber: req.params.accountNumber,
    }).select("accountName accountNumber");

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      accountName: user.accountName,
      accountNumber: user.accountNumber,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
