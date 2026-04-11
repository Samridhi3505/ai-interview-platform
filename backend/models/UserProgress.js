const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  progress: {
    type: Object, // topic-wise progress
    default: {},
  },
});

module.exports = mongoose.model("UserProgress", progressSchema);