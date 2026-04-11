const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");
const auth = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// SIGNUP
router.post("/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    ...req.body,
    password: hashed
  });

  await user.save();
  res.json({ message: "User created" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  res.json({ token, user });
});

// PROFILE
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// UPDATE PROFILE
router.put("/profile", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
  res.json(user);
});

// IMAGE UPLOAD
router.post("/upload-image", auth, upload.single("image"), async (req, res) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder: "profiles" },
    async (error, result) => {
      const user = await User.findByIdAndUpdate(
        req.userId,
        { image: result.secure_url },
        { new: true }
      );

      res.json(user);
    }
  );

  stream.end(req.file.buffer);
});
// UPDATE PROGRESS
router.post("/", async (req, res) => {
  try {
    const userId = req.userId; // ✅ FIXED
    const { topic, value } = req.body;

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
    const userId = req.userId; // ✅ FIXED

    const progress = await UserProgress.findOne({ userId });

    res.json(progress?.progress || {});

  } catch (err) {
    res.status(500).json({ message: "Error fetching progress" });
  }
});

module.exports = router;