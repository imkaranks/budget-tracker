import api from "./api";
import type { Budget } from "../types";

export const budgetService = {
  async setBudget({
    amount,
    month,
    year,
  }: {
    amount: number;
    month: number;
    year: number;
  }): Promise<Budget> {
    const response = await api.post("/budget", { amount, month, year });

    const data = response.data as {
      _id: string;
      budget: number;
      month: number;
      year: number;
      spent: number;
      remaining: number;
    };

    return {
      id: data._id,
      userId: "",
      amount: data.budget,
      month: `${data.year}-${String(data.month).padStart(2, "0")}`, // e.g. "2025-10"
      spent: data.spent,
    };
  },

  async getBudget(): Promise<Budget> {
    const response = await api.get("/budget");

    const data = response.data as {
      _id?: string;
      budget: number;
      month: number;
      year: number;
      spent: number;
      remaining: number;
    };

    return {
      id: data?._id || "",
      userId: "",
      amount: data.budget,
      month: `${data.year}-${String(data.month).padStart(2, "0")}`,
      spent: data.spent,
    };
  },

  async updateBudget(id: string, amount: number): Promise<Budget> {
    const response = await api.put(`/budget/${id}`, { amount });

    const data = response.data as {
      _id: string;
      budget: number;
      month: number;
      year: number;
      spent: number;
      remaining: number;
    };

    return {
      id: data._id,
      userId: "",
      amount: data.budget,
      month: `${data.year}-${String(data.month).padStart(2, "0")}`,
      spent: data.spent,
    };
  },
};
