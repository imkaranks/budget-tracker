const { StatusCodes } = require("http-status-codes");
const SummaryService = require("../services/summary");
const catchAsync = require("../utils/catchAsync");

const getFinancialSummary = catchAsync(async (req, res) => {
  const summary = await SummaryService.getFinancialSummary(req.user._id);
  res.status(StatusCodes.OK).json(summary);
});

const getMonthlyOverview = catchAsync(async (req, res) => {
  const overview = await SummaryService.getMonthlyOverview(
    req.user._id,
    req.query.year
  );
  res.status(StatusCodes.OK).json(overview);
});

const getCategoryBreakdown = catchAsync(async (req, res) => {
  const data = await SummaryService.getCategoryBreakdown(
    req.user._id,
    req.query.month,
    req.query.year
  );
  res.status(StatusCodes.OK).json(data);
});

module.exports = {
  getFinancialSummary,
  getMonthlyOverview,
  getCategoryBreakdown,
};
