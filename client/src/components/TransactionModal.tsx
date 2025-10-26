"use client";

import { motion } from "framer-motion";
import { TransactionForm } from "./TransactionForm";
import type { Transaction } from "@/types";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
  onSuccess?: () => void;
}

export const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onSuccess,
}: TransactionModalProps) => {
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
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition text-2xl"
          >
            ✕
          </button>
        </div>
        <TransactionForm
          transaction={transaction}
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
        />
      </motion.div>
    </motion.div>
  );
};
