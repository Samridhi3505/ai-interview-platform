const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");
const auth = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// ================== AUTH ==================

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashed,
      progress: {} // ✅ initialize progress
    });

    await user.save();
    res.json({ message: "User created" });

  } catch (err) {
    res.status(500).json({ message: "Signup error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET);

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});


// ================== PROFILE ==================

// GET PROFILE
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// UPDATE PROFILE
router.put("/profile", auth, async (req, res) => {
  try {
    const { skills } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { skills },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});


// IMAGE UPLOAD
router.post("/upload-image", auth, upload.single("image"), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profiles" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Upload failed" });
        }

        const user = await User.findByIdAndUpdate(
          req.userId,
          { image: result.secure_url },
          { new: true }
        );

        res.json(user);
      }
    );

    stream.end(req.file.buffer);

  } catch (err) {
    res.status(500).json({ message: "Error uploading image" });
  }
});


// ================== PROGRESS ==================

// SAVE / UPDATE PROGRESS
router.post("/progress", auth, async (req, res) => {
  try {
    const { topic, question, isChecked } = req.body;

    console.log("BODY:", req.body); // DEBUG
    console.log("USER:", req.userId);

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.progress) user.progress = {};

    if (!user.progress[topic]) user.progress[topic] = [];

    if (isChecked) {
      // ADD
      if (!user.progress[topic].includes(question)) {
        user.progress[topic].push(question);
      }
    } else {
      // REMOVE
      user.progress[topic] = user.progress[topic].filter(
        (q) => q !== question
      );
    }

    user.markModified("progress"); // ✅ IMPORTANT

    await user.save();

    console.log("UPDATED:", user.progress);

    res.json(user.progress);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Error saving progress" });
  }
});


// GET PROGRESS
router.get("/progress", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.progress || {});
  } catch (err) {
    res.status(500).json({ message: "Error fetching progress" });
  }
});


module.exports = router;