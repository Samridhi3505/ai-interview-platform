const express = require("express");
const router = express.Router();
const UserProgress = require("../models/UserProgress");
const auth = require("../middleware/auth"); // ✅ ADD THIS



// ================= GET PROGRESS =================
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.userId;

    const progress = await UserProgress.findOne({ userId });

    res.json(progress ? Object.fromEntries(progress.progress) : {});

  } catch (err) {
    res.status(500).json({ message: "Error fetching progress" });
  }
});
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // or req.body.userId

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(Object.fromEntries(userProgress.progress));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/profile", async (req, res) => {
  try {
    const { name, role, skills } = req.body;

    const user = await User.findOne(); // TEMP (works for now)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ update fields
    user.name = name;
    user.role = role;
    user.skills = skills;

    await user.save();

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;