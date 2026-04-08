import express from "express";
import UserProgress from "../models/UserProgress.js";

const router = express.Router();

/* =========================
   ✅ SAVE SOLVED PROBLEM
========================= */

router.post("/solve", async (req, res) => {
  try {
    const { userId, questionId, difficulty, topic, timeTaken } = req.body;

    // find user
    let user = await UserProgress.findOne({ userId });

    // if user not exist → create
    if (!user) {
      user = new UserProgress({
        userId,
        solvedProblems: []
      });
    }

    // prevent duplicate submissions (optional but important)
    const alreadySolved = user.solvedProblems.find(
      (p) => p.questionId === questionId
    );

    if (alreadySolved) {
      return res.json({ message: "Already solved" });
    }

    // new solved problem
    const newProblem = {
      questionId,
      difficulty,
      topic,
      timeTaken,
      date: new Date().toISOString().slice(0, 10)
    };

    // update data
    user.solvedProblems.push(newProblem);
    user.totalSolved += 1;
    user.timeSpent += timeTaken;

    await user.save();

    res.json({ message: "Progress saved ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
/* =========================
   📊 GET USER REPORT
========================= */

router.get("/report/:userId", async (req, res) => {
  try {
    const user = await UserProgress.findOne({
      userId: req.params.userId
    });

    if (!user) {
      return res.json({
        totalSolved: 0,
        timeSpent: 0,
        weeklyData: [],
        difficulty: { easy: 0, medium: 0, hard: 0 },
        topics: {},
        recent: []
      });
    }

    /* =========================
       📈 WEEKLY DATA
    ========================= */
    const weeklyMap = {};

    user.solvedProblems.forEach((p) => {
      weeklyMap[p.date] = (weeklyMap[p.date] || 0) + 1;
    });

    const weeklyData = Object.keys(weeklyMap).map((date) => ({
      date,
      solved: weeklyMap[date]
    }));

    /* =========================
       🎯 DIFFICULTY BREAKDOWN
    ========================= */
    const difficulty = { easy: 0, medium: 0, hard: 0 };

    user.solvedProblems.forEach((p) => {
      if (p.difficulty === "easy") difficulty.easy++;
      else if (p.difficulty === "medium") difficulty.medium++;
      else if (p.difficulty === "hard") difficulty.hard++;
    });

    /* =========================
       🧠 TOPIC ANALYSIS
    ========================= */
    const topics = {};

    user.solvedProblems.forEach((p) => {
      topics[p.topic] = (topics[p.topic] || 0) + 1;
    });

    /* =========================
       🕒 RECENT ACTIVITY
    ========================= */
    const recent = user.solvedProblems
      .slice(-5)
      .reverse();

    /* =========================
       🔥 STREAK CALCULATION
    ========================= */
    const dates = user.solvedProblems
      .map(p => p.date)
      .sort();

    let streak = 0;
    let prevDate = null;

    for (let i = dates.length - 1; i >= 0; i--) {
      const current = new Date(dates[i]);

      if (!prevDate) {
        streak = 1;
        prevDate = current;
        continue;
      }

      const diff =
        (prevDate - current) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
        prevDate = current;
      } else if (diff === 0) {
        continue;
      } else {
        break;
      }
    }

    /* =========================
       📦 FINAL RESPONSE
    ========================= */

    res.json({
      totalSolved: user.totalSolved,
      timeSpent: user.timeSpent,
      weeklyData,
      difficulty,
      topics,
      recent,
      streak
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;