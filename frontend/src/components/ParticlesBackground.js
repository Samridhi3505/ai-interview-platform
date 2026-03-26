import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadfull } from "tsparticles";
import { loadslim } from "tsparticles";
export default function ParticlesBackground() {

  const particlesInit = useCallback(async (engine) => {
    await loadslim(engine); // ✅ FIXED (no loadFull)
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
        pointerEvents: "none"
      }}
      options={{
        background: { color: "transparent" },

        particles: {
          number: { value: 60 },

          color: { value: "#38bdf8" },

          links: {
            enable: true,
            distance: 150,
            color: "#38bdf8",
            opacity: 0.3
          },

          move: {
            enable: true,
            speed: 1
          },

          size: { value: 2 },
          opacity: { value: 0.5 }
        }
      }}
    />
  );
}