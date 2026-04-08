const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const codeRoutes = require("./routes/codeRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use("/api/code", codeRoutes);

/* ================= CONFIG ================= */
const SECRET = process.env.JWT_SECRET || "secret123";

/* ================= DATABASE ================= */
mongoose.connect("mongodb://127.0.0.1:27017/ai-platform")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

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

/* ================= AUTH MIDDLEWARE ================= */
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

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
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

/* ================= PROFILE ================= */

// GET PROFILE
app.get("/api/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch {
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
  } catch {
    res.status(500).json({ message: "Error updating profile" });
  }
});

/* ================= PASSWORD ================= */

app.post("/api/change-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);

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

  } catch {
    res.status(500).json({ message: "Error updating password" });
  }
});

/* ================= SOLVE QUESTION ================= */

app.post("/api/solve", auth, async (req, res) => {
  try {
    const { questionId, topic } = req.body;

    const user = await User.findById(req.userId);

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

  } catch {
    res.status(500).json({ message: "Error saving progress" });
  }
});

/* ================= DASHBOARD ================= */

app.get("/api/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.json({
      totalSolved: user.totalSolved,
      solvedQuestions: user.solvedQuestions,
      topics: user.topics,
      streak: user.streak,
      avgScore: user.avgScore
    });

  } catch {
    res.status(500).json({ message: "Dashboard error" });
  }
});

/* ================= SERVE FRONTEND ================= */

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});