import React from "react";
import Sidebar from "../components/Sidebar";

import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer
} from "recharts";

import "../styles/global.css";

function Dashboard(){

const stats=[
{title:"Interviews Taken",value:8},
{title:"Average Score",value:"72%"},
{title:"Best Score",value:"88%"},
{title:"Practice Time",value:"4h 30m"}
]

const chartData=[
{name:"Interview1",score:60},
{name:"Interview2",score:70},
{name:"Interview3",score:75},
{name:"Interview4",score:82}
]

return(

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Dashboard</h1>

<div className="stats">

{stats.map((s,i)=>(
<div key={i} className="card">
<h3>{s.title}</h3>
<p>{s.value}</p>
</div>
))}

</div>

<div className="chart">

<h3>Interview Progress</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={chartData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line type="monotone" dataKey="score" stroke="#6366f1"/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

</div>

)

}

export default Dashboard