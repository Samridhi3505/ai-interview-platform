const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "secret123";


// 🔐 MIDDLEWARE (better token handling)
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};


// =======================
// ✅ SIGNUP
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed
    });

    await user.save();

    res.json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// =======================
// ✅ LOGIN (IMPORTANT UPDATE)
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, SECRET);

    // 🔥 RETURN USER DATA ALSO
    res.json({
      token,
      user
    });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


// =======================
// ✅ GET PROFILE
// =======================
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch {
    res.status(500).json({ message: "Error fetching profile" });
  }
});


// =======================
// ✅ UPDATE PROFILE
// =======================
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, role, image, skills } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, role, image, skills },
      { new: true }
    );

    res.json(updatedUser);

  } catch {
    res.status(500).json({ message: "Error updating profile" });
  }
});


// =======================
// 🔐 CHANGE PASSWORD (FIXED)
// =======================
router.post("/change-password", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;