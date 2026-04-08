import { useState, useEffect } from "react";
import "../styles/interview.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ✅ DSA DATA
import arraysQuestions from "../Data/ArrayData";
import binarySearchQuestions from "../Data/BinarySearchData";
import treeQuestions from "../Data/TreesData";
import graphQuestions from "../Data/GraphsData";
import linkedListQuestions from "../Data/LinkedList";
import dpQuestions from "../Data/DPData";
import stringQuestions from "../Data/StringsData";
import hashingQuestions from "../Data/HashingData";
import stackQueueQuestions from "../Data/S&Qdata";

// ✅ CORE DATA
import cnResources from "../Data/CNData";
import dbmsResources from "../Data/DBMSData";
import oopsResources from "../Data/OopsData";
import osResources from "../Data/OsData";

export default function Interview() {
  const [mode, setMode] = useState("dsa");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCore, setSelectedCore] = useState(null);
  const [solved, setSolved] = useState({});
  const navigate = useNavigate();

  // ✅ DSA TOPICS
  const dsaTopics = [
    "Arrays", "Binary Search", "Trees", "Graphs",
    "Linked List", "Dynamic Programming", "Strings", "Hashing", "Stacks & Queues"
  ];

  // ✅ CORE SUBJECTS
  const coreSubjects = [
    { title: "DBMS", desc: "Most Asked Database Concepts" },
    { title: "Operating System", desc: "Processes, Threads & Memory" },
    { title: "Computer Networks", desc: "Networking Fundamentals" },
    { title: "OOPS", desc: "Object Oriented Principles" }
  ];

  // ✅ DSA MAP
  const topicDataMap = {
    "Arrays": arraysQuestions || [],
    "Binary Search": binarySearchQuestions || [],
    "Trees": treeQuestions || [],
    "Graphs": graphQuestions || [],
    "Linked List": linkedListQuestions || [],
    "DP": dpQuestions || [],
    "Strings": stringQuestions || [],
    "Hashing": hashingQuestions || [],
    "Stacks & Queues": stackQueueQuestions || []
  };

  // ✅ CORE MAP
  const coreDataMap = {
    "Computer Networks": cnResources,
    "DBMS": dbmsResources,
    "OOPS": oopsResources,
    "Operating System": osResources
  };
const rawData = topicDataMap[selectedTopic];

const questions = Array.isArray(rawData)
  ? rawData
  : rawData?.questions || [];

  const markSolved = async (questionId) => {
  await axios.post("http://localhost:8000/solve", {
    username: "samridhi", // static for now
    questionId,
  });
};
 

  // ✅ LOAD PROGRESS
  useEffect(() => {
    if (selectedTopic) {
      const saved = localStorage.getItem(selectedTopic);
      setSolved(saved ? JSON.parse(saved) : {});
    }
  }, [selectedTopic]);

  // ✅ SAVE PROGRESS
  useEffect(() => {
    if (selectedTopic) {
      localStorage.setItem(selectedTopic, JSON.stringify(solved));
    }
  }, [solved, selectedTopic]);

  const toggleSolved = (id) => {
    setSolved((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getProgress = (topic) => {
    const saved = JSON.parse(localStorage.getItem(topic) || "{}");
    const total = topicDataMap[topic]?.length || 0;
    const done = Object.values(saved).filter(Boolean).length;
    return total ? Math.round((done / total) * 100) : 0;
  };


  return (
    <div className="interview-page">

      {/* NAV */}
      <div className="tabs">
        {["DSA Playlist", "Core CS Subjects"].map((tab) => (
          <button
            key={tab}
            className={`tab ${
              mode === (tab === "DSA Playlist" ? "dsa" : "core") ? "active" : ""
            }`}
            onClick={() => {
              setMode(tab === "DSA Playlist" ? "dsa" : "core");
              setSelectedTopic(null);
              setSelectedCore(null);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <button className="dashboard-btn" onClick={() => navigate("/Dashboard")}>
  🏠 Dashboard
</button>

      {/* HEADER */}
      <div className="header">
        <h1>{mode === "dsa" ? "DSA Playlist" : "Core CS Subjects"}</h1>
        <p>Master Concepts Step-by-Step</p>
      </div>

      {/* ================= CORE ================= */}
      {mode === "core" && !selectedCore && (
        <div className="grid">
          {coreSubjects.map((item) => (
            <div className="card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <button
                className="btn"
                onClick={() => setSelectedCore(item.title)}
              >
                Start Learning →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 CORE DETAILS */}
      {selectedCore && (
  <div className="core-container">

    <button className="back-btn" onClick={() => setSelectedCore(null)}>
      ← Back
    </button>
    <button className="dashboard-btn" onClick={() => navigate("/Dashboard")}>
  🏠 Dashboard
</button>

    <h2 className="core-title">{selectedCore}</h2>

    {/* 🌐 WEBSITES */}
    <div className="core-section">
      <h3>🌐 Websites</h3>
      <div className="resource-grid">
        {coreDataMap[selectedCore]?.websites.map((site, i) => (
          <div key={i} className="resource-card">
            <h4>{site.name}</h4>
            <p>{site.description}</p>
            <a href={site.link} target="_blank" className="resource-btn">
              Open →
            </a>
          </div>
        ))}
      </div>
    </div>

    {/* 🎥 YOUTUBE */}
    <div className="core-section">
      <h3>🎥 YouTube</h3>
      <div className="resource-grid">
        {coreDataMap[selectedCore]?.youtube.map((yt, i) => (
          <div key={i} className="resource-card">
            <h4>{yt.name}</h4>
            <p>{yt.description}</p>
            <a href={yt.link} target="_blank" className="resource-btn yt">
              Watch →
            </a>
          </div>
        ))}
      </div>
    </div>

    {/* 📚 TOPICS */}
    <div className="core-section">
      <h3>📚 Important Topics</h3>

      {coreDataMap[selectedCore]?.importantTopics.map((section, i) => (
        <div key={i} className="topic-card">
          <h4>{section.category}</h4>

          <div className="topic-list">
            {section.topics.map((t, idx) => (
              <span key={idx} className="topic-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

  </div>
)}

      {/* ================= DSA ================= */}
      {mode === "dsa" && !selectedTopic && (
        <div className="grid">
          {dsaTopics.map((topic) => (
            <div key={topic} className="card">
              <h2>{topic}</h2>
              <div className="progress">
           <div
             className="progress-fill"
              style={{ width: `${getProgress(topic)}%` }}
               ></div>
               </div>

           <p className="progress-text">
            {getProgress(topic)}% Completed
               </p>

              

              <button
                className="btn"
                onClick={() => setSelectedTopic(topic)}
              >
                Start Learning →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* QUESTIONS */}
      {selectedTopic && (
        <div className="questions-container">

          <button className="back-btn" onClick={() => setSelectedTopic(null)}>
            ← Back
          </button>

          <h2>{selectedTopic}</h2>

          {questions.map((q) => (
            <div key={q.id} className="question-row">

              <input
                type="checkbox"
                checked={!!solved[q.id]}
                onChange={() => toggleSolved(q.id)}
              />

              <span className="title">{q.title}</span>

              <span className={`difficulty ${q.difficulty}`}>
                {q.difficulty}
              </span>

              <a href={q.link} target="_blank" className="solve-btn">
                Solve →
              </a>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}