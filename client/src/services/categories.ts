import api from "./api";
import type { Category } from "../types";

export const categoryService = {
  async createCategory(
    name: string,
    type: "income" | "expense"
  ): Promise<Category> {
    const response = await api.post("/categories", { name, type });
    return response.data;
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get("/categories");

    const categories: Category[] = response.data.map(
      (category: {
        _id: string;
        user: string;
        name: string;
        type: "income" | "expense";
      }) => ({
        id: category._id,
        name: category.name,
        type: category.type,
        userId: category.user,
      })
    );

    return categories;
  },

  async updateCategory(
    id: string,
    name: string,
    type: "income" | "expense"
  ): Promise<Category> {
    const response = await api.put(`/categories/${id}`, { name, type });
    return response.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
