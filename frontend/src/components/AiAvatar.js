import { motion } from "framer-motion";

export default function AiAvatar() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "linear-gradient(135deg,#00e5ff,#00ffa6)",
        boxShadow: "0 0 40px #00ffff",
        margin: "auto"
      }}
    />
  );
}