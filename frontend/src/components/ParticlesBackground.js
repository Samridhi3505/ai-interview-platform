import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background:{ color:"transparent" },
        particles:{
          number:{ value:70 },
          size:{ value:3 },
          color:{ value:"#00ffff"},
          move:{ enable:true, speed:1 },
          links:{
            enable:true,
            distance:150,
            color:"#00ffff",
            opacity:0.3
          }
        }
      }}
    />
  );
}