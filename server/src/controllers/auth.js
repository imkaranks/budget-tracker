const { StatusCodes } = require("http-status-codes");
const AuthService = require("../services/auth");
const catchAsync = require("../utils/catchAsync");

const registerUser = catchAsync(async (req, res) => {
  const data = await AuthService.registerUser(req.body);
  res.status(StatusCodes.CREATED).json(data);
});

const loginUser = catchAsync(async (req, res) => {
  const data = await AuthService.loginUser(req.body);
  res.status(StatusCodes.OK).json(data);
});

const getMe = catchAsync(async (req, res) => {
  const data = await AuthService.getMe(req.user._id);
  res.status(StatusCodes.OK).json(data);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
