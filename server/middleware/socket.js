const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protectSocket = async (socket, next) => {
  const { token } = socket.request.cookies;
  if (!token) {
    return next(new Error("No token, authorization denied"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("name email _id");

    if (user) {
      socket.request.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      };

      return next();
    }

    return next(new Error("Token is not valid"));
  } catch (err) {
    return next(new Error("Token is not valid"));
  }
};
