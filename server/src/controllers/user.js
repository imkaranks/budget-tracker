const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user");
const catchAsync = require("../utils/catchAsync");

const getUserById = catchAsync(async (req, res) => {
  const data = await UserService.getUserById(req.params.id);
  res.status(StatusCodes.OK).json(data);
});

module.exports = {
  getUserById,
};
