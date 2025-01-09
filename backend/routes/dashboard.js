const express = require('express');
const Dashboard = require('../models/Dashboard');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create Dashboard
router.post('/', protect, async (req, res) => {
  const { name } = req.body;
  const dashboard = new Dashboard({ name, user: req.user._id });
  await dashboard.save();

  res.status(201).json(dashboard);
});

// Get User Dashboards
router.get('/', protect, async (req, res) => {
  const dashboards = await Dashboard.find({ user: req.user._id }).populate('files');
  res.status(200).json(dashboards);
});

module.exports = router;
