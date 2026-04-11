const express = require("express");
const router = express.Router();
const UserProgress = require("../models/UserProgress");

// UPDATE PROGRESS
router.post("/", async (req, res) => {
  try {
    const { userId, topic, value } = req.body;

    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      userProgress = new UserProgress({ userId, progress: {} });
    }

    userProgress.progress[topic] = value;

    await userProgress.save();

    res.json(userProgress);

  } catch (err) {
    res.status(500).json({ message: "Error saving progress" });
  }
});

// GET PROGRESS
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;

    const progress = await UserProgress.findOne({ userId });

    res.json(progress?.progress || {});

  } catch (err) {
    res.status(500).json({ message: "Error fetching progress" });
  }
});