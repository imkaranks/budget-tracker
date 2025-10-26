export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  userId: string;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  category?: Category;
  amount: number;
  description: string;
  date: string;
  type: "income" | "expense";
}

export interface Budget {
  id: string;
  userId: string;
  amount: number;
  month: string;
  spent: number;
}

export interface MonthlySummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}
