// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Secret key for JWT (keep it safe in real projects)
const SECRET_KEY = "mysecurebankkey";

// Hardcoded user for demo
const user = {
  username: "vaidehi",
  password: "password123",
};

// Initial account balance
let accountBalance = 5000;

// -----------------------------
// Middleware to verify JWT token
// -----------------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = decoded; // store user info from token
    next();
  });
}

// -----------------------------
// LOGIN ROUTE - Generate Token
// -----------------------------
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    // Generate token valid for 1 hour
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: "Login successful!", token });
  } else {
    res.status(401).json({ message: "Invalid username or password." });
  }
});

// -----------------------------
// PROTECTED ROUTES
// -----------------------------

// View Balance
app.get('/balance', authenticateToken, (req, res) => {
  res.json({ balance: accountBalance });
});

// Deposit Money
app.post('/deposit', authenticateToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid deposit amount." });
  }

  accountBalance += amount;
  res.json({
    message: `₹${amount} deposited successfully.`,
    newBalance: accountBalance,
  });
});

// Withdraw Money
app.post('/withdraw', authenticateToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid withdrawal amount." });
  }

  if (amount > accountBalance) {
    return res.status(400).json({ message: "Insufficient balance." });
  }

  accountBalance -= amount;
  res.json({
    message: `₹${amount} withdrawn successfully.`,
    newBalance: accountBalance,
  });
});

// -----------------------------
// START SERVER
// -----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Secure Banking API running on http://localhost:${PORT}`);
});
