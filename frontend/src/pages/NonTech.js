import { useState, useEffect } from "react";
import questionsData from "../Data/NonTechQuestions";
import "../styles/nontech.css";
import { useNavigate } from "react-router-dom";

export default function NonTech() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  // ✅ Initialize
  useEffect(() => {
    if (Array.isArray(questionsData) && questionsData.length > 0) {
      setSelected(questionsData[0]);
      setFiltered(questionsData);
    }
  }, []);

  // ✅ Search filter
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(questionsData || []);
    } else {
      const result =
        questionsData?.filter((q) =>
          (q.question || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        ) || [];
      setFiltered(result);
    }
  }, [search]);

  return (
    <div className="nontech-container">

      {/* 🔹 LEFT SIDEBAR */}
      <div className="sidebar">

        <h2>💬Non Technical Questions</h2>
        <button className="dashboard-btn" onClick={() => navigate("/Dashboard")}>
  🏠 Dashboard
</button>

        <input
          type="text"
          placeholder="Search..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ✅ SCROLLABLE LIST */}
        <div className="question-list">

          <div className="list-header">
            <span>Status</span>
            <span>Problem</span>
          </div>

          <div className="list-body">
            {filtered.length > 0 ? (
              filtered.map((q) => (
                <div
                  key={q.id}
                  className={`question-row ${
                    selected?.id === q.id ? "active" : ""
                  }`}
                  onClick={() => setSelected(q)}
                >
                  <span className="status">
                    {q.solved ? "✔" : "○"}
                  </span>

                  <span className="problem">{q.question}</span>
                </div>
              ))
            ) : (
              <p className="empty">No questions found</p>
            )}
          </div>

        </div>
      </div>

      {/* 🔹 RIGHT PANEL */}
      <div className="answer-panel">
        {selected ? (
          <>
            <h2>{selected.question}</h2>
            <p>{selected.answer}</p>
          </>
        ) : (
          <p className="empty">Select a question to view answer</p>
        )}
      </div>
      

    </div>
  );
  
}