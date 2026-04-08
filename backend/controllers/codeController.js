const axios = require("axios");

const runCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    // Map language → Judge0 ID
    const languageMap = {
      javascript: 63,
      python: 71,
      java: 62,
      cpp: 54
    };

    const language_id = languageMap[language.toLowerCase()];

    if (!language_id) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: language_id,
        stdin: ""
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      }
    );

    res.json({
      output: response.data.stdout || "",
      error: response.data.stderr || response.data.compile_output || ""
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Execution failed" });
  }
};

module.exports = { runCode };