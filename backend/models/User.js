const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,

  skills: {
    type: [String],
    default: []
  },

  progress: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model("User", userSchema);