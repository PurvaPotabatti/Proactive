const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// Add routes to serve the sign-in and sign-up pages
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signin.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

// Add routes for the pages from your sidebar
app.get('/daily_goals.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/daily_goals.html'));
});

app.get('/course_modules.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/course_modules.html'));
});

app.get('/milestones.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/milestones.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Routes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
