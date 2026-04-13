const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ THIS IS THE FIX
    req.userId = decoded.id;

    console.log("AUTH USER ID:", req.userId); // DEBUG

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;