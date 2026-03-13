import { useNavigate } from "react-router-dom";

function Navbar(){

const navigate = useNavigate()

return(

<div style={{

display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"20px 40px"

}}>

<h2 style={{cursor:"pointer"}} onClick={()=>navigate("/")}>
AI Interview
</h2>

<div>

<button onClick={()=>navigate("/login")}>
Login
</button>

<button
style={{marginLeft:"10px"}}
onClick={()=>navigate("/signup")}
>
Signup
</button>

</div>

</div>

)

}

export default Navbar