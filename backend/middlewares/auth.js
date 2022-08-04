const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  const token = authorization.split(" ")[1];
  // console.log("token", token);

  try {
    // decoded token
    const { id } = jwt.verify(token, process.env.SECRET);
    // console.log("id", id);
    // select only user id(security purpose)
    req.user = await User.findOne({ _id: id });
    // console.log("req", req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Request is not authorized! Please log in.",
    });
  }
};
