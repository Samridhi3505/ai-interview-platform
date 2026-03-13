import { useNavigate } from "react-router-dom";

function Dashboard(){

const navigate = useNavigate()

return(

<div className="container">

<h1>Dashboard</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px"
}}
>

<div className="card">

<h3>Start AI Interview</h3>

<p>Practice with AI interviewer</p>

<button
onClick={()=>navigate("/interview")}
>
Start Interview
</button>

</div>

<div className="card">

<h3>View Reports</h3>

<p>See previous interview results</p>

<button
onClick={()=>navigate("/report")}
>
View Reports
</button>

</div>

</div>

</div>

)

}

export default Dashboard