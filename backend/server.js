require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const codeRoutes = require("./routes/codeRoutes");
const progressRoutes = require("./routes/progress");
const auth = require("./middleware/auth");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api/code", codeRoutes);

// ✅ FIX: do NOT add auth here (already inside progress.js)
app.use("/api/progress", progressRoutes);

/* ================= CONFIG ================= */
const SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", process.env.JWT_SECRET);

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error ❌", err));

/* ================= USER MODEL ================= */
const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
  image: { type: String, default: "" },
  skills: { type: [String], default: [] },

  solvedQuestions: [
    {
      questionId: String,
      topic: String
    }
  ],

  totalSolved: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  avgScore: { type: Number, default: 0 },
  topics: { type: Object, default: {} }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

/* ================= AUTH ROUTES ================= */

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed
    });

    await user.save();

    res.json({ message: "User created ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup error" });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    // ✅ FIXED (proper return)
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // ✅ FIXED (proper return)
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error" });
  }
});

/* ================= PROFILE ================= */

// GET PROFILE
app.get("/api/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// UPDATE PROFILE
app.put("/api/profile", auth, async (req, res) => {
  try {
    const { name, role, image, skills } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, role, image, skills },
      { new: true }
    );

    res.json(updatedUser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
});

/* ================= PASSWORD ================= */

app.post("/api/change-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating password" });
  }
});

/* ================= SOLVE QUESTION ================= */

app.post("/api/solve", auth, async (req, res) => {
  try {
    const { questionId, topic } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.topics) user.topics = {};
    if (!user.solvedQuestions) user.solvedQuestions = [];

    const alreadySolved = user.solvedQuestions.find(
      (q) => q.questionId === questionId
    );

    if (!alreadySolved) {
      user.solvedQuestions.push({ questionId, topic });
      user.totalSolved += 1;

      user.topics[topic] = (user.topics[topic] || 0) + 1;
      user.streak += 1;

      await user.save();
    }

    res.json({ message: "Saved ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving progress" });
  }
});

/* ================= DASHBOARD ================= */

app.get("/api/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      totalSolved: user.totalSolved,
      solvedQuestions: user.solvedQuestions,
      topics: user.topics,
      streak: user.streak,
      avgScore: user.avgScore
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard error" });
  }
});

/* ================= SERVE FRONTEND ================= */

const buildPath = path.join(__dirname, "build");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});