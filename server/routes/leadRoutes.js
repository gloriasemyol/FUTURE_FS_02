const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const protect = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, source } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const newLead = new Lead({ name, email, phone, source });
    await newLead.save();

    res.status(201).json({ message: 'Lead submitted successfully!', lead: newLead });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/stats', protect, async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const newCount = await Lead.countDocuments({ status: 'new' });
    const contacted = await Lead.countDocuments({ status: 'contacted' });
    const converted = await Lead.countDocuments({ status: 'converted' });

    res.status(200).json({ total, new: newCount, contacted, converted });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'converted'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found.' });
    }

    res.status(200).json({ message: 'Status updated', lead });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/:id/notes', protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Note text is required.' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found.' });
    }

    lead.notes.push({ text, date: new Date() });
    await lead.save();

    res.status(200).json({ message: 'Note added', lead });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;