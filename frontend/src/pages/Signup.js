import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global_old.css";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const [type, setType] = useState(""); // "success" or "error"

  const handleSignup = async () => {

    // Trim inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/signup",
        {
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword
        }
      );
      setMessage(res.data.message || "Signup successful ✅");
setType("success");

      

      // clear fields
      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");

    } catch (err) {
      console.log("Signup Error:", err);

     setMessage(
  err.response?.data?.message ||
  err.message ||
  "Signup failed ❌"
);
setType("error");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h2>Signup</h2>
        {message && (
  <div className={`msg ${type}`}>
    {message}
  </div>
)}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="main-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p>
          Already have an account?
          <span onClick={() => navigate("/login")}>
            {" "}Login
          </span>
        </p>

      </div>

    </div>

  );
}

export default Signup;