const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dashboards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard' }],
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Return here to avoid unnecessary hashing
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
  } catch (error) {
    next(error); // Pass errors to the next middleware or error handler
  }
});

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    if (typeof enteredPassword !== 'string' || typeof this.password !== 'string') {
      throw new Error('Invalid password data type');
    }
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error; 
  }
};

module.exports = mongoose.model('User', userSchema);