const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String },
  image: String,
  skills: [String],
  progress: {
    arrays: { type: Number, default: 0 },
    binarySearch: { type: Number, default: 0 },
    trees: { type: Number, default: 0 },
    graphs: { type: Number, default: 0 },
    linkedList: { type: Number, default: 0 },
    dp: { type: Number, default: 0 },
    strings: { type: Number, default: 0 },
    hashing: { type: Number, default: 0 },
    stacksQueues: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model("User", userSchema);