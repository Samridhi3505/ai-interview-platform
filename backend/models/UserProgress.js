const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  progress: {
    type: Map,
    of: {
      questions: [String]
    },
    default: {},
  },
});

module.exports = mongoose.model("UserProgress", userProgressSchema);