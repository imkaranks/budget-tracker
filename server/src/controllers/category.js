const { StatusCodes } = require("http-status-codes");
const CategoryService = require("../services/category");
const catchAsync = require("../utils/catchAsync");

const createCategory = catchAsync(async (req, res) => {
  const category = await CategoryService.createCategory(req.user._id, req.body);
  res.status(StatusCodes.CREATED).json(category);
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getCategories(req.user._id);
  res.status(StatusCodes.OK).json(categories);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await CategoryService.updateCategory(
    req.user._id,
    req.params.id,
    req.body
  );
  res.status(StatusCodes.OK).json(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await CategoryService.deleteCategory(req.user._id, req.params.id);
  res.status(StatusCodes.OK).json({ message: "Category deleted successfully" });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
