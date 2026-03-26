import React, { useEffect } from "react";
import "../styles/global_old.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate(); // ✅ FIX

  // 🧠 Magnetic Hover Effect
  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    const handleMouseMove = (card) => (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      card.style.transform = `rotateX(${ -y / 20 }deg) rotateY(${ x / 20 }deg) scale(1.05)`;
    };

    const handleLeave = (card) => () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    };

    cards.forEach((card) => {
      const move = handleMouseMove(card);
      const leave = handleLeave(card);

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);

      card._move = move;
      card._leave = leave;
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", card._move);
        card.removeEventListener("mouseleave", card._leave);
      });
    };
  }, []);
  

  return (
    <div className="dashboard-container">

      {/* 🔥 TOP SECTION */}
      <div className="top-section">
        <div className="top-box">
          <h2 className="dashboard-title">Dashboard</h2>
          <p>Hey Samridhi 👋, ready to crack your next interview?</p>
        </div>
      </div>

      {/* 💎 STATS */}
      <div className="stats">
        <div className="card">
          <h2>82%</h2>
          <p>Avg Score</p>
        </div>

        <div className="card">
          <h2>10</h2>
          <p>Questions Practiced</p>
        </div>

        <div className="card">
          <h2>5 🔥</h2>
          <p>Day Streak</p>
        </div>
      </div>

      {/* 🚀 BOTTOM GRID */}
      <div className="bottom-grid">

        <div className="card">
          <h3>📈 Progress</h3>
          <p className="progress-text">
            You are performing better than last week 🔥
          </p>
        </div>

        <div className="card">
          <h3>🧑‍💻 Recent Activity</h3>
          <ul>
            <li>✅ Completed HR Interview</li>
            <li>📊 Scored 82% in DSA round</li>
            <li>🎯 Practiced 10 questions</li>
          </ul>
        </div>

        <div className="card">
          <h3>🚀 Quick Actions</h3>
          <div className="actions">
            <button onClick={() => navigate("/Interview")}>
              🎤 Interview
            </button>

            <button onClick={() => navigate("/Report")}>
              📊 Reports
            </button>

            <button onClick={() => navigate("/Results")}>
              📝 Results
            </button>

            <button onClick={() => navigate("/Profile")}>
              👤 Profile
            </button>
            <button onClick={() => navigate("/Roadmap")}>
              Roadmap
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}