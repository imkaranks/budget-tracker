"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Category, Transaction } from "@/types";
import { transactionService } from "@/services/transactions";
import { categoryService } from "@/services/categories";

interface TransactionFormProps {
  onSuccess?: () => void;
  transaction?: Transaction;
}

export const TransactionForm = ({
  onSuccess,
  transaction,
}: TransactionFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [type, setType] = useState<"income" | "expense">(
    transaction?.type || "expense"
  );
  const [categoryId, setCategoryId] = useState(transaction?.categoryId || "");
  const [amount, setAmount] = useState(transaction?.amount.toString() || "");
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [date, setDate] = useState(
    transaction?.date?.split("T")[0] || new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data.filter((c) => c.type === type));
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    loadCategories();
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (transaction) {
        await transactionService.updateTransaction(transaction.id, {
          categoryId,
          amount: Number.parseFloat(amount),
          description,
          date,
          type,
        });
      } else {
        await transactionService.createTransaction({
          categoryId,
          amount: Number.parseFloat(amount),
          description,
          date,
          type,
        });
      }
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {error && (
        <div className="p-3 bg-danger/10 border border-danger text-danger rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`py-2 rounded-lg font-medium transition ${
            type === "income"
              ? "bg-success text-white"
              : "bg-card border border-border text-muted-foreground"
          }`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`py-2 rounded-lg font-medium transition ${
            type === "expense"
              ? "bg-danger text-white"
              : "bg-card border border-border text-muted-foreground"
          }`}
        >
          Expense
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-primary"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-primary"
          placeholder="0.00"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-primary"
          placeholder="Transaction description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-primary"
          required
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary hover:bg-primary-dark hover:text-white text-primary-foreground rounded-lg font-medium disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading
          ? "Saving..."
          : transaction
          ? "Update Transaction"
          : "Add Transaction"}
      </motion.button>
    </motion.form>
  );
};
