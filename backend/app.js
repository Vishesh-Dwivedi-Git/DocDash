const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboard');
const fileRoutes = require('./routes/fileRoutes');
const config = require('./config');  // Import the configuration

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/dashboards', dashboardRoutes);
app.use('/api/files', fileRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
