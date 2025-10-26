const express = require("express");
const {
  getMonthlyOverview,
  getFinancialSummary,
  getCategoryBreakdown,
} = require("../controllers/summary");
const { protect } = require("../middlewares/auth");
const summaryRouter = express.Router();

summaryRouter.route("/monthly").get(protect, getMonthlyOverview);

summaryRouter.route("/overview").get(protect, getFinancialSummary);

summaryRouter.route("/categories").get(protect, getCategoryBreakdown);

module.exports = summaryRouter;
