import React, { useState } from "react";

export default function TreeNode({
  node,
  path,
  completed,
  setCompleted,
  collapsed,
  setCollapsed
}) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const children = node.children || [];

  const toggleComplete = () => {
    setCompleted(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const toggleCollapse = () => {
    setCollapsed(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // 🔥 AI Explain Feature
  const getExplanation = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: node.title })
      });

      const data = await res.json();
      setExplanation(data.explanation);

    } catch (err) {
      console.error(err);
      setExplanation("Error fetching explanation");
    }

    setLoading(false);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <div>
        <span onClick={toggleCollapse} style={{ cursor: "pointer" }}>
          {children.length ? (collapsed[path] ? "▶" : "▼") : "•"}
        </span>

        <input
          type="checkbox"
          checked={completed[path] || false}
          onChange={toggleComplete}
        />

        {/* 🔥 CLICK TO EXPLAIN */}
        <span
          onClick={getExplanation}
          style={{ cursor: "pointer", marginLeft: "5px" }}
        >
          {node.title}
        </span>
      </div>

      {/* 🤖 Explanation Box */}
      {loading && <p style={{ marginLeft: "20px" }}>🤖 Loading...</p>}

      {explanation && (
        <div style={{
          marginLeft: "20px",
          background: "#111",
          padding: "10px",
          borderRadius: "8px",
          marginTop: "5px"
        }}>
          {explanation}
        </div>
      )}

      {!collapsed[path] &&
        children.map((child, i) => (
          <TreeNode
            key={i}
            node={child}
            path={`${path}-${i}`}
            completed={completed}
            setCompleted={setCompleted}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        ))}
    </div>
  );
}