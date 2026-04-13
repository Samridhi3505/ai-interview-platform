import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global_old.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const [type, setType] = useState(""); 
const API = "https://ai-interview-platform-bfm8.onrender.com";// success / error

  // 🔥 AUTO REDIRECT IF LOGGED IN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });// 🔥 FORCE FULL RELOAD
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Enter credentials ❌");
setType("error");
      return;
    }
    console.log("EMAIL ENTERED:", email);

    try {
      setLoading(true);

      const res = await axios.post(
         `${API}/api/login`,
        { email, password }
      );
      console.log(res.data);


      // 🔥 SAVE BOTH TOKEN + USER
      localStorage.clear(); 
      localStorage.setItem("token", res.data.token);

     setMessage("Login Successful ✅");
      setType("Success");
      window.location.href = "/dashboard";

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed ❌");
      setType("error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    
    <div className="container">
      <div className="card">

        <h2>Login</h2>
{message && (
  <div className={`msg ${type}`}>
    {message}
  </div>
)}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="show-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          className="auth-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
        

      </div>
    </div>
  );
}

export default Login;