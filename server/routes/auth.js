const express = require("express");
const router = express.Router();
const User = require("../models/User"); // your User schema
const bcrypt = require("bcrypt");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Respond with user info so frontend can store in localStorage
    res.json({
      _id: user._id,          // frontend stores as userId
      username: user.username, // frontend stores as userName
      message: "User registered successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    // Send response readable by frontend
    res.json({
      _id: user._id,           // frontend stores as userId
      username: user.username, // frontend stores as userName
      message: "Login successful"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
