const express = require("express");
const {
  setBudget,
  getBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budget");
const { protect } = require("../middlewares/auth");
const budgetRouter = express.Router();

budgetRouter.route("/").post(protect, setBudget).get(protect, getBudget);

budgetRouter
  .route("/:id")
  .put(protect, updateBudget)
  .delete(protect, deleteBudget);

module.exports = budgetRouter;
