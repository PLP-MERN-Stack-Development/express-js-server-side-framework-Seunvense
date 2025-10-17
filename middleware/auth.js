// middleware/auth.js
const auth = (req, res, next) => {
  const apikey = req.headers["x-api-key"];
  if (!apikey || apikey !== "my-secret-api-key") {
    return res.status(401).json({ message: "authorized: Invalid API key" });
  }
  next();
};

module.exports = auth;
