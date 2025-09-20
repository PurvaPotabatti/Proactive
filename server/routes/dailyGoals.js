const express = require("express");
const router = express.Router();
const DailyGoal = require("../models/DailyGoal");

// Get all daily goals for a user
router.get("/:userId", async (req, res) => {
  try {
    const goals = await DailyGoal.find({ user: req.params.userId });
    res.json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new daily goal
router.post("/", async (req, res) => {
  try {
    const { user, title } = req.body;
    const goal = new DailyGoal({ user, title });
    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update completion status
router.put("/:id", async (req, res) => {
  try {
    const goal = await DailyGoal.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a goal
router.delete("/:id", async (req, res) => {
  try {
    await DailyGoal.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
