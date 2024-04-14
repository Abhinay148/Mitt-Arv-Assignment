// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const notesRoutes = require('./Routes/notes');

// Create Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/user')
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Start server
app.listen(port, () => {
  console.log("Server is listening on port", port);
});
