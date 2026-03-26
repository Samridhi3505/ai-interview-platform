import { useState } from "react";
import axios from "axios";

function Interview() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAnswer = async () => {
  if (!answer.trim()) {
    alert("Please enter your answer");
    return;
  }

  setLoading(true);
  console.log("STEP 1: Button clicked");

  try {
    console.log("STEP 2: Sending request...");

    const res = await axios.post("http://localhost:8000/api/interview", {
      answer: answer,
    });

    console.log("STEP 3: Response received", res);

    setFeedback(res.data.feedback);
    setAnswer("");
  } catch (err) {
    console.error("ERROR:", err);
    alert("Backend error");
  }

  console.log("STEP 4: Done");
  setLoading(false);
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f172a, #1e3a8a)",
        color: "white",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        AI Interview
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "15px" }}>
        <b>Question:</b> Tell me about yourself
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows="5"
        placeholder="Type your answer here..."
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          fontSize: "14px",
        }}
      />

      <br />

      <button
        onClick={submitAnswer}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {/* Feedback Box */}
      {feedback && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#1e293b",
            borderRadius: "10px",
            maxWidth: "700px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>AI Feedback</h3>
          <p style={{ lineHeight: "1.6" }}>{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default Interview;