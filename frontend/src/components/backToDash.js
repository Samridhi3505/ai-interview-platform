import { useNavigate } from "react-router-dom";
import "../styles/back.css";

export default function BackToDashboard() {
  const navigate = useNavigate();

  return (
    <button className="back-dashboard" onClick={() => navigate("/dashboard")}>
      ← Dashboard
    </button>
  );
}