const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
  image: String,
  skills: [String]
});

module.exports = mongoose.model("User", userSchema);