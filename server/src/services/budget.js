const { Budget, Transaction } = require("../database");
const { BadRequestError, NotFoundError } = require("../utils/AppError");

class BudgetService {
  static instance;

  static getInstance() {
    if (!BudgetService.instance) {
      BudgetService.instance = new BudgetService();
    }
    return BudgetService.instance;
  }

  async setBudget(userId, { month, year, amount }) {
    if (!month || !year || !amount)
      throw new BadRequestError("Month, year, and amount are required");

    const existing = await Budget.findOne({ user: userId, month, year });
    if (existing) {
      existing.amount = amount;
      await existing.save();
      return existing;
    }

    const budget = await Budget.create({ user: userId, month, year, amount });
    return budget;
  }

  async getBudget(userId, { month, year }) {
    const now = new Date();
    const targetMonth = month || now.getMonth() + 1;
    const targetYear = year || now.getFullYear();

    const budget = await Budget.findOne({
      user: userId,
      month: targetMonth,
      year: targetYear,
    });

    // if (!budget) throw new NotFoundError("Budget not found");

    const startOfMonth = new Date(targetYear, targetMonth - 1, 1);
    const endOfMonth = new Date(targetYear, targetMonth, 0);

    const totalExpenses = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const spent = totalExpenses[0]?.total || 0;

    return {
      ...(budget ? { _id: budget._id } : {}),
      budget: budget ? budget.amount : 0,
      month: targetMonth,
      year: targetYear,
      spent,
      remaining: budget ? budget.amount - spent : 0,
    };
  }

  async updateBudget(userId, budgetId, data) {
    const budget = await Budget.findOneAndUpdate(
      { _id: budgetId, user: userId },
      data,
      { new: true }
    );
    if (!budget) throw new NotFoundError("Budget not found");
    return budget;
  }

  async deleteBudget(userId, budgetId) {
    const budget = await Budget.findOneAndDelete({
      _id: budgetId,
      user: userId,
    });
    if (!budget) throw new NotFoundError("Budget not found");
    return budget;
  }
}

module.exports = BudgetService.getInstance();
