const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // crypto is building module so no need to install using npm

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name can not exceed 30 characters"],
    minLength: [1, "Name should not be less than 1 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    unique: true,
    minLength: [8, "Password should not be less than 8 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// JWT token
userScheme.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare password
userScheme.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

// Gererating password reset token
userScheme.methods.getResetPasswordToken = function () {
  // Gerenrating token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing and adding to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
};
module.exports = mongoose.model("user", userScheme);
