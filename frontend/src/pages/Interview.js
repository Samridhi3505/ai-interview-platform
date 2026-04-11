import { useState, useEffect } from "react";
import "../styles/interview.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ DATA IMPORTS
import arraysQuestions from "../Data/ArrayData";
import binarySearchQuestions from "../Data/BinarySearchData";
import treeQuestions from "../Data/TreesData";
import graphQuestions from "../Data/GraphsData";
import linkedListQuestions from "../Data/LinkedList";
import dpQuestions from "../Data/DPData";
import stringQuestions from "../Data/StringsData";
import hashingQuestions from "../Data/HashingData";
import stackQueueQuestions from "../Data/S&Qdata";

import cnResources from "../Data/CNData";
import dbmsResources from "../Data/DBMSData";
import oopsResources from "../Data/OopsData";
import osResources from "../Data/OsData";

export default function Interview() {
  const [mode, setMode] = useState("dsa");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCore, setSelectedCore] = useState(null);
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();

  // ✅ TOPICS
  const dsaTopics = [
    "Arrays", "Binary Search", "Trees", "Graphs",
    "Linked List", "DP", "Strings", "Hashing", "Stacks & Queues"
  ];

  const coreSubjects = [
    { title: "DBMS", desc: "Most Asked Database Concepts" },
    { title: "Operating System", desc: "Processes, Threads & Memory" },
    { title: "Computer Networks", desc: "Networking Fundamentals" },
    { title: "OOPS", desc: "Object Oriented Principles" }
  ];

  // ✅ DATA MAP
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

  const coreDataMap = {
    "Computer Networks": cnResources,
    "DBMS": dbmsResources,
    "OOPS": oopsResources,
    "Operating System": osResources
  };

  // ✅ FETCH PROGRESS FROM BACKEND
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/api/users/progress", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProgress(data || {});
      } catch (err) {
        console.log(err);
      }
    };

    fetchProgress();
  }, []);

  // ✅ SAVE PROGRESS (QUESTION LEVEL)
  
 const updateProgress = async (topic, question, isChecked) => {
  try {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:8000/api/users/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topic, question, isChecked }),
    });

    setProgress((prev) => {
      const prevTopic = prev[topic] || [];

      let newTopic;

      if (isChecked) {
        newTopic = prevTopic.includes(question)
          ? prevTopic
          : [...prevTopic, question];
      } else {
        newTopic = prevTopic.filter(q => q !== question);
      }

      return {
        ...prev,
        [topic]: newTopic,
      };
    });

  } catch (err) {
    console.log(err);
  }
};


  // ✅ CALCULATE %
  const getProgress = (topic) => {
    const completed = progress?.[topic]?.length || 0;
    const total = topicDataMap[topic]?.length || 1;

    return Math.round((completed / total) * 100);
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
      <div key={item.title} className="card">
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
        {coreDataMap[selectedCore]?.websites?.map((site, i) => (
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
        {coreDataMap[selectedCore]?.youtube?.map((yt, i) => (
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

      {coreDataMap[selectedCore]?.importantTopics?.map((section, i) => (
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

      {/* DSA */}
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

              <button className="btn" onClick={() => setSelectedTopic(topic)}>
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

          {(topicDataMap[selectedTopic] || []).map((q) => (
            <div key={q.id} className="question-row">

              <input
                type="checkbox"
                checked={progress?.[selectedTopic]?.includes(q.title)}
                onChange={(e) => {
                  updateProgress(selectedTopic, q.title, e.target.checked);
                }}
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