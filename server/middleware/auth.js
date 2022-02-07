const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const profile = await Profile.findOne({ userId: decoded.id }).lean().exec();

    if (!profile) return res.status(403).json({ error: "Token is not valid" });

    req.user = decoded;
    req.profile = profile;

    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = protect;
