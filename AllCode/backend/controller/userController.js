const ErrorHandler = require("../util/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../util/jwtToken");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto"); // crypto is building module so no need to install using npm

// Register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      url: "profilepicUrl",
    },
  });
  /*
    insted of all these lines 
  // const token = user.getJWTToken();

  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
  */
  sendToken(user, 201, res);
});

// Login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // Checking if user given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Enter Email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invaliad Email or password", 401));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invaliad Email or password", 401));
  }
  /*
  insted of all these lines 
  // const token = user.getJWTToken();

  // res.status(200).json({
  //   success: true,
  //   user,
  //   token,
  // });
  */
  sendToken(user, 200, res);
});

// Logout user

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out",
  });
});

// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get reset password token
  const restToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${restToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce password recovery email`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // checking hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
  }
  if(req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});


// Get user detailes

exports.getUserDetails = catchAsyncError(async (req, res, next)=>{
 const user = await User.findById(req.user.id);

 req.status(200).json({
  success: true,
  user
 })
})