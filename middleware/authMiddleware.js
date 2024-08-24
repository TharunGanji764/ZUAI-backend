const jwtToken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretKey = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const header = req.headers["authorization"];
  let token = null;
  if (header) {
    token = header.split(" ")[1];
  } else {
    return res.status(401).json({ error: "Authorization header not found" });
  }
  if (!token) {
    return res.status(400).json({ error: "JWT Token Not Found" });
  }
  try {
    jwtToken.verify(token, secretKey, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "Invalid JWT Token" });
      }
      req.username = payload.username;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authenticate;
