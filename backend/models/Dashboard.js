const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
