import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function Signup(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSignup = () => {

if(name && email && password){

alert("Account Created");

navigate("/login");

}else{

alert("Fill all fields");

}

};

return(

<div className="container">

<div className="card">

<h2>Signup</h2>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="main-btn" onClick={handleSignup}>
Create Account
</button>

<p>

Already have an account?

<span onClick={()=>navigate("/login")}>
 Login
</span>

</p>

</div>

</div>

);

}

export default Signup;