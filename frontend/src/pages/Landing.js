import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

import google from "../assets/logos/google.png";
import microsoft from "../assets/logos/microsoft.png";
import amazon from "../assets/logos/amazon.png";
import apple from "../assets/logos/apple.png";
import meta from "../assets/logos/meta.png";
import netflix from "../assets/logos/netflix.png";

export default function Landing() {

  const navigate = useNavigate();
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowGreeting(true);
    }, 2000);
  }, []);

  return (
    <div style={styles.page}>

      {/* PARTICLES BACKGROUND */}

      <Particles
        options={{
          fullScreen: { enable: false },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" }
            }
          },
          particles: {
            number: { value: 80 },
            color: { value: "#67e8f9" },
            links: {
              enable: true,
              distance: 140,
              color: "#67e8f9",
              opacity: 0.3
            },
            move: {
              enable: true,
              speed: 1
            },
            size: { value: 3 }
          }
        }}
        style={styles.particles}
      />

      {/* FLOATING COMPANY LOGOS */}

      <img src={google} style={{...styles.logo,left:"8%",animationDuration:"26s"}} />
      <img src={microsoft} style={{...styles.logo,left:"22%",animationDuration:"20s"}} />
      <img src={amazon} style={{...styles.logo,left:"35%",animationDuration:"24s"}} />
      <img src={apple} style={{...styles.logo,left:"55%",animationDuration:"22s"}} />
      <img src={meta} style={{...styles.logo,left:"70%",animationDuration:"28s"}} />
      <img src={netflix} style={{...styles.logo,left:"85%",animationDuration:"18s"}} />



      {/* MAIN CARD */}

      <motion.div
        style={styles.card}
        initial={{ opacity:0,y:40 }}
        animate={{ opacity:1,y:0 }}
      >

        <h1 style={styles.title}>PrepZen AI</h1>

        <p style={styles.description}>
          Master interviews through calm practice and intelligent preparation.
        </p>

        {/* TYPEWRITER */}

        <div style={styles.quote}>
          <Typewriter
            options={{
              strings:[
                "Practice interviews with AI",
                "Prepare for FAANG companies",
                "Build confidence before the real interview",
                "Turn preparation into success"
              ],
              autoStart:true,
              loop:true
            }}
          />
        </div>

        <motion.button
          style={styles.button}
          whileHover={{ scale:1.1 }}
          whileTap={{ scale:0.95 }}
          onClick={()=>navigate("/login")}
        >
          Start Your Preparation
        </motion.button>

      </motion.div>

      {/* AI ASSISTANT GREETING */}

      {showGreeting && (

        <motion.div
          style={styles.assistant}
          initial={{ opacity:0,y:40 }}
          animate={{ opacity:1,y:0 }}
        >
          🤖 Hello! Ready to prepare for your interview?
        </motion.div>

      )}

    </div>
  );
}

const styles = {

page:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
overflow:"hidden",
position:"relative"
},

particles:{
position:"absolute",
top:0,
width:"100%"
},

logo:{
position:"absolute",
top:"100%",
width:"70px",
opacity:0.12,
animation:"floatLogo linear infinite"
},

brain:{
position:"absolute",
top:"15%",
left:"10%"
},

card:{
backdropFilter:"blur(18px)",
background:"rgba(255,255,255,0.08)",
border:"1px solid rgba(255,255,255,0.2)",
padding:"60px",
borderRadius:"25px",
textAlign:"center",
color:"white",
maxWidth:"600px",
boxShadow:"0 0 40px rgba(0,255,255,0.2)",
zIndex:10
},

title:{
fontSize:"64px",
background:"linear-gradient(90deg,#67e8f9,#a5f3fc)",
WebkitBackgroundClip:"text",
WebkitTextFillColor:"transparent"
},

description:{
fontSize:"18px",
color:"#cbd5f5",
marginTop:"10px",
marginBottom:"30px"
},

quote:{
fontSize:"20px",
marginBottom:"40px",
color:"#e0f2fe"
},

button:{
padding:"14px 40px",
borderRadius:"40px",
border:"none",
fontSize:"18px",
background:"linear-gradient(90deg,#22d3ee,#67e8f9)",
cursor:"pointer",
fontWeight:"bold"
},

assistant:{
position:"absolute",
bottom:"30px",
right:"30px",
background:"rgba(0,0,0,0.5)",
padding:"15px 20px",
borderRadius:"15px",
color:"white"
}

};