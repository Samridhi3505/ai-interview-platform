import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // 🌤️ Greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning ☀️");
    else if (hour < 18) setGreeting("Good Afternoon 🌤️");
    else setGreeting("Good Evening 🌙");
  }, []);

  // 💡 Quotes (Famous personalities)
  const quotes = [
    { text: "Success is not Final, Failure is not Fatal.", author: "Winston Churchill" },
    { text: "The Future depends on what you do Today.", author: "Mahatma Gandhi" },
    { text: "Push yourself, because no one else Will.", author: "Unknown" },
    { text: "Dream Big and Dare to Fail.", author: "Norman Vaughan" }
  ];

  // 🔄 Rotate Quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={darkMode ? "main dark" : "main light"}>

      {/* 🌌 Animated Waves Background */}
      <div className="bg-waves"></div>
      

      {/* 🌤️ Greeting */}
      <div className="greeting-top">{greeting}</div>

      {/* 🌗 Toggle */}
      <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌙" : "☀️"}
      </button>

      {/* 🔥 LEFT NAV (MORE PREMIUM) */}
     <div className="nav-right">
  {[
    { name: "Tech Interview", icon: "💻", path: "/Interview" },
    { name: "Non-Tech Interview", icon: "🧠", path: "/NonTech" },
    { name: "Resources", icon: "⚡", path: "/Resources" },
    { name: "Profile", icon: "👤", path: "/Profile" },
  
  ].map((item, i) => (
    <motion.div
      key={i}
      className="nav-pill"
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(item.path)}   // ✅ THIS LINE FIXES EVERYTHING
    >
      <span>{item.icon}</span>
      <p>{item.name}</p>
    </motion.div>
  ))}
</div>

      {/* 🔥 HERO */}
      <motion.div
  className="hero-content"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  }}
>

  {/* 🔥 HEADING */}
  <motion.h1
    className="heading"
    variants={{
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    Crack Tech Interviews <br />
    with Smart Learning
  </motion.h1>

  {/* 📄 DESCRIPTION */}
  <motion.p
    className="desc"
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    Practice Real Interview Questions, Improve Problem-Solving,
    and Grow Consistently.
  </motion.p>

  {/* 🔥 BUTTON */}
  <motion.button
    className="cta-btn"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    animate={{
      boxShadow: [
        "0 0 10px rgba(0,255,200,0.4)",
        "0 0 25px rgba(0,255,200,0.8)",
        "0 0 10px rgba(0,255,200,0.4)"
      ]
    }}
    transition={{
      duration: 2,
      repeat: Infinity
    }}
  >
    🚀 Explore Your Potential
  </motion.button>

  {/* 💡 QUOTE */}
  <motion.div
    key={quoteIndex}
    className="quote-box"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
  >
    <p>"{quotes[quoteIndex].text}"</p>
    <span>- {quotes[quoteIndex].author}</span>
  </motion.div>

</motion.div>
      </div>

    
  );
}