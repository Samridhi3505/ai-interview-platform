import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  questionId: String,
  difficulty: String, // easy / medium / hard
  topic: String,      // array / dp / graph etc
  date: String,       // YYYY-MM-DD
  timeTaken: Number   // in minutes
});

const userProgressSchema = new mongoose.Schema({
  userId: String,

  totalSolved: {
    type: Number,
    default: 0
  },

  timeSpent: {
    type: Number,
    default: 0
  },

  solvedProblems: [problemSchema]
});

export default mongoose.model("UserProgress", userProgressSchema);