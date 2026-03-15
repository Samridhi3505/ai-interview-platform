import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function Login() {

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showPassword,setShowPassword] = useState(false);

const handleLogin = () => {

if(email && password){

alert("Login Successful");

navigate("/dashboard");

}else{

alert("Enter credentials");

}

};

return (

<div className="container">

<div className="card">

<h2>Login</h2>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<div className="password-box">

<input
type={showPassword ? "text":"password"}
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="show-btn"
onClick={()=>setShowPassword(!showPassword)}
>

{showPassword ? "Hide":"Show"}

</button>

</div>

<button className="main-btn" onClick={handleLogin}>
Login
</button>

<p>

Don't have an account?

<span onClick={()=>navigate("/signup")}>
 Sign Up
</span>

</p>

</div>

</div>

);

}

export default Login;