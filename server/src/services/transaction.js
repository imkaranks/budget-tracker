const { Transaction, Category, Budget } = require("../database");
const SummaryService = require("../services/summary");
const { BadRequestError, NotFoundError } = require("../utils/AppError");

class TransactionService {
  static instance;

  static getInstance() {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  async createTransaction(
    userId,
    { category, type, amount, description, date }
  ) {
    if (!category || !type || !amount)
      throw new BadRequestError("Category, type, and amount are required");

    const categoryExists = await Category.findOne({
      _id: category,
      user: userId,
    });
    if (!categoryExists) throw new BadRequestError("Invalid category");

    const dateObj = date ? new Date(date) : new Date();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    if (type === "expense") {
      // Get user's budget for that month
      const budget = await Budget.findOne({ user: userId, month, year });

      if (!budget) {
        throw new BadRequestError(
          "You must set a budget before adding expenses."
        );
      }

      const { totalExpenses, balance } =
        await SummaryService.getFinancialSummary(userId);

      if (balance <= 0 || amount > balance) {
        throw new BadRequestError(
          `Insufficient balance. You only have $${balance.toFixed(
            2
          )} remaining.`
        );
      }

      const spent = totalExpenses;
      const remaining = budget.amount - spent;

      if (amount > remaining) {
        throw new BadRequestError(
          `Insufficient budget. You only have $${remaining.toFixed(
            2
          )} left for this month.`
        );
      }
    }

    const transaction = await Transaction.create({
      user: userId,
      category,
      type,
      amount,
      description,
      date: date || Date.now(),
    });

    return transaction;
  }

  async getTransactions(userId, query) {
    const {
      category,
      type,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      page = 1,
      limit = 10,
    } = query;

    const filters = { user: userId };

    if (category) filters.category = category;
    if (type) filters.type = type;
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }
    if (minAmount || maxAmount) {
      filters.amount = {};
      if (minAmount) filters.amount.$gte = Number(minAmount);
      if (maxAmount) filters.amount.$lte = Number(maxAmount);
    }

    const total = await Transaction.countDocuments(filters);
    const transactions = await Transaction.find(filters)
      .populate("category", "name type")
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      transactions,
    };
  }

  async getTransactionById(userId, transactionId) {
    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: userId,
    }).populate("category", "name type");
    if (!transaction) throw new NotFoundError("Transaction not found");
    return transaction;
  }

  async updateTransaction(userId, transactionId, data) {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    if (data.type === "expense") {
      // Get user's budget for that month
      const budget = await Budget.findOne({ user: userId, month, year });

      if (!budget) {
        throw new BadRequestError(
          "You must set a budget before adding expenses."
        );
      }

      const { totalExpenses, balance } =
        await SummaryService.getFinancialSummary(userId);

      if (balance <= 0 || data.amount > balance) {
        throw new BadRequestError(
          `Insufficient balance. You only have $${balance.toFixed(
            2
          )} remaining.`
        );
      }

      const spent = totalExpenses;
      const remaining = budget.amount - spent;

      if (data.amount > remaining) {
        throw new BadRequestError(
          `Insufficient budget. You only have $${remaining.toFixed(
            2
          )} left for this month.`
        );
      }
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, user: userId },
      data,
      { new: true }
    );
    if (!transaction) throw new NotFoundError("Transaction not found");
    return transaction;
  }

  async deleteTransaction(userId, transactionId) {
    const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      user: userId,
    });
    if (!transaction) throw new NotFoundError("Transaction not found");
    return transaction;
  }
}

module.exports = TransactionService.getInstance();
