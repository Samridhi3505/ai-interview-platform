import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

/* ================= INTERVIEW API ================= */
app.post("/api/interview", async (req, res) => {
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ feedback: "No answer provided" });
  }

  try {
    console.log("Interview Answer:", answer);

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi",
        prompt: `You are an interview evaluator.
Give:
1. Score out of 10
2. Clear feedback

Answer: ${answer}`,
        stream: false,
      },
      {
        timeout: 10000,
      }
    );

    res.json({
      feedback: response.data.response || "No response from AI",
    });

  } catch (error) {
    console.error("Interview ERROR:", error.message);

    res.status(500).json({
      feedback: "AI server not responding.",
    });
  }
});

/* ================= ROADMAP API ================= */
app.post("/api/roadmap", async (req, res) => {
  const { skill } = req.body;

  if (!skill) {
    return res.status(400).json({ roadmap: "[]" });
  }

  try {
    console.log("Generating roadmap for:", skill);

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi3",
        prompt: `
Create a structured learning roadmap for ${skill}.

Return ONLY valid JSON in this format:
[
  {
    "title": "Main Topic",
    "children": [
      {
        "title": "Subtopic",
        "resources": ["Resource 1", "Resource 2"]
      }
    ]
  }
]
        `,
        stream: false,
      },
      {
        timeout: 60000,
      }
    );

    const aiText = response.data.response;

    console.log("Raw AI Roadmap:", aiText);

    res.json({
      roadmap: aiText || "[]",
    });

  } catch (error) {
    console.error("Roadmap ERROR:", error.message);

    res.status(500).json({
      roadmap: "[]",
    });
  }
});

/* ================= START SERVER ================= */
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});