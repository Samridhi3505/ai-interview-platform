import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleLogin=()=>{

if(email && password){

navigate("/dashboard")

}else{

alert("Enter credentials")

}

}

return(

<div className="container">

<h2>Login</h2>

<div className="card">

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={handleLogin}>
Login
</button>

</div>

</div>

)

}

export default Login