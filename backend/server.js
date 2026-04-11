require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("./middleware/auth");

const User = require("./models/User");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/auth", require("./routes/userRoutes"));

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

/* ================= AUTH ================= */

// SIGNUP
app.post("/api/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    ...req.body,
    password: hashed,
    progress: {}
  });

  await user.save();
  res.json({ message: "User created" });
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
});
app.put("/api/profile", async (req, res) => {
  try {
    const { name, role, skills } = req.body;

    console.log("Incoming data:", req.body); // DEBUG

    const user = await User.findOne(); // TEMP (works)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   if (skills) user.skills = skills;
if (name) user.name = name;
if (role) user.role = role;
    await user.save();

    console.log("Saved skills:", user.skills); // DEBUG

    res.json(user);

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/profile", async (req, res) => {
  try {
    const user = await User.findOne();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // IMPORTANT: must return full user including skills

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= PROGRESS ================= */

// SAVE / REMOVE PROGRESS
app.post("/api/users/progress", auth, async (req, res) => {
  try {
     console.log("USER ID:", req.userId);   // 👈 ADD THIS
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

// GET PROGRESS
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