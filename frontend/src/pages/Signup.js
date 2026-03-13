import { useNavigate } from "react-router-dom";

function Signup(){

const navigate = useNavigate()

return(

<div className="container">

<h2>Create Account</h2>

<div className="card">

<input placeholder="Name"/>

<br/><br/>

<input placeholder="Email"/>

<br/><br/>

<input type="password" placeholder="Password"/>

<br/><br/>

<button onClick={()=>navigate("/dashboard")}>
Signup
</button>

</div>

</div>

)

}

export default Signup