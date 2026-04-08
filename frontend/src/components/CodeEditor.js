import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor() {
  const [code, setCode] = useState("print('Hello World')");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState(71); // default Python

  // 🔥 Run Code Function
  const runCode = async () => {
    try {
      const res = await fetch(
        "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: Number(language),
          }),
        }
      );

      const data = await res.json();

      setOutput(data.stdout || data.stderr || "No output");
    } catch (err) {
      setOutput("Error running code");
      console.error(err);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* 🔹 Top Bar */}
      <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value={71}>Python</option>
          <option value={63}>JavaScript</option>
          <option value={54}>C++</option>
          <option value={62}>Java</option>
        </select>

        {/* Run Button */}
        <button onClick={runCode}>Run Code</button>
      </div>

      {/* 🔹 Monaco Editor */}
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          theme="vs-dark"
          language={
            language == 71
              ? "python"
              : language == 63
              ? "javascript"
              : language == 54
              ? "cpp"
              : "java"
          }
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>

      {/* 🔹 Output Section */}
      <div
        style={{
          height: "150px",
          background: "#111",
          color: "#0f0",
          padding: "10px",
          overflow: "auto",
        }}
      >
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}