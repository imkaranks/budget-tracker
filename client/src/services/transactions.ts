import api from "./api";
import type { Transaction } from "../types";

export const transactionService = {
  async createTransaction(
    data: Omit<Transaction, "id" | "userId">
  ): Promise<Transaction> {
    const response = await api.post("/transactions", {
      ...data,
      category: data.categoryId,
    });
    return response.data;
  },

  async getTransactions(params?: {
    category?: string;
    type?: "income" | "expense";
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    page?: number;
    limit?: number;
  }): Promise<{
    transactions: Transaction[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await api.get("/transactions", { params });

    const data = response.data as {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      transactions: Array<{
        _id: string;
        user: string;
        category: { _id: string; name: string; type: "income" | "expense" };
        amount: number;
        description: string;
        date: string;
        type: "income" | "expense";
      }>;
    };

    const transactions: Transaction[] = data.transactions.map((t) => ({
      id: t._id,
      userId: t.user,
      categoryId: t.category?._id ?? "",
      category: t.category
        ? {
            id: t.category._id,
            name: t.category.name,
            type: t.category.type,
            userId: "",
          }
        : undefined,
      amount: t.amount,
      description: t.description,
      date: t.date,
      type: t.type,
    }));

    return {
      transactions,
      total: data.total,
      page: data.page,
      limit: data.limit,
    };
  },

  async getTransaction(id: string): Promise<Transaction> {
    const response = await api.get(`/transactions/${id}`);

    const data = response.data as {
      _id: string;
      user: string;
      category?: {
        _id: string;
        name: string;
        type: "income" | "expense";
      };
      type: "income" | "expense";
      amount: number;
      description: string;
      date: string;
    };

    return {
      id: data._id,
      userId: data.user,
      categoryId: data.category?._id ?? "",
      category: data.category
        ? {
            id: data.category._id,
            name: data.category.name,
            type: data.category.type,
            userId: "",
          }
        : undefined,
      amount: data.amount,
      description: data.description,
      date: data.date,
      type: data.type,
    };
  },

  async updateTransaction(
    id: string,
    data: Partial<Transaction>
  ): Promise<Transaction> {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  },

  async deleteTransaction(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },
};
