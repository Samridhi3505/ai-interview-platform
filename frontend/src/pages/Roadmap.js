import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Roadmap(){

return(

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Learning Roadmap</h1>

<ul>
<li>Basic Coding ✔</li>
<li>DSA Practice ✔</li>
<li>System Design ⏳</li>
<li>Mock Interviews 🔒</li>
</ul>

</div>

</div>

)

}

export default Roadmap