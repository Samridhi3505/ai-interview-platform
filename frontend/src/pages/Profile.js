import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import axios from "axios";
import Avatar from "../components/Avatar";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [strength, setStrength] = useState("");
  const [errors, setErrors] = useState({});
  const API = "https://ai-interview-platform-bfm8.onrender.com";
  

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // 🔥 PROFILE COMPLETION
  const calculateProgress = () => {
    let total = 4;
    let filled = 0;

    if (user.name) filled++;
    if (user.email) filled++;
    if (user.role) filled++;
    if (skills.length > 0) filled++;

    return Math.round((filled / total) * 100);
  };

  const progress = calculateProgress();

  // 🔥 FETCH PROFILE
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser) {
      setUser(localUser);
      setSkills(localUser.skills || []);
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setUser(res.data);
        setSkills(res.data.skills || []);

        localStorage.setItem("user", JSON.stringify(res.data));

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔥 SAVE PROFILE
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API}/api/profile`,
        { ...user, skills },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile updated ✅");

    } catch {
      alert("Error updating profile");
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const addSkill = async () => {
  if (!newSkill.trim()) return;

  try {
    const token = localStorage.getItem("token");

    const updatedSkills = [...skills, newSkill];

    const res = await axios.put(
      ~`${API}/api/profile`,
      { ...user, skills: updatedSkills },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSkills(res.data.skills);
    setNewSkill("");

    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (err) {
    console.error(err);
    alert("Skill not saved");
  }
};

  const removeSkill = async (index) => {
  try {
    const token = localStorage.getItem("token");

    const updatedSkills = skills.filter((_, i) => i !== index);

    const res = await axios.put(
     `${API}/api/profile`,
      { ...user, skills: updatedSkills },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSkills(res.data.skills);
    localStorage.setItem("user", JSON.stringify(res.data));

  } catch (err) {
    console.error(err);
    alert("Failed to remove skill");
  }
};

  // 🔐 PASSWORD LOGIC
  const checkStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)) return "Strong";
    return "Medium";
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData({ ...passwordData, [name]: value });

    if (name === "newPassword") {
      setStrength(checkStrength(value));
    }
  };

  const handlePasswordSubmit = async () => {
    let newErrors = {};

    if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Minimum 6 characters required";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/profile`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert(res.data.message);
      setShowPasswordBox(false);

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };
  const updateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${API}/api/profile`,
      {
        ...user,
        skills, // keep existing skills also
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));

    alert("Profile updated ✅");
  } catch (err) {
    console.error(err);
    alert("Error updating profile");
  }
};
  const navigate = useNavigate();

  if (loading) return <h2>Loading Profile...</h2>;

 return (
  <div className="profile-container">

    {/* HEADER */}
    <div className="profile-header">
    <Avatar name={user.name} />
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <span className="role-badge">{user.role || "Add Role"}</span>
      </div>
    </div>

    {/* PROGRESS */}
    <div className="profile-card">
      <h3>Profile Completion</h3>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p>{progress}% completed</p>
    </div>

    {/* PROFILE EDIT */}
    <div className="profile-card">
      <h3>Edit Profile</h3>

      {isEditing && (
        <div className="form">
          <input name="name" value={user.name} onChange={handleChange} />
          <input name="email" value={user.email} disabled />
          <input name="role" value={user.role} onChange={handleChange} />
        </div>
      )}

      <button
        className="primary-btn"
        onClick={() => {
          if (isEditing) handleSaveProfile();
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>

    {/* SKILLS */}
    <div className="profile-card">
      <h3>Skills</h3>

      <div className="skills">
        {skills.map((skill, i) => (
          <div key={i} className="skill-chip">
            {skill}
            <span onClick={() => removeSkill(i)}>✕</span>
          </div>
        ))}
      </div>

      <div className="add-skill">
        <input
          placeholder="Add skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button className="primary-btn" onClick={addSkill}>
          Add
        </button>
      </div>
    </div>

    {/* SETTINGS */}
    <div className="profile-card settings">
      <button className="secondary-btn" onClick={() => setShowPasswordBox(true)}>
        Change Password
      </button>

      <button
        className="danger-btn"
        onClick={() => {
          localStorage.clear();
          navigate("/",{replace:true});
        }}
      >
        Logout
      </button>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
  ← Dashboard
</button>
    </div>
    

    {/* PASSWORD MODAL */}
    {showPasswordBox && (
      <div className="modal">
        <div className="modal-content">
          <h3>Change Password</h3>

          <input
            type={showPasswords ? "text" : "password"}
            name="oldPassword"
            placeholder="Old Password"
            onChange={handlePasswordChange}
          />

          <input
            type={showPasswords ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            onChange={handlePasswordChange}
          />

          <p className="strength">{strength}</p>

          <input
            type={showPasswords ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handlePasswordChange}
          />

          <div className="modal-actions">
            <button className="primary-btn" onClick={handlePasswordSubmit}>
              Update
            </button>
            <button className="secondary-btn" onClick={() => setShowPasswordBox(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

  </div>
);
}