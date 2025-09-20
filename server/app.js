const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // 3️⃣ Import & use routes AFTER DB connection
    const authRoutes = require("./routes/auth");
    app.use("/api", authRoutes);

    // Custom routes for signup/signin pages
    app.get("/signup", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/signin", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/signin.html"));
    });
    const dailyGoalRoutes = require("./routes/dailyGoals");
    app.use("/api/daily_goals", dailyGoalRoutes);

    // Start server
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
  })
  .catch(err => console.log(err));
