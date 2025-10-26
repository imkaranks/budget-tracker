import api from "./api";
import type { MonthlySummary, Summary } from "../types";

export const summaryService = {
  async getMonthlysSummary(): Promise<MonthlySummary> {
    const response = await api.get("/summary/monthly");

    const data = response.data as {
      income: number;
      expense: number;
      month: number;
    }[];

    const totals = data.reduce(
      (acc, item) => {
        acc.totalIncome += item.income || 0;
        acc.totalExpenses += item.expense || 0;
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0 }
    );

    return {
      totalIncome: totals.totalIncome,
      totalExpenses: totals.totalExpenses,
      balance: totals.totalIncome - totals.totalExpenses,
    };
  },

  async getOverviewSummary(
    startDate: string,
    endDate: string
  ): Promise<Summary> {
    const [overviewRes, categoryRes] = await Promise.all([
      api.get("/summary/overview", { params: { startDate, endDate } }),
      api.get("/summary/categories", { params: { startDate, endDate } }),
    ]);

    const overviewData: {
      totalIncome: number;
      totalExpenses: number;
      balance: number;
    } = overviewRes.data;

    const categoryData: Array<{
      _id: string;
      total: number;
      categoryName: string;
    }> = categoryRes.data;

    // Calculate total category sum for percentages
    const totalCategoryAmount = categoryData.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const categoryBreakdown = categoryData.map((item) => ({
      category: item.categoryName,
      amount: item.total,
      percentage:
        totalCategoryAmount > 0 ? (item.total / totalCategoryAmount) * 100 : 0,
    }));

    // Combine into one Summary object
    return {
      totalIncome: overviewData.totalIncome,
      totalExpenses: overviewData.totalExpenses,
      balance: overviewData.balance,
      categoryBreakdown,
    };
  },

  async getCategorySummary(): Promise<
    Array<{ category: string; amount: number; percentage: number }>
  > {
    const response = await api.get("/summary/categories");
    const data: Array<{ _id: string; total: number; categoryName: string }> =
      response.data;

    // Calculate total sum for percentage calculation
    const totalAmount = data.reduce((sum, item) => sum + item.total, 0);

    return data.map((item) => ({
      category: item.categoryName,
      amount: item.total,
      percentage: totalAmount > 0 ? (item.total / totalAmount) * 100 : 0,
    }));
  },
};
