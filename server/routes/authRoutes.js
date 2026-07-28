const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password123') {
    const token = jwt.sign(
      { username: 'admin', role: 'admin' },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token: token
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;