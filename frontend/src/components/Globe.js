import Globe from "react-globe.gl"
import { useEffect, useRef } from "react"

function GlobeBackground(){

const globeRef = useRef()

useEffect(()=>{

if(globeRef.current){

globeRef.current.controls().autoRotate = true
globeRef.current.controls().autoRotateSpeed = 0.5

}

},[])

return(

<div
style={{
position:"absolute",
top:0,
right:0,
width:"600px",
height:"600px",
zIndex:-1
}}
>

<Globe
ref={globeRef}
backgroundColor="rgba(0,0,0,0)"
globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
/>

</div>

)

}

export default GlobeBackground