const { Transaction } = require("../database");

class SummaryService {
  static instance;

  static getInstance() {
    if (!SummaryService.instance) {
      SummaryService.instance = new SummaryService();
    }
    return SummaryService.instance;
  }

  async getFinancialSummary(userId) {
    const totals = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;

    totals.forEach((t) => {
      if (t._id === "income") totalIncome = t.total;
      if (t._id === "expense") totalExpenses = t.total;
    });

    const balance = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, balance };
  }

  async getMonthlyOverview(userId, year) {
    const now = new Date();
    const targetYear = year || now.getFullYear();

    const monthly = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date(`${targetYear}-01-01`),
            $lte: new Date(`${targetYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" }, type: "$type" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const result = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
    }));

    monthly.forEach((m) => {
      const idx = m._id.month - 1;
      if (m._id.type === "income") result[idx].income = m.total;
      else result[idx].expense = m.total;
    });

    return result;
  }

  async getCategoryBreakdown(userId, month, year) {
    const now = new Date();
    const targetMonth = month || now.getMonth() + 1;
    const targetYear = year || now.getFullYear();

    const startOfMonth = new Date(targetYear, targetMonth - 1, 1);
    const endOfMonth = new Date(targetYear, targetMonth, 0);

    const breakdown = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $project: {
          categoryName: "$categoryDetails.name",
          total: 1,
        },
      },
      { $sort: { total: -1 } },
    ]);

    return breakdown;
  }
}

module.exports = SummaryService.getInstance();
