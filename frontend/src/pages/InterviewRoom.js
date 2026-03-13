import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function InterviewRoom() {

  const questions = [
    "Tell me about yourself",
    "What is React and why is it used",
    "Explain the difference between Java and JavaScript",
    "What are closures in JavaScript"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewEnded, setInterviewEnded] = useState(false);

  const {
    transcript,
    resetTranscript,
    listening
  } = useSpeechRecognition();

  // AI SPEAKS QUESTION
  const speakQuestion = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    speakQuestion(questions[currentQuestion]);
  }, [currentQuestion]);

  const nextQuestion = () => {
    resetTranscript();
    setCurrentQuestion((prev) => prev + 1);

    if (currentQuestion + 1 >= questions.length) {
      setInterviewEnded(true);
    }
  };

  if (interviewEnded) {
    return (
      <div style={styles.container}>
        <h1>Interview Completed 🎉</h1>
        <p>Your answers have been recorded.</p>
        <p>AI Feedback: Good communication and clarity 👍</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>AI Interview Room</h1>

      <div style={styles.topSection}>

        <Webcam
          audio={true}
          screenshotFormat="image/jpeg"
          style={styles.webcam}
        />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          style={styles.avatar}
        >
          🤖
        </motion.div>

      </div>

      <div style={styles.questionBox}>
        <h2>AI Question</h2>
        <p>{questions[currentQuestion]}</p>
      </div>

      <div style={styles.controls}>

        <button
          style={styles.button}
          onClick={SpeechRecognition.startListening}
        >
          🎤 Start Answer
        </button>

        <button
          style={styles.button}
          onClick={SpeechRecognition.stopListening}
        >
          ⏹ Stop
        </button>

        <button
          style={styles.button}
          onClick={nextQuestion}
        >
          Next Question →
        </button>

      </div>

      <div style={styles.answerBox}>
        <h3>Your Answer</h3>
        <p>{transcript}</p>
      </div>

      <p>{listening ? "Listening..." : "Microphone off"}</p>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#020617,#0f172a)",
    color: "white",
    textAlign: "center",
    padding: "40px"
  },

  title: {
    fontSize: "42px",
    marginBottom: "30px",
    background: "linear-gradient(90deg,#00ffff,#00ffa6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  topSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px"
  },

  webcam: {
    width: "350px",
    borderRadius: "20px",
    boxShadow: "0 0 20px cyan"
  },

  avatar: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#00e5ff,#00ffa6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "60px",
    boxShadow: "0 0 40px #00ffff"
  },

  questionBox: {
    marginTop: "30px",
    padding: "20px",
    background: "#1e293b",
    borderRadius: "15px",
    maxWidth: "600px",
    marginInline: "auto"
  },

  controls: {
    marginTop: "20px"
  },

  button: {
    padding: "12px 25px",
    margin: "10px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(90deg,#00ffff,#00ffa6)",
    cursor: "pointer",
    fontWeight: "bold"
  },

  answerBox: {
    marginTop: "30px",
    padding: "20px",
    background: "#1e293b",
    borderRadius: "15px",
    maxWidth: "600px",
    marginInline: "auto"
  }
};