const codeRoutes = require("./routes/codeRoutes");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/code", codeRoutes);


/* ================= CONFIG ================= */
const SECRET = "secret123";

/* ================= DATABASE ================= */
mongoose.connect("mongodb://127.0.0.1:27017/ai-platform")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

/* ================= USER MODEL ================= */
const userSchema = new mongoose.Schema({
  username: String,
  solvedQuestions:[
  {
    questionId: String,
    topic: String
  }
],
  name: { type: String, default: "" },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
  image: { type: String, default: "" },
  skills: { type: [String], default: [] }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

/* ================= AUTH MIDDLEWARE ================= */
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

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

    // 🔥 check missing fields
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

    res.json({
      token,
      user
    });

  } catch (err) {
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
    res.status(500).json({ message: "Error updating profile" });
  }
});

/* ================= PASSWORD ================= */

app.post("/api/change-password", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();

    res.json({ message: "Password updated ✅" });

  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
});

/* ================= INTERVIEW API ================= */

app.post("/api/interview", async (req, res) => {
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ feedback: "No answer provided" });
  }

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi",
        prompt: `Give score + feedback for answer:\n${answer}`,
        stream: false,
      },
      { timeout: 10000 }
    );

    res.json({ feedback: response.data.response });

  } catch {
    res.status(500).json({ feedback: "AI not responding" });
  }
});

/* ================= EXPLAIN ================= */

app.post("/api/explain", async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ explanation: "No topic provided" });
  }

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi",
        prompt: `Explain ${topic} simply`,
        stream: false,
      }
    );

    res.json({ explanation: response.data.response });

  } catch {
    res.status(500).json({ explanation: "AI error" });
  }
});

/* ================= START SERVER ================= */

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🚀");
});
// GET QUESTIONS
/* ================= QUESTIONS ================= */

// FIXED route
app.get("/api/questions", async (req, res) => {
  try {
    const { type, topic } = req.query;

    const questions = await Question.find({ type, topic });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});


/* ================= SOLVE QUESTION ================= */

// Save solved question (AUTH BASED 🔥)
app.post("/api/solve", auth, async (req, res) => {
  try {
    const { questionId, topic } = req.body;

    const user = await User.findById(req.userId);

    // store BOTH id + topic
    const alreadySolved = user.solvedQuestions.find(
      (q) => q.questionId === questionId
    );

    if (!alreadySolved) {
      user.solvedQuestions.push({ questionId, topic });
      await user.save();
    }

    res.json({ message: "Saved ✅" });

  } catch (err) {
    res.status(500).json({ message: "Error saving progress" });
  }
});


/* ================= DASHBOARD ================= */

// 🔥 FULL DYNAMIC DASHBOARD
app.get("/api/dashboard", auth, async (req, res) => {
  const user = await User.findById(req.userId);

  const totalSolved = user.solvedQuestions.length;

  const topics = {};

  user.solvedQuestions.forEach((q) => {
    if (!topics[q.topic]) {
      topics[q.topic] = 0;
    }
    topics[q.topic]++;
  });

  res.json({
    totalSolved,
    solvedQuestions: user.solvedQuestions,
    topics
  });
});
app.get("/api/dashboard", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    app.post("/api/solve", verifyToken, async (req, res) => {
  try {
    const { questionId, topic } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Initialize if not exists
    if (!user.topics) user.topics = {};
    if (!user.solvedQuestions) user.solvedQuestions = [];

    // ✅ Update topic progress
    user.topics[topic] = (user.topics[topic] || 0) + 1;

    // ✅ Avoid duplicate questions
    if (!user.solvedQuestions.includes(questionId)) {
      user.solvedQuestions.push(questionId);
      user.totalSolved = (user.totalSolved || 0) + 1;
    }

    // ✅ Update streak (simple logic)
    user.streak = (user.streak || 0) + 1;

    // ✅ Optional: avg score (dummy logic)
    user.avgScore = 80;

    await user.save();

    res.json({
      message: "Progress updated",
      topics: user.topics,
      totalSolved: user.totalSolved,
      solvedQuestions: user.solvedQuestions,
      streak: user.streak,
      avgScore: user.avgScore
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});