require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ FIX 1: ADD THIS (was missing)
const auth = require("./middleware/auth");

const User = require("./models/User");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

  app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.get("/check", (req, res) => {
  res.send("CHECK ROUTE WORKING ✅");
});

/* ================= AUTH ================= */

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const name = req.body.name;
const email = req.body.email.toLowerCase().trim();
const password = req.body.password;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email ❌"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      progress: {},
    });

    await user.save();

    res.json({ message: "User created ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup error" });
  }
});

// LOGIN
// ✅ FIX 2: strict login (prevents duplicate user bug)
app.post("/api/login", async (req, res) => {
  const email = req.body.email.toLowerCase().trim();

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
});
  

// UPDATE PROFILE
app.put("/api/profile", auth, async (req, res) => {
  try {
    const { name, role, skills } = req.body;

    console.log("UserId:", req.userId);

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (skills) user.skills = skills;
    if (name) user.name = name;
    if (role) user.role = role;

    await user.save();

    res.json(user);

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET PROFILE
app.get("/api/profile", auth, async (req, res) => {
  try {
    console.log("UserId:", req.userId);

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= PROGRESS ================= */

app.post("/api/users/progress", auth, async (req, res) => {
  try {
    console.log("USER ID:", req.userId);
    console.log("BODY:", req.body);

    const { topic, question, isChecked } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.progress) user.progress = {};
    if (!user.progress[topic]) user.progress[topic] = [];

    if (isChecked) {
      if (!user.progress[topic].includes(question)) {
        user.progress[topic].push(question);
      }
    } else {
      user.progress[topic] = user.progress[topic].filter(
        (q) => q !== question
      );
    }

    user.markModified("progress");
    await user.save();

    res.json(user.progress);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving progress" });
  }
});

app.get("/api/users/progress", auth, async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    console.log("User not found in DB");
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user.progress || {});
});

/* ================= START ================= */

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
