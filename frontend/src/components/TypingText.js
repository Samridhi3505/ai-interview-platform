import { useEffect, useState } from "react";

const texts = [
  "Crack your next interview 🚀",
  "Practice like a pro 💻",
  "Become unstoppable 🔥",
];

export default function TypingText() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    if (subIndex < texts[index].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + texts[index][subIndex]);
        setSubIndex(subIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setText("");
        setSubIndex(0);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 1500);
    }
  }, [subIndex, index]);

  return <p className="typing-text">{text}|</p>;
}