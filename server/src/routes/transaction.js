const express = require("express");
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
const { protect } = require("../middlewares/auth");
const transactionRouter = express.Router();

transactionRouter
  .route("/")
  .post(protect, createTransaction)
  .get(protect, getTransactions);

transactionRouter
  .route("/:id")
  .get(protect, getTransactionById)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = transactionRouter;
