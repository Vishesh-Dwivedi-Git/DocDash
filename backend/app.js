const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboard');
const fileRoutes = require('./routes/fileRoutes');
const config = require('./config/index');  // Import the configuration

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Log the start of the application
console.log('Starting server setup...');

// Connect to MongoDB
mongoose.connect(config.dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Log the base paths for each route
app.use('/api/users', (req, res, next) => {
  console.log(`Request received at /api/users ${req.url}`);
  next();
}, userRoutes);
console.log('User routes loaded.');

app.use('/api/dashboards', (req, res, next) => {
  console.log('Request received at /api/dashboards');
  next();
}, dashboardRoutes);
console.log('Dashboard routes loaded.');

app.use('/api/files', (req, res, next) => {
  console.log('Request received at /api/files');
  next();
}, fileRoutes);
console.log('File routes loaded.');

// Catch-all route for unhandled paths
app.use((req, res) => {
  console.log(`Unhandled route: ${req.method} ${req.url}`);
  res.status(404).send('Route not found');
});

// Start the server and log the port
const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
