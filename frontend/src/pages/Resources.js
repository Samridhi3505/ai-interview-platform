import { useState } from "react";
import skillsResources from "../Data/skillsData";
import "../styles/resources.css";
import { useNavigate } from "react-router-dom";


export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="skills-page">

      {!selectedSkill && (
        <>
          <h1 className="title">🚀 Explore Tech Skills</h1>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
  ← Dashboard
</button>

          <div className="skills-grid">
            {skillsResources.map((skill, i) => (
              <div
                key={i}
                className="skill-card"
                onClick={() => setSelectedSkill(skill)}
              >
                <h2>{skill.title}</h2>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
      

      {selectedSkill && (
        <div className="skill-details">

          <button
            className="back-btn"
            onClick={() => setSelectedSkill(null)}
          >
            ← Back
          </button>

          <h1>{selectedSkill.title}</h1>
          <p className="desc">{selectedSkill.description}</p>

          {/* 🌐 Websites */}
          <div className="section">
            <h3>🌐 Websites</h3>
            <div className="resource-grid">
              {selectedSkill.websites.map((site, i) => (
                <a key={i} href={site.link} target="_blank" className="resource-card">
                  {site.name}
                </a>
              ))}
            </div>
          </div>

          {/* 🎥 YouTube */}
          <div className="section">
            <h3>🎥 YouTube</h3>
            <div className="resource-grid">
              {selectedSkill.youtube.map((yt, i) => (
                <a key={i} href={yt.link} target="_blank" className="resource-card yt">
                  {yt.name}
                </a>
              ))}
            </div>
          </div>

          {/* 📚 Topics */}
          <div className="section">
            <h3>📚 Topics to Learn</h3>
            <div className="topics">
              {selectedSkill.topics.map((t, i) => (
                <span key={i} className="topic-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}