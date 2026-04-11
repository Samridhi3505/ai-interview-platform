const express = require("express");
const router = express.Router();
const UserProgress = require("../models/UserProgress");
const auth = require("../middleware/auth");


// ✅ SAVE PROGRESS
router.post("/", auth, async (req, res) => {
  try {
     console.log("🔥 ROUTE HIT");  
    const userId = req.userId;
    if (!userId) {
  return res.status(401).json({ message: "No userId (auth failed)" });
}
    const { topic, question } = req.body;

    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      userProgress = new UserProgress({ userId, progress: new Map() });
    }

    // create topic if not exists
    if (!userProgress.progress || !userProgress.progress.get(topic)) {
      userProgress.progress.set(topic, { questions: [] });
    }

    const topicData = userProgress.progress.get(topic);

    // prevent duplicate
    if (!topicData.questions.includes(question)) {
      topicData.questions.push(question);
    }

    userProgress.progress.set(topic, topicData);

    await userProgress.save();

    res.json(Object.fromEntries(userProgress.progress));

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving progress" });
  }
});


// ✅ GET PROGRESS
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.userId;

    const data = await UserProgress.findOne({ userId });
    res.json(data && data.progress ? Object.fromEntries(data.progress) : {});

  } catch (err) {
    res.status(500).json({ message: "Error fetching progress" });
  }
});

module.exports = router;