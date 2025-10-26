"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { budgetService } from "@/services/budget";
import { SkeletonLoader } from "./SkeletonLoader";

interface BudgetData {
  id: string | null;
  amount: number;
  month: string;
  spent: number;
}

interface BudgetCardProps {
  onUpdate?: () => void;
}

export const BudgetCard = ({ onUpdate }: BudgetCardProps) => {
  const [budget, setBudget] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      setLoading(true);
      const data = await budgetService.getBudget();
      setBudget(data);
      setNewAmount(data.amount.toString());
    } catch (err) {
      console.error("Failed to load budget:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBudget = async () => {
    try {
      setError("");
      const amount = Number.parseFloat(newAmount);

      if (!amount || amount <= 0) {
        setError("Please enter a valid amount");
        return;
      }

      if (budget?.id) {
        await budgetService.updateBudget(budget.id, amount);
      } else {
        const now = new Date();
        await budgetService.setBudget({
          amount,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        });
      }

      setEditing(false);
      await loadBudget();
      onUpdate?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save budget");
    }
  };

  if (loading) {
    return <SkeletonLoader height="h-64" />;
  }

  if (!budget) {
    return null;
  }

  const percentage =
    budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
  const isOverBudget = budget.spent > budget.amount;
  const remaining = Math.max(0, budget.amount - budget.spent);

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Monthly Budget</h2>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dark hover:text-white text-primary-foreground rounded-lg text-sm transition"
          >
            Edit Budget
          </button>
        )}
      </div>

      {editing ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error && (
            <div className="p-3 bg-danger/10 border border-danger text-danger rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Budget Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
              placeholder="0.00"
            />
          </div>

          <div className="flex gap-2">
            <motion.button
              onClick={handleSaveBudget}
              className="flex-1 py-2 bg-success hover:bg-success/80 text-white rounded-lg font-medium transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save
            </motion.button>
            <motion.button
              onClick={() => {
                setEditing(false);
                setNewAmount(budget.amount.toString());
                setError("");
              }}
              className="flex-1 py-2 bg-background border border-border rounded-lg font-medium hover:bg-card transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Budget</p>
              <p className="text-2xl font-bold text-primary">
                ${budget.amount.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Spent</p>
              <p
                className={`text-2xl font-bold ${
                  isOverBudget ? "text-danger" : "text-warning"
                }`}
              >
                ${budget.spent.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Remaining</p>
              <p
                className={`text-2xl font-bold ${
                  remaining > 0 ? "text-success" : "text-danger"
                }`}
              >
                ${remaining.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Spending Progress</span>
              <span
                className={`text-sm font-semibold ${
                  isOverBudget ? "text-danger" : "text-foreground"
                }`}
              >
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-3 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  isOverBudget ? "bg-danger" : "bg-success"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {isOverBudget && (
              <p className="text-danger text-sm mt-2">
                You have exceeded your budget by $
                {(budget.spent - budget.amount).toFixed(2)}
              </p>
            )}
          </div>

          {/* Budget Status */}
          <div
            className={`p-4 rounded-lg ${
              isOverBudget
                ? "bg-danger/10 border border-danger"
                : "bg-success/10 border border-success"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                isOverBudget ? "text-danger" : "text-success"
              }`}
            >
              {isOverBudget
                ? `⚠️ Over Budget - You've spent $${(
                    budget.spent - budget.amount
                  ).toFixed(2)} more than planned`
                : `✓ On Track - You have $${remaining.toFixed(
                    2
                  )} left to spend this month`}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
