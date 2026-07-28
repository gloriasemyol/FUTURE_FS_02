const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

// Protected route to fetch leads
router.get('/', protect, (req, res) => {
  res.status(200).json({
    message: 'Leads fetched successfully',
    leads: [
      { id: 1, name: 'John Doe', status: 'New', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', status: 'Contacted', email: 'jane@example.com' }
    ]
  });
});

module.exports = router;