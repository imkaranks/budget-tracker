"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { budgetService } from "@/services/budget";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAmount?: number;
  budgetId?: string | null;
  onSuccess?: () => void;
}

export const BudgetModal = ({
  isOpen,
  onClose,
  currentAmount = 0,
  budgetId,
  onSuccess,
}: BudgetModalProps) => {
  const [amount, setAmount] = useState(currentAmount.toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      setError("");
      const parsedAmount = Number.parseFloat(amount);

      if (!parsedAmount || parsedAmount <= 0) {
        setError("Please enter a valid amount");
        return;
      }

      setLoading(true);

      if (budgetId) {
        await budgetService.updateBudget(budgetId, parsedAmount);
      } else {
        const now = new Date();
        await budgetService.setBudget({
          amount: parsedAmount,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        });
      }

      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-6 w-full max-w-md z-50"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Set Budget</h2>
              <button
                onClick={onClose}
                className="text-muted hover:text-foreground transition text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="p-3 bg-danger/10 border border-danger text-danger rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Monthly Budget Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="0.00"
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium disabled:opacity-50 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Saving..." : "Save Budget"}
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="flex-1 py-2 bg-background border border-border rounded-lg font-medium hover:bg-card transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
