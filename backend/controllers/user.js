const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "5min" });
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signupUser(email, password);
    console.log("user", user);
    const token = createToken(user._id);

    return res
      .status(200)
      .json({ email, token, message: "Utilisateur créé !" });
  } catch (error) {
    return res.status(400).json({ error: error.message }); // throw new Error(error.message)
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.loginUser(email, password);
    const token = createToken(user._id);

    return res
      .status(200)
      .json({ email, token, message: "Utilisateur connecté !" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
