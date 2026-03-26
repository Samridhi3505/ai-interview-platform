import React, { useState, useEffect } from "react";
import TreeNode from "../components/TreeNode";
import "../styles/roadmap.css";

export default function Roadmap() {
  const [skill, setSkill] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [completed, setCompleted] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("roadmapProgress");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  // ✅ Save progress
  useEffect(() => {
    localStorage.setItem("roadmapProgress", JSON.stringify(completed));
  }, [completed]);

  // 🚀 Generate roadmap
  const generateRoadmap = async () => {
    if (!skill.trim()) {
      alert("Enter a skill first!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ skill })
      });

      const data = await res.json();

      let parsed = [];
      try {
        parsed = JSON.parse(data.roadmap);
      } catch {
        parsed = [];
      }

      setRoadmap(parsed);
      setCompleted({});
      setCollapsed({});
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  // 📊 Count nodes
  const countNodes = (nodes) => {
    let count = 0;
    nodes.forEach((n) => {
      count++;
      if (n.children) count += countNodes(n.children);
    });
    return count;
  };

  // 📈 Progress %
  const getProgress = () => {
    const total = countNodes(roadmap);
    const done = Object.values(completed).filter(Boolean).length;
    return total ? Math.round((done / total) * 100) : 0;
  };

  return (
    <div className="roadmap-container">

      <h1>🚀 AI Learning Roadmap</h1>

      {/* INPUT */}
      <div className="input-box">
        <input
          placeholder="Enter skill (e.g. frontend, DSA)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button onClick={generateRoadmap} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="loading">Generating your roadmap...</p>}

      {/* EMPTY STATE */}
      {!loading && roadmap.length === 0 && (
        <p className="empty">Enter a skill to generate your roadmap 🚀</p>
      )}

      {/* PROGRESS */}
      {roadmap.length > 0 && (
        <div className="progress-box">
          <p>Progress: {getProgress()}%</p>
          <div className="progress-bar">
            <div style={{ width: `${getProgress()}%` }}></div>
          </div>
        </div>
      )}

      {/* TREE */}
      <div className="tree">
        {roadmap.map((node, index) => (
          <TreeNode
            key={index}
            node={node}
            path={`${index}`}
            completed={completed}
            setCompleted={setCompleted}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        ))}
      </div>

    </div>
  );
}