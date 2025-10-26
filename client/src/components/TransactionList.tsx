"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Transaction } from "@/types";
import { transactionService } from "@/services/transactions";
import { TransactionRowSkeleton } from "./skeletons/TransactionRowSkeleton";

interface TransactionListProps {
  refresh?: boolean;
}

export const TransactionList = ({ refresh }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await transactionService.getTransactions({ page, limit });
        setTransactions(data.transactions);
        setTotal(data.total);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [page, limit, refresh]);

  if (loading) {
    return <TransactionRowSkeleton count={5} />;
  }

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No transactions yet
        </div>
      ) : (
        <>
          {transactions.map((tx, idx) => (
            <motion.div
              key={tx.id}
              className="p-4 bg-card border border-border rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-sm text-muted-foreground">
                  {tx.category?.name}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  tx.type === "income" ? "text-success" : "text-danger"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
              </p>
            </motion.div>
          ))}

          {total > limit && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-card border border-border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil(total / limit)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(total / limit)}
                className="px-4 py-2 bg-card border border-border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
