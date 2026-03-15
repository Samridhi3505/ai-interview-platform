import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaFileAlt, FaChartBar, FaRoad, FaUser, FaMicrophone } from "react-icons/fa";
import "../styles/global.css";   // changed from dashboard.css

function Sidebar() {

const navigate = useNavigate();

return (

<div className="sidebar">

<h2 className="logo">InterviewAI</h2>

<ul>

<li onClick={() => navigate("/")}>
<FaHome /> Dashboard
</li>

<li onClick={() => navigate("/interviews")}>
<FaMicrophone /> Interviews
</li>

<li onClick={() => navigate("/reports")}>
<FaFileAlt /> Reports
</li>

<li onClick={() => navigate("/results")}>
<FaChartBar /> Results
</li>

<li onClick={() => navigate("/roadmap")}>
<FaRoad /> Roadmap
</li>

<li onClick={() => navigate("/profile")}>
<FaUser /> Profile
</li>

</ul>

</div>

);

}

export default Sidebar;