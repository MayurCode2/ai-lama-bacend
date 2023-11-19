

// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const configRoutes = require('./routes/configRoutes');
const cors = require('cors')

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// MongoDB Connection
try {
  mongoose.connect(process.env.MONGODB_URI, {
  });

  console.log('Connected to MongoDB');
} catch (error) {
  console.error('MongoDB Connection Error:', error.message);
}


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Routes
app.use('/user', userRoutes);

// Project Routes
app.use('/project', projectRoutes);

// Config Routes
app.use('/config', configRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
