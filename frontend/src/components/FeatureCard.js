function FeatureCard({title,description}){

return(

<div className="card"
style={{
transition:"0.3s",
cursor:"pointer"
}}
>

<h3 style={{fontSize:"22px"}}>
{title}
</h3>

<p style={{marginTop:"10px"}}>
{description}
</p>

</div>

)

}

export default FeatureCard