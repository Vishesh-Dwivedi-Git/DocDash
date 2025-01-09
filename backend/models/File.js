const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dashboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard' },
});

module.exports = mongoose.model('File', fileSchema);
