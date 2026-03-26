import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Samridhi Thakur",
    email: "samridhi@email.com",
    role: "B.Tech Student",
    image: "https://i.pravatar.cc/100"
  });

  // ✅ FIX: add missing states
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // Load saved data
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedSkills = JSON.parse(localStorage.getItem("skills"));

    if (savedUser) setUser(savedUser);
    if (savedSkills) setSkills(savedSkills);
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [user, skills]);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">

      {/* USER INFO */}
      <div className="profile-card">
        <img src={user.image} alt="avatar" className="profile-img" />

        {isEditing ? (
          <>
            <input name="name" value={user.name} onChange={handleChange} />
            <input name="email" value={user.email} onChange={handleChange} />
            <input name="role" value={user.role} onChange={handleChange} />
          </>
        ) : (
          <>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <span className="role">{user.role}</span>
          </>
        )}

        <p style={{ marginTop: "10px" }}>Change Profile Picture</p>
        <input type="file" onChange={handleImageUpload} />

        <button
          className="primary-btn"
          onClick={() => {
            if (isEditing) alert("Profile Saved ✅");
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>

      {/* SKILLS */}
      <div className="profile-card">
        <h3>🧠 Skills</h3>

        <div className="skills">
          {skills.map((skill, index) => (
            <div key={index} className="skill-chip">
              {skill}
              <span onClick={() => {
                const updated = skills.filter((_, i) => i !== index);
                setSkills(updated);
              }}>
                ✕
              </span>
            </div>
          ))}
        </div>

        {/* ADD SKILL */}
        <div className="add-skill">
          <input
            placeholder="Add skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />

          <button
            onClick={() => {
              if (newSkill.trim()) {
                setSkills([...skills, newSkill]);
                setNewSkill("");
              }
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* SETTINGS */}
      <div className="profile-card">
        <h3>⚙️ Settings</h3>

        <button onClick={() => alert("Coming soon")}>
          Change Password
        </button>
        {"  "}

        <button
          className="danger-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

    </div>
  );
}