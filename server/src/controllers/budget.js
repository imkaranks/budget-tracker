const { StatusCodes } = require("http-status-codes");
const BudgetService = require("../services/budget");
const catchAsync = require("../utils/catchAsync");

const setBudget = catchAsync(async (req, res) => {
  const budget = await BudgetService.setBudget(req.user._id, req.body);
  res.status(StatusCodes.CREATED).json(budget);
});

const getBudget = catchAsync(async (req, res) => {
  const budget = await BudgetService.getBudget(req.user._id, req.query);
  res.status(StatusCodes.OK).json(budget);
});

const updateBudget = catchAsync(async (req, res) => {
  const budget = await BudgetService.updateBudget(
    req.user._id,
    req.params.id,
    req.body
  );
  res.status(StatusCodes.OK).json(budget);
});

const deleteBudget = catchAsync(async (req, res) => {
  await BudgetService.deleteBudget(req.user._id, req.params.id);
  res.status(StatusCodes.OK).json({ message: "Budget deleted successfully" });
});

module.exports = {
  setBudget,
  getBudget,
  updateBudget,
  deleteBudget,
};
