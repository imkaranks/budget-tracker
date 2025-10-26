const { StatusCodes } = require("http-status-codes");
const TransactionService = require("../services/transaction");
const catchAsync = require("../utils/catchAsync");

const createTransaction = catchAsync(async (req, res) => {
  const transaction = await TransactionService.createTransaction(
    req.user._id,
    req.body
  );
  res.status(StatusCodes.CREATED).json(transaction);
});

const getTransactions = catchAsync(async (req, res) => {
  const data = await TransactionService.getTransactions(
    req.user._id,
    req.query
  );
  res.status(StatusCodes.OK).json(data);
});

const getTransactionById = catchAsync(async (req, res) => {
  const transaction = await TransactionService.getTransactionById(
    req.user._id,
    req.params.id
  );
  res.status(StatusCodes.OK).json(transaction);
});

const updateTransaction = catchAsync(async (req, res) => {
  const transaction = await TransactionService.updateTransaction(
    req.user._id,
    req.params.id,
    req.body
  );
  res.status(StatusCodes.OK).json(transaction);
});

const deleteTransaction = catchAsync(async (req, res) => {
  await TransactionService.deleteTransaction(req.user._id, req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ message: "Transaction deleted successfully" });
});

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
