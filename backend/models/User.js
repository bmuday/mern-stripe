const bcrypt = require("bcrypt");
const validator = require("validator");
const { Schema, model } = require("mongoose");

const userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// static signup method
userSchema.statics.signupUser = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled.");

  if (!validator.isEmail(email)) throw Error("Email is not valid.");

  if (!validator.isStrongPassword(password))
    throw Error("Password is not strong enough.");

  const exists = await this.findOne({ email });
  console.log("this", this);
  if (exists) throw Error("Email already in use.");

  const hash = await bcrypt.hash(password, 10);
  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.loginUser = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled.");

  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password");

  return user;
};

module.exports = model("User", userSchema);
