"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Category } from "@/types";
import { categoryService } from "@/services/categories";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
  onSuccess?: () => void;
}

export const CategoryModal = ({
  isOpen,
  onClose,
  category,
  onSuccess,
}: CategoryModalProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (category) {
        await categoryService.updateCategory(category.id, name, type);
      } else {
        await categoryService.createCategory(name, type);
      }
      setName("");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(category?.name || "");
    setType(category?.type || "expense");
  }, [category]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card border border-border rounded-lg p-6 max-w-md w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {category ? "Edit Category" : "Add Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger text-danger rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
              placeholder="e.g., Salary, Groceries"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setType("income")}
                className={`py-2 rounded-lg font-medium transition ${
                  type === "income"
                    ? "bg-success text-white"
                    : "bg-background border border-border text-muted-foreground"
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
                    : "bg-background border border-border text-muted-foreground"
                }`}
              >
                Expense
              </button>
            </div>
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
              : category
              ? "Update Category"
              : "Add Category"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};
